import { Component } from 'react'
import PropTypes from 'prop-types'

class OnlineStatus extends Component {
  constructor(props, context) {
    super(props, context)
    const { onLine } = global.navigator
    this.state = {
      isOnline: onLine,
      isOffline: !onLine,
    }
  }

  handleOnline = () => {
    this.setState({
      isOnline: true,
      isOffline: false,
    })
  }

  handleOffline = () => {
    this.setState({
      isOnline: false,
      isOffline: true,
    })
  }

  componentDidMount() {
    global.addEventListener('online', this.handleOnline, false)
    global.addEventListener('offline', this.handleOffline, false)
  }

  componentWillUnmount() {
    global.removeEventListener('online', this.handleOnline)
    global.removeEventListener('offline', this.handleOffline)
  }

  render() {
    const { children } = this.props
    return children({
      ...this.state,
    })
  }
}

OnlineStatus.propTypes = {
  children: PropTypes.func.isRequired,
}

export default OnlineStatus
