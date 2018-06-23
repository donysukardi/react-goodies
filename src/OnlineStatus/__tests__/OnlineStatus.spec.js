/* eslint-disable global-require */
import React from 'react'
import { cleanup, render } from 'react-testing-library'
import { propsToDataAttrs } from '../../testUtils'

const Target = props => (
  <div data-testid="targetContainer" {...propsToDataAttrs(props)} />
)

const renderTarget = props => <Target {...props} />

describe('OnlineStatus', () => {
  describe('Online Status API is supported', () => {
    let origOnlineStatus = null
    let OnlineStatus = null

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
      OnlineStatus = require('../OnlineStatus').default
    })

    afterAll(() => {
      Object.defineProperty(global.navigator, 'onLine', {
        get: () => origOnlineStatus,
        configurable: true,
      })
    })

    it('should set initial state', () => {
      const { getByTestId } = render(
        <OnlineStatus>{renderTarget}</OnlineStatus>,
      )

      expect(getByTestId('targetContainer')).toMatchSnapshot()
    })

    it('should handle online status change', () => {
      const { getByTestId } = render(
        <OnlineStatus>{renderTarget}</OnlineStatus>,
      )

      global.dispatchEvent(new CustomEvent('offline'))
      expect(getByTestId('targetContainer')).toMatchSnapshot()
      global.dispatchEvent(new CustomEvent('online'))
      expect(getByTestId('targetContainer')).toMatchSnapshot()
    })

    it('should remove event listener on unrender', () => {
      const spy = jest.spyOn(global, 'removeEventListener')

      const { unmount } = render(<OnlineStatus>{renderTarget}</OnlineStatus>)
      unmount()

      global.document.dispatchEvent(new CustomEvent('offline'))

      expect(spy.mock.calls).toMatchSnapshot()

      global.removeEventListener.mockRestore()
    })
  })
})
