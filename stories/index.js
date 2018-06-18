import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ClickOutside from './examples/ClickOutside'
import IntersectionObserverComp from './examples/IntersectionObserverComp'
import MatchMedia from './examples/MatchMedia'
import OnlineStatus from './examples/OnlineStatus'
import PageVisibility from './examples/PageVisibility'

storiesOf('ClickOutside', module).add('example', () => (
  <ClickOutside onClickOutside={action('clicked outside')} />
))

storiesOf('IntersectionObserverComp', module).add('example', () => (
  <IntersectionObserverComp />
))

storiesOf('MatchMedia', module).add('example', () => <MatchMedia />)

storiesOf('OnlineStatus', module).add('example', () => <OnlineStatus />)

storiesOf('PageVisibility', module).add('example', () => (
  <PageVisibility onVisible={action('visible')} onHidden={action('hidden')} />
))
