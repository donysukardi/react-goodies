import React from 'react'
import {OnlineStatus} from '../../src/index'

const Page = () => (
  <OnlineStatus>
    {({isOnline, isOffline}) => (
      <div>
        <h1>isOnline: {isOnline ? 'true' : 'false'}</h1>
        <h1>isOffline: {isOffline ? 'true' : 'false'}</h1>
      </div>
    )}
  </OnlineStatus>
)

export default Page
