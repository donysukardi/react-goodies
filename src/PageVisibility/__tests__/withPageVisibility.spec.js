/* eslint-disable global-require */
import React from 'react'
import { cleanup, render } from 'react-testing-library'

import { propsToDataAttrs } from '../../testUtils'

const Target = props => (
  <div data-testid="targetContainer" {...propsToDataAttrs(props)} />
)

const dummyMapStatusToProps = () => {}
const fullMapStatusToProps = ({
  isVisible,
  isHidden,
  isPrerendered,
  isUnloaded,
}) => ({
  isVisible,
  isHidden,
  isPrerendered,
  isUnloaded,
})

describe('withPageVisibility', () => {
  describe('Page Visibility API is supported', () => {
    let withPageVisibility = null
    let origVisibilityState = null

    afterEach(cleanup)

    beforeAll(() => {
      origVisibilityState = global.document.visibilityState
    })

    beforeEach(() => {
      jest.resetModules()

      Object.defineProperty(global.document, 'visibilityState', {
        get: () => 'visible',
        configurable: true,
      })
      withPageVisibility = require('../withPageVisibility').default
    })

    afterAll(() => {
      Object.defineProperty(global.document, 'visibilityState', {
        get: () => origVisibilityState,
      })
    })

    it('should set initial state', () => {
      const EnhancedTarget = withPageVisibility(fullMapStatusToProps)(Target)
      const { getByTestId } = render(<EnhancedTarget />)

      expect(getByTestId('targetContainer')).toMatchSnapshot()
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

        const EnhancedTarget = withPageVisibility(dummyMapStatusToProps)(Target)
        render(<EnhancedTarget />)
        expect(EnhancedTarget.displayName).toMatchSnapshot()
      })

      it('should not wrap display name in production env', () => {
        process.env.NODE_ENV = 'production'

        const EnhancedTarget = withPageVisibility()(Target)
        render(<EnhancedTarget />)
        expect(EnhancedTarget.displayName).toMatchSnapshot()
      })
    })
  })

  describe('Page Visibility API is not supported', () => {
    let withPageVisibility = null
    let origVisibilityState = null

    afterEach(cleanup)

    beforeAll(() => {
      origVisibilityState = global.document.visibilityState
    })

    beforeEach(() => {
      jest.resetModules()

      Object.defineProperty(global.document, 'visibilityState', {
        get: () => undefined,
        configurable: true,
      })
      withPageVisibility = require('../withPageVisibility').default
    })

    afterAll(() => {
      Object.defineProperty(global.document, 'visibilityState', {
        get: () => origVisibilityState,
      })
    })

    it('should just pass Target component through', () => {
      const EnhancedTarget = withPageVisibility(dummyMapStatusToProps)(Target)
      const { getByTestId } = render(<EnhancedTarget a={1} b={2} c={3} />)

      expect(getByTestId('targetContainer')).toMatchSnapshot()
    })
  })
})
