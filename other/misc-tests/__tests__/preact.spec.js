// Tell Babel to transform JSX into preact.h() calls:
/** @jsx preact.h */
/*
eslint-disable
global-require,
react/prop-types,
no-console,
react/display-name,
import/extensions,
import/no-unresolved
*/

/*
Testing the preact version is a tiny bit complicated because
we need the preact build (the one that imports 'preact' rather
than 'react') otherwise things don't work very well.
So there's a script `test.build` which will run the cjs build
for preact before running this test.
 */

import preact from 'preact'
import render from 'preact-render-to-string'

test('works with preact', () => {
  const childrenSpy = jest.fn()

  const origVisibilityState = global.document.visibilityState

  Object.defineProperty(global.document, 'visibilityState', {
    get: () => 'visible',
    configurable: true,
  })

  const { PageVisibility } = require('../../../preact')

  const ui = <PageVisibility>{childrenSpy}</PageVisibility>
  render(ui)

  expect(childrenSpy).toHaveBeenCalledWith(
    expect.objectContaining({
      isHidden: false,
      isPrerendered: false,
      isUnloaded: false,
      isVisible: true,
    }),
  )

  Object.defineProperty(global.document, 'visibilityState', {
    get: () => origVisibilityState,
  })
})
