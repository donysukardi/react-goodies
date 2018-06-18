import React, { Component } from 'react'
import getDisplayName from 'react-display-name'
import MatchMedia from './MatchMedia'

const isMatchMediaSupported = typeof global.matchMedia === 'function'

const withMatchMedia = (query = {}) => Target => {
  if (!isMatchMediaSupported) {
    return Target
  }

  class withMatchMedia extends Component {
    render() {
      return (
        <MatchMedia query={query}>
          {props => <Target {...this.props} {...props} />}
        </MatchMedia>
      )
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    withMatchMedia.displayName = `withMatchMedia(${getDisplayName(Target)})`
  }

  return withMatchMedia
}

export default withMatchMedia
