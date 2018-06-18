import React, {Component} from 'react'
import getDisplayName from 'react-display-name'
import OnlineStatus from './OnlineStatus'

const isOnlineStatusSupported =
  global.navigator && typeof global.navigator.onLine !== 'undefined'

const identity = x => x

const withOnlineStatus = (mapStatusToProps = identity) => Target => {
  if (!isOnlineStatusSupported) {
    return Target
  }

  class withOnlineStatus extends Component {
    render() {
      return (
        <OnlineStatus>
          {props => <Target {...this.props} {...mapStatusToProps(props)} />}
        </OnlineStatus>
      )
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    withOnlineStatus.displayName = `withOnlineStatus(${getDisplayName(Target)})`
  }

  return withOnlineStatus
}

export default withOnlineStatus
