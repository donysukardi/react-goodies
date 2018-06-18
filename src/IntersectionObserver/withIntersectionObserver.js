import React, { Component } from 'react'
import getDisplayName from 'react-display-name'
import IntersectionObserverComp from './IntersectionObserverComp'

const isIntersectionObserverSupported =
  typeof global.IntersectionObserver === 'function'

const withIntersectionObserver = ({
  thresholds,
  options,
  refKey = 'setRef',
} = {}) => Target => {
  if (!isIntersectionObserverSupported) {
    return Target
  }

  class WithIntersectionObserver extends Component {
    setRef = (setRef, ref) => {
      setRef(ref)

      if (typeof this.props[refKey] === 'function') {
        this.props[refKey](ref)
      }
    }

    render() {
      return (
        <IntersectionObserverComp thresholds={thresholds} options={options}>
          {({ setRef, ...rest }) => {
            const refProps = {
              [refKey]: this.setRef.bind(this, setRef),
            }

            return <Target {...this.props} {...refProps} {...rest} />
          }}
        </IntersectionObserverComp>
      )
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithIntersectionObserver.displayName = `withIntersectionObserverProps(${getDisplayName(
      Target,
    )})`
  }

  return WithIntersectionObserver
}

export default withIntersectionObserver
