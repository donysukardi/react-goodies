/* eslint-disable global-require */
import React from 'react'
import { cleanup, render } from 'react-testing-library'
import { propsToDataAttrs } from '../../testUtils'

const Target = props => (
  <div data-testid="targetContainer" {...propsToDataAttrs(props)} />
)

describe('withMatchMedia', () => {
  let mockJson2mq = null
  let withMatchMedia = null

  afterEach(cleanup)

  beforeEach(() => {
    mockJson2mq = jest.fn()

    jest.mock('json2mq', () => mockJson2mq)
    jest.resetModules()

    withMatchMedia = require('../withMatchMedia').default
  })

  afterAll(() => {
    jest.unmock('json2mq')
  })

  describe('`window.matchMedia` is supported', () => {
    let originMatchMedia = null

    beforeAll(() => {
      originMatchMedia = global.matchMedia
    })

    beforeEach(() => {
      global.matchMedia = () => {}
    })

    afterAll(() => {
      global.matchMedia = originMatchMedia
    })

    it('should just pass props through', () => {
      const EnhancedTarget = withMatchMedia()(Target)
      const { getByTestId } = render(<EnhancedTarget a={1} b={2} c={3} />)

      expect(getByTestId('targetContainer')).toMatchSnapshot()
    })

    describe('display name', () => {
      const origNodeEnv = process.env.NODE_ENV

      afterAll(() => {
        process.env.NODE_ENV = origNodeEnv
      })

      it('should wrap display name in non-production env', () => {
        process.env.NODE_ENV = 'test'

        const EnhancedTarget = withMatchMedia()(Target)
        render(<EnhancedTarget />)
        expect(EnhancedTarget.displayName).toMatchSnapshot()
      })

      it('should not wrap display name in production env', () => {
        process.env.NODE_ENV = 'production'

        const EnhancedTarget = withMatchMedia()(Target)
        render(<EnhancedTarget />)
        expect(EnhancedTarget.displayName).toMatchSnapshot()
      })
    })
  })

  describe('`window.matchMedia` is not supported', () => {
    afterEach(cleanup)

    it('should just pass Target component through', () => {
      const EnhancedTarget = withMatchMedia()(Target)
      const { getByTestId } = render(<EnhancedTarget a={1} b={2} c={3} />)

      expect(getByTestId('targetContainer')).toMatchSnapshot()
    })
  })
})
