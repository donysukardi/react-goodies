import React, { Component } from 'react'
import getDisplayName from 'react-display-name'
import PageVisibility from './PageVisibility'

const isPageVisibilitySupported =
  global.document && typeof global.document.visibilityState !== 'undefined'

const identity = x => x

const withPageVisibility = (mapStatusToProps = identity) => Target => {
  if (!isPageVisibilitySupported) {
    return Target
  }

  class withPageVisibility extends Component {
    render() {
      return (
        <PageVisibility>
          {props => <Target {...this.props} {...mapStatusToProps(props)} />}
        </PageVisibility>
      )
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    withPageVisibility.displayName = `withPageVisibility(${getDisplayName(
      Target,
    )})`
  }

  return withPageVisibility
}

export default withPageVisibility
