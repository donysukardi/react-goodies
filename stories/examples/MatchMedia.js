import React from 'react'
import {MatchMedia} from '../../src/index'

const Page = () => (
  <MatchMedia
    query={{
      isSmallScreen: {
        maxWidth: 500,
      },
      isHighDpiScreen: {
        minResolution: '192dpi',
      },
    }}
  >
    {props => <h1>props: {JSON.stringify(props)}</h1>}
  </MatchMedia>
)

export default Page
