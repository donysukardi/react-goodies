import React from 'react'
import PropTypes from 'prop-types'
import { cleanup, render } from 'react-testing-library'
import IntersectionObserverComp from '../IntersectionObserverComp'
import { propsToDataAttrs } from '../../testUtils'

const Target = ({ setRef, children, ...props }) => {
  setRef('ref')
  return (
    <div data-testid="targetContainer" {...propsToDataAttrs(props)}>
      {children}
    </div>
  )
}
Target.propTypes = {
  setRef: PropTypes.func.isRequired,
  children: PropTypes.node,
}

describe('withIntersectionObserverProps', () => {
  describe('Intersection Observer API is supported', () => {
    let origIntersectionObserver = null

    beforeAll(() => {
      origIntersectionObserver = global.IntersectionObserver
    })

    beforeEach(() => {
      jest.resetModules()

      global.IntersectionObserver = jest.fn(() => ({
        observe: () => {},
        disconnect: () => {},
      }))
    })

    afterEach(cleanup)

    afterAll(() => {
      global.IntersectionObserver = origIntersectionObserver
    })

    it('should register observer with DOM node from `setRef`', () => {
      const mockObserve = jest.fn()

      global.IntersectionObserver = jest.fn(() => ({
        observe: mockObserve,
      }))

      render(
        <IntersectionObserverComp
          thresholds={{
            foo: 0.5,
            bar: 1,
          }}
        >
          {props => <Target {...props} />}
        </IntersectionObserverComp>,
      )

      expect(global.IntersectionObserver.mock.calls).toMatchSnapshot()
      expect(mockObserve.mock.calls).toMatchSnapshot()
    })

    it('should unregister observer with DOM node on unmount', () => {
      const mockObserve = jest.fn()
      const mockUnobserve = jest.fn()

      global.IntersectionObserver = jest.fn(() => ({
        observe: mockObserve,
        disconnect: mockUnobserve,
      }))

      const { unmount } = render(
        <IntersectionObserverComp
          thresholds={{
            foo: 0.5,
            bar: 1,
          }}
        >
          {props => <Target {...props} />}
        </IntersectionObserverComp>,
      )

      unmount()

      expect(mockUnobserve.mock.calls).toMatchSnapshot()
    })

    it('should pass Intersection Observer options', () => {
      global.IntersectionObserver = jest.fn(() => ({
        observe: () => {},
      }))

      render(
        <IntersectionObserverComp
          options={{
            foo: 'bar',
          }}
        >
          {props => <Target {...props} />}
        </IntersectionObserverComp>,
      )

      expect(global.IntersectionObserver.mock.calls).toMatchSnapshot()
    })

    it('should map observer state to boolean props', () => {
      let observerCallback = null

      global.IntersectionObserver = jest.fn(callback => {
        observerCallback = callback

        return {
          observe: () => {},
        }
      })

      const { getByTestId } = render(
        <IntersectionObserverComp
          thresholds={{
            foo: 0.5,
            bar: 1,
          }}
        >
          {props => <Target {...props} />}
        </IntersectionObserverComp>,
      )
      expect(getByTestId('targetContainer')).toMatchSnapshot()

      observerCallback([{ isIntersecting: false, intersectionRatio: 0.5 }])
      expect(getByTestId('targetContainer')).toMatchSnapshot()

      observerCallback([{ isIntersecting: true, intersectionRatio: 0.5 }])
      expect(getByTestId('targetContainer')).toMatchSnapshot()

      observerCallback([{ isIntersecting: true, intersectionRatio: 1 }])
      expect(getByTestId('targetContainer')).toMatchSnapshot()
    })
  })
})
