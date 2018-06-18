import { Component } from 'react'
import PropTypes from 'prop-types'

class IntersectionObserverComp extends Component {
  state = {}

  setRef = ref => {
    this.domNode = ref
  }

  onObserve = entries => {
    const { thresholds } = this.props
    this.setState(
      Object.keys(thresholds).reduce(
        (totalResult, prop) => ({
          ...totalResult,
          ...entries.reduce(
            (entriesResult, entry) => ({
              ...entriesResult,
              [prop]:
                entry.isIntersecting &&
                entry.intersectionRatio >= thresholds[prop],
            }),
            {},
          ),
        }),
        {},
      ),
    )
  }

  componentDidMount() {
    const { thresholds, options } = this.props
    this.observer = new global.IntersectionObserver(this.onObserve, {
      ...options,
      threshold: Object.keys(thresholds).map(prop => thresholds[prop]),
    })
    this.observer.observe(this.domNode)
  }

  componentWillUnmount() {
    this.observer.disconnect()
  }

  render() {
    const { children } = this.props
    return children({
      setRef: this.setRef,
      ...this.state,
    })
  }
}

IntersectionObserverComp.propTypes = {
  children: PropTypes.func.isRequired,
  options: PropTypes.object,
  thresholds: PropTypes.object,
}

IntersectionObserverComp.defaultProps = {
  thresholds: {},
  options: {},
}

export default IntersectionObserverComp
