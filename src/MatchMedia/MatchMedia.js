import { Component } from 'react'
import PropTypes from 'prop-types'
import json2mq from 'json2mq'

const queryToMql = query => global.matchMedia(json2mq(query))
const createMediaMatcher = query => {
  const mql = queryToMql(query)

  return {
    matches: mql.matches,
    subscribe(handler) {
      mql.addListener(handler)

      return () => mql.removeListener(handler)
    },
  }
}

class MatchMedia extends Component {
  constructor(props, context) {
    super(props, context)

    const { query } = props

    this.propsMatchers = Object.keys(query).map(prop => ({
      prop,
      ...createMediaMatcher(query[prop]),
    }))

    this.state = this.propsMatchers.reduce(
      (result, propMatcher) => ({
        ...result,
        [propMatcher.prop]: propMatcher.matches,
      }),
      {},
    )
  }

  componentDidMount() {
    this.unsubscribers = this.propsMatchers.map(propMatcher =>
      propMatcher.subscribe(e => {
        this.setState({
          [propMatcher.prop]: e.matches,
        })
      }),
    )
  }

  componentWillUnmount() {
    this.unsubscribers.forEach(unsubscribe => unsubscribe())
  }

  render() {
    const { children } = this.props
    return children({
      ...this.state,
    })
  }
}

MatchMedia.propTypes = {
  query: PropTypes.object,
  children: PropTypes.func.isRequired,
}

MatchMedia.defaultProps = {
  query: {},
}

export default MatchMedia
