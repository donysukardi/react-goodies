import React from 'react'
import { PageVisibility } from '../../src/index'

const Page = ({ onHidden, onVisible }) => (
  <PageVisibility>
    {props => (
      <div>
        <h1>Switch to another tab, go back here and check console logs.</h1>
        {props.isVisible && onVisible && onVisible()}
        {props.isHidden && onVisible && onHidden()}
        {console.log(props)}
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </div>
    )}
  </PageVisibility>
)

export default Page
