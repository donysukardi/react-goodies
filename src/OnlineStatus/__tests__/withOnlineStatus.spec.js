/* eslint-disable global-require */
import React from 'react'
import { cleanup, render } from 'react-testing-library'
import { propsToDataAttrs } from '../../testUtils'

const Target = props => (
  <div data-testid="targetContainer" {...propsToDataAttrs(props)} />
)
const dummyMapStatusToProps = () => {}

afterEach(cleanup)

describe('withOnlineStatus', () => {
  describe('Online Status API is supported', () => {
    let origOnlineStatus = null
    let withOnlineStatus = null

    afterEach(cleanup)

    beforeAll(() => {
      origOnlineStatus = global.navigator.onLine
    })

    beforeEach(() => {
      jest.resetModules()

      Object.defineProperty(global.navigator, 'onLine', {
        get: () => true,
        configurable: true,
      })
      withOnlineStatus = require('../withOnlineStatus').default
    })

    afterAll(() => {
      Object.defineProperty(global.navigator, 'onLine', {
        get: () => origOnlineStatus,
        configurable: true,
      })
    })

    describe('display name', () => {
      let origNodeEnv = null

      beforeAll(() => {
        origNodeEnv = process.env.NODE_ENV
      })

      afterAll(() => {
        process.env.NODE_ENV = origNodeEnv
      })

      it('should wrap display name in non-production env', () => {
        process.env.NODE_ENV = 'test'

        const EnhancedTarget = withOnlineStatus(dummyMapStatusToProps)(Target)
        render(<EnhancedTarget />)
        expect(EnhancedTarget.displayName).toMatchSnapshot()
      })

      it('should not wrap display name in production env', () => {
        process.env.NODE_ENV = 'production'

        const EnhancedTarget = withOnlineStatus()(Target)
        render(<EnhancedTarget />)
        expect(EnhancedTarget.displayName).toMatchSnapshot()
      })
    })
  })

  describe('Online Status API is not supported', () => {
    let origOnlineStatus = null
    let withOnlineStatus = null

    beforeAll(() => {
      origOnlineStatus = global.navigator.onLine
    })

    beforeEach(() => {
      jest.resetModules()

      Object.defineProperty(global.navigator, 'onLine', {
        get: () => undefined,
        configurable: true,
      })
      withOnlineStatus = require('../withOnlineStatus').default
    })

    afterAll(() => {
      Object.defineProperty(global.navigator, 'onLine', {
        get: () => origOnlineStatus,
        configurable: true,
      })
    })

    it('should just pass Target component through', () => {
      const EnhancedTarget = withOnlineStatus(dummyMapStatusToProps)(Target)
      const { getByTestId } = render(<EnhancedTarget a={1} b={2} c={3} />)

      expect(getByTestId('targetContainer')).toMatchSnapshot()
    })
  })
})
