// @flow

import unsafe from '../unsafe'

test('unsafe acts as an identity function', () => {
  const value = { foo: 'bar' }
  expect(unsafe(value)).toBe(value)
})
