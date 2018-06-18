import React from 'react'
import {IntersectionObserverComp} from '../../src/index'

const Target = () => (
  <IntersectionObserverComp
    thresholds={{
      isOnePixelVisible: 0.0,
      isHalfVisible: 0.5,
      isFullVisible: 1.0,
    }}
  >
    {({isOnePixelVisible, isHalfVisible, isFullVisible, setRef}) => (
      <div
        ref={setRef}
        style={{backgroundColor: 'RebeccaPurple', color: 'white'}}
      >
        <p>{JSON.stringify({isOnePixelVisible})}</p>
        <p>{JSON.stringify({isHalfVisible})}</p>
        <p>{JSON.stringify({isFullVisible})}</p>
      </div>
    )}
  </IntersectionObserverComp>
)

const Page = () => (
  <div
    style={{
      height: '300px',
      overflow: 'scroll',
      fontSize: 32,
      border: '1px solid black',
    }}
  >
    <div style={{height: '300px'}}>Scroll me down</div>
    <Target />
    <div style={{height: '300px'}} />
  </div>
)

export default Page
