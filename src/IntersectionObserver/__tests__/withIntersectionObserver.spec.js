import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-testing-library'
import { propsToDataAttrs } from '../../testUtils'

const Target = ({ setRef, children, ...props }) => {
  setRef && setRef('ref')
  return (
    <div data-testid="targetContainer" {...propsToDataAttrs(props)}>
      {children}
    </div>
  )
}

Target.propTypes = {
  setRef: PropTypes.func,
  children: PropTypes.node,
}

describe('withIntersectionObserver', () => {
  describe('Intersection Observer API is supported', () => {
    let withIntersectionObserver = null
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

      // eslint-disable-next-line
      withIntersectionObserver = require('../withIntersectionObserver').default
    })

    afterAll(() => {
      global.IntersectionObserver = origIntersectionObserver
    })

    it('should register observer with DOM node from `setRef`', () => {
      const mockObserve = jest.fn()

      global.IntersectionObserver = jest.fn(() => ({
        observe: mockObserve,
      }))

      const EnhancedTarget = withIntersectionObserver()(Target)

      render(<EnhancedTarget />)

      expect(global.IntersectionObserver.mock.calls).toMatchSnapshot()
      expect(mockObserve.mock.calls).toMatchSnapshot()
    })

    it('should register observer with DOM node from `setRef` with a custom handler name', () => {
      const CustomTarget = ({ onMyRef }) => {
        onMyRef('my-ref')

        return null
      }
      const mockObserve = jest.fn()

      global.IntersectionObserver = jest.fn(() => ({
        observe: mockObserve,
      }))

      const EnhancedCustomTarget = withIntersectionObserver({
        refKey: 'onMyRef',
      })(CustomTarget)

      render(<EnhancedCustomTarget />)

      expect(global.IntersectionObserver.mock.calls).toMatchSnapshot()
      expect(mockObserve.mock.calls).toMatchSnapshot()
    })

    it('should call external `setRef` if it has been passed in', () => {
      const mocksetRef = jest.fn()

      global.ResizeObserver = jest.fn(() => ({
        observe: () => {},
      }))

      const EnhancedTarget = withIntersectionObserver()(Target)

      render(<EnhancedTarget setRef={mocksetRef} />)

      expect(mocksetRef.mock.calls).toMatchSnapshot()
    })

    it('should pass Intersection Observer options', () => {
      global.IntersectionObserver = jest.fn(() => ({
        observe: () => {},
      }))

      const EnhancedTarget = withIntersectionObserver({
        options: { foo: 'bar' },
      })(Target)

      render(<EnhancedTarget />)

      expect(global.IntersectionObserver.mock.calls).toMatchSnapshot()
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

        const EnhancedTarget = withIntersectionObserver({
          thresholds: { test: 0 },
        })(Target)
        render(<EnhancedTarget />)
        expect(EnhancedTarget.displayName).toMatchSnapshot()
      })

      it('should not wrap display name in production env', () => {
        process.env.NODE_ENV = 'production'

        const EnhancedTarget = withIntersectionObserver({
          thresholds: { test: 0 },
        })(Target)
        render(<EnhancedTarget />)
        expect(EnhancedTarget.displayName).toMatchSnapshot()
      })
    })
  })

  describe('Intersection Observer API is not supported', () => {
    let withIntersectionObserver = null

    beforeEach(() => {
      jest.resetModules()

      // eslint-disable-next-line
      withIntersectionObserver = require('../withIntersectionObserver').default
    })

    it('should just pass Target component through', () => {
      const EnhancedTarget = withIntersectionObserver()(Target)
      const { getByTestId } = render(<EnhancedTarget a={1} b={2} c={3} />)

      expect(getByTestId('targetContainer')).toMatchSnapshot()
    })
  })
})
