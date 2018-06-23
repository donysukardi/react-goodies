import { noop, unwrapArray } from '../utils'

describe('noop', () => {
  it("doesn't throw", () => {
    expect(noop).not.toThrow()
  })
})

describe('unwrapArray', () => {
  it('sets to defaultValue', () => {
    const spy = jest.fn()
    const fn = unwrapArray(null, spy)
    fn && fn()

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
