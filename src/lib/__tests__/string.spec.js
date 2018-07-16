// @flow

import string from '../string'

test('Converts camel case key properties to snake case', () => {
  expect(
    string.toSnakeCase({
      boatId: 12345,
    }),
  ).toEqual({
    boat_id: 12345,
  })
})

test('Converts string to number', () => {
  expect(string.toNumber('11240')).toEqual(11240)
  expect(string.toNumber('241,21')).toEqual(241)
  expect(string.toNumber('5512,76')).toEqual(5512)
  expect(string.toNumber('foo')).toEqual(NaN)
})
