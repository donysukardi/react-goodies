import React from 'react'
import {cleanup, fireEvent, renderIntoDocument} from 'react-testing-library'
import 'jest-dom/extend-expect'

import ClickOutside from '../ClickOutside'

afterEach(cleanup)

const ClickOutsideExample = props => (
  <div data-testid="outsideContainer">
    <button type="button" data-testid="outsideButton">
      Outside Button
    </button>
    <ClickOutside {...props}>
      {({setRef}) => (
        <div ref={setRef} data-testid="insideContainer">
          <button type="button" data-testid="insideButton">
            Inside Button
          </button>
        </div>
      )}
    </ClickOutside>
  </div>
)

describe('ClickOutside', () => {
  it('calls onClickOutside when an element outside gets clicked', () => {
    const spy = jest.fn()
    const {getByTestId} = renderIntoDocument(
      <ClickOutsideExample onClickOutside={spy} />,
    )
    fireEvent(
      getByTestId('outsideButton'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )
    expect(spy).toHaveBeenCalledTimes(1)

    fireEvent(
      getByTestId('outsideContainer'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it("doesn't call onClickOutside when an element inside gets clicked", () => {
    const spy = jest.fn()
    const {getByTestId} = renderIntoDocument(
      <ClickOutsideExample onClickOutside={spy} />,
    )
    fireEvent(
      getByTestId('insideButton'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )
    expect(spy).not.toHaveBeenCalled()

    fireEvent(
      getByTestId('insideContainer'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )
    expect(spy).not.toHaveBeenCalled()
  })

  it('calls onClickOutside when an element outside gets touched', () => {
    const spy = jest.fn()
    const {getByTestId} = renderIntoDocument(
      <ClickOutsideExample onClickOutside={spy} />,
    )
    fireEvent(
      getByTestId('outsideButton'),
      new MouseEvent('touchend', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )
    fireEvent(
      getByTestId('outsideButton'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )
    expect(spy).toHaveBeenCalledTimes(1)

    fireEvent(
      getByTestId('outsideContainer'),
      new MouseEvent('touchend', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )
    fireEvent(
      getByTestId('outsideContainer'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it("[disabled] doesn't call onClickOutside when an element outside gets clicked", () => {
    const spy = jest.fn()
    const {getByTestId} = renderIntoDocument(
      <ClickOutsideExample disabled onClickOutside={spy} />,
    )
    fireEvent(
      getByTestId('outsideButton'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )
    expect(spy).not.toHaveBeenCalled()

    fireEvent(
      getByTestId('outsideContainer'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )
    expect(spy).not.toHaveBeenCalled()
  })

  it('removes event handler when switches to disabled', () => {
    const spy = jest.fn()
    const {getByTestId, rerender} = renderIntoDocument(
      <ClickOutsideExample onClickOutside={spy} />,
    )
    fireEvent(
      getByTestId('outsideButton'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )
    expect(spy).toHaveBeenCalledTimes(1)

    rerender(<ClickOutsideExample disabled onClickOutside={spy} />)

    fireEvent(
      getByTestId('outsideContainer'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('adds event handler when switches from disabled', () => {
    const spy = jest.fn()
    const {getByTestId, rerender} = renderIntoDocument(
      <ClickOutsideExample disabled onClickOutside={spy} />,
    )
    fireEvent(
      getByTestId('outsideButton'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )
    expect(spy).not.toHaveBeenCalled()

    rerender(<ClickOutsideExample onClickOutside={spy} />)

    fireEvent(
      getByTestId('outsideContainer'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    )

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
