/* eslint-disable global-require */
import React from 'react'
import { render } from 'react-testing-library'
import { propsToDataAttrs } from '../../testUtils'

const Target = props => (
  <div data-testid="targetContainer" {...propsToDataAttrs(props)} />
)

const renderTarget = props => <Target {...props} />

describe('PageVisibility', () => {
  describe('Page Visibility API is supported', () => {
    let PageVisibility = null
    let origVisibilityState = null

    beforeAll(() => {
      origVisibilityState = global.document.visibilityState
    })

    beforeEach(() => {
      jest.resetModules()

      Object.defineProperty(global.document, 'visibilityState', {
        get: () => 'visible',
        configurable: true,
      })
      PageVisibility = require('../PageVisibility').default
    })

    afterAll(() => {
      Object.defineProperty(global.document, 'visibilityState', {
        get: () => origVisibilityState,
      })
    })

    it('should set initial state', () => {
      const { getByTestId } = render(
        <PageVisibility>{renderTarget}</PageVisibility>,
      )

      expect(getByTestId('targetContainer')).toMatchSnapshot()
    })

    it('should handle page visibility state change', () => {
      const { getByTestId } = render(
        <PageVisibility>{renderTarget}</PageVisibility>,
      )

      Object.defineProperty(global.document, 'visibilityState', {
        get: () => 'hidden',
        configurable: true,
      })
      global.document.dispatchEvent(new CustomEvent('visibilitychange'))

      expect(getByTestId('targetContainer')).toMatchSnapshot()
    })

    it('should remove event listener on unrender', () => {
      const mockVisibility = jest.fn(() => 'hidden')
      const { unmount } = render(
        <PageVisibility>{renderTarget}</PageVisibility>,
      )

      unmount()

      Object.defineProperty(global.document, 'visibilityState', {
        get: mockVisibility,
        configurable: true,
      })
      global.document.dispatchEvent(new CustomEvent('visibilitychange'))

      expect(mockVisibility.mock.calls).toMatchSnapshot()
    })
  })
})
