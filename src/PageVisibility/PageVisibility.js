import { Component } from 'react'
import PropTypes from 'prop-types'
import { noop, unwrapArray } from '../utils'

const getVisibilityStatus = visibilityState => ({
  isVisible: visibilityState === 'visible',
  isHidden: visibilityState === 'hidden',
  isPrerendered: visibilityState === 'prerender',
  isUnloaded: visibilityState === 'unloaded',
})

class PageVisibility extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = getVisibilityStatus(document.visibilityState)
  }

  onVibisilityChange = () => {
    this.setState(getVisibilityStatus(document.visibilityState))
  }

  componentDidMount() {
    document.addEventListener(
      'visibilitychange',
      this.onVibisilityChange,
      false,
    )
  }

  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.onVibisilityChange)
  }

  render() {
    const children = unwrapArray(this.props.children, noop)
    return children({
      ...this.state,
    })
  }
}

PageVisibility.propTypes = {
  children: PropTypes.func.isRequired,
}

export default PageVisibility
