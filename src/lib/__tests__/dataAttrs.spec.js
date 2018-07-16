// @flow

import dataAttrs from '../dataAttrs'

describe('data attributes', () => {
  it('accepts undefined', () => {
    expect(dataAttrs(undefined)).toEqual({})
  })
  it('does not encode string value to JSON', () => {
    expect(dataAttrs({ foo: 'bar' })).toEqual({ 'data-foo': 'bar' })
  })
  it('encodes non string values to JSON', () => {
    expect(dataAttrs({ foo: [1, 2] })).toEqual({ 'data-foo': '[1,2]' })
    expect(dataAttrs({ foo: {} })).toEqual({ 'data-foo': '{}' })
  })
})
