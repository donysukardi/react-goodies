import { Component } from 'react'
import PropTypes from 'prop-types'
import { noop, unwrapArray } from '../utils'

class ClickOutside extends Component {
  isTouch = false

  setRef = ref => {
    this.container = ref
  }

  handle = e => {
    if (e.type === 'touchend') {
      this.isTouch = true
    }
    if (e.type === 'click' && this.isTouch) {
      return
    }
    const { onClickOutside } = this.props
    const el = this.container
    if (!el.contains(e.target)) {
      onClickOutside(e)
    }
  }

  addListener() {
    document.addEventListener('touchend', this.handle, true)
    document.addEventListener('click', this.handle, true)
  }

  removeListener() {
    document.removeEventListener('touchend', this.handle, true)
    document.removeEventListener('click', this.handle, true)
  }

  componentDidMount() {
    if (!this.props.disabled) {
      this.addListener()
    }
  }

  componentDidUpdate(prevProps) {
    const { disabled } = this.props
    /* istanbul ignore else  */
    if (prevProps.disabled !== disabled) {
      if (disabled) {
        this.removeListener()
      } else {
        this.addListener()
      }
    }
  }

  componentWillUnmount() {
    this.removeListener()
  }

  render() {
    const children = unwrapArray(this.props.children, noop)
    return children({ setRef: this.setRef })
  }
}

ClickOutside.propTypes = {
  children: PropTypes.func,
  disabled: PropTypes.bool,
  onClickOutside: PropTypes.func.isRequired,
}

export default ClickOutside
