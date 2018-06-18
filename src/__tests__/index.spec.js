import {
  PageVisibility,
  MatchMedia,
  OnlineStatus,
  IntersectionObserverComp,
  ClickOutside,
  withPageVisibility,
  withMatchMedia,
  withOnlineStatus,
  withIntersectionObserver,
} from '../index'

test('All components are exported correctly', () => {
  expect(PageVisibility).toBeDefined()
  expect(MatchMedia).toBeDefined()
  expect(OnlineStatus).toBeDefined()
  expect(IntersectionObserverComp).toBeDefined()
  expect(ClickOutside).toBeDefined()
  expect(withPageVisibility).toBeDefined()
  expect(withMatchMedia).toBeDefined()
  expect(withOnlineStatus).toBeDefined()
  expect(withIntersectionObserver).toBeDefined()
})
