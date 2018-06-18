import React from 'react'
import {ClickOutside} from '../../src/index'

class Page extends React.Component {
  state = {
    active: false,
  }

  handleClick = e => {
    this.setState(state => ({
      active: !state.active,
    }))
  }

  handleClickOutside = e => {
    const {onClickOutside} = this.props
    onClickOutside && onClickOutside()
    this.setState(state => ({
      active: false,
    }))
  }

  render() {
    const {active} = this.state
    return (
      <ClickOutside disabled={!active} onClickOutside={this.handleClickOutside}>
        {({setRef}) => (
          <div ref={setRef}>
            <button type="button" onClick={this.handleClick}>
              Toggle
            </button>
            {active && <div>Hello there</div>}
          </div>
        )}
      </ClickOutside>
    )
  }
}

export default Page
