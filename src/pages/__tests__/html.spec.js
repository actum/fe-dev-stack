// @flow

import React from 'react'
import renderer from 'react-test-renderer'
import html from '../html'

test('html', async () => {
  const Page = await html('foo')
  const tree = renderer.create(<Page />).toJSON()
  expect(tree).toMatchSnapshot()
})
