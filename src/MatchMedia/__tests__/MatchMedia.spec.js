/* eslint-disable global-require */
import React from 'react'
import { cleanup, render } from 'react-testing-library'
import { propsToDataAttrs } from '../../testUtils'

const Target = props => (
  <div data-testid="targetContainer" {...propsToDataAttrs(props)} />
)

const renderTarget = props => <Target {...props} />

describe('MatchMedia', () => {
  let mockJson2mq = null
  let MatchMedia = null

  afterEach(cleanup)

  beforeEach(() => {
    mockJson2mq = jest.fn()

    jest.mock('json2mq', () => mockJson2mq)
    jest.resetModules()

    MatchMedia = require('../MatchMedia').default
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

    it('should pass query object to json2mq', () => {
      global.matchMedia = jest.fn(() => ({
        addListener: () => {},
        removeListener: () => {},
        matches: true,
      }))

      render(
        <MatchMedia
          query={{
            test: {
              maxWidth: 300,
            },
          }}
        >
          {renderTarget}
        </MatchMedia>,
      )

      expect(mockJson2mq.mock.calls).toMatchSnapshot()
    })

    it('should set initial state and provide props with matched queries', () => {
      global.matchMedia = jest.fn(() => ({
        addListener: () => {},
        removeListener: () => {},
        matches: true,
      }))

      const { getByTestId } = render(
        <MatchMedia
          query={{
            test: {
              maxWidth: 300,
            },
          }}
        >
          {renderTarget}
        </MatchMedia>,
      )

      expect(getByTestId('targetContainer')).toMatchSnapshot()
    })

    it('should subscribe on render and unsubscribe on unrender', () => {
      const mockAddListener = jest.fn()
      const mockRemoveListener = jest.fn()

      global.matchMedia = jest.fn(() => ({
        addListener: mockAddListener,
        removeListener: mockRemoveListener,
      }))

      const { unmount } = render(
        <MatchMedia
          query={{
            test: {
              maxWidth: 300,
            },
          }}
        >
          {renderTarget}
        </MatchMedia>,
      )

      expect(mockAddListener.mock.calls).toMatchSnapshot()
      unmount()
      expect(mockRemoveListener.mock.calls).toMatchSnapshot()
      expect(mockRemoveListener).toHaveBeenCalledWith(
        mockAddListener.mock.calls[0][0],
      )
    })

    it('should change state and provide props when query has been matched', () => {
      const mockAddListener = jest.fn()

      global.matchMedia = jest.fn(() => ({
        addListener: mockAddListener,
        removeListener: () => {},
        matches: false,
      }))

      const { getByTestId } = render(
        <MatchMedia
          query={{
            test: {
              maxWidth: 300,
            },
          }}
        >
          {renderTarget}
        </MatchMedia>,
      )

      mockAddListener.mock.calls[0][0]({ matches: true })

      expect(getByTestId('targetContainer')).toMatchSnapshot()
    })
  })
})
