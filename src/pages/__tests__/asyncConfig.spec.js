// @flow

import asyncConfig from '../asyncConfig'

const config = {
  publicPathDist: '/assets',
  publicPathDev: '/public/dev',
  cookies: {},
  env: {
    NODE_ENV: 'test',
  },
}

describe('asyncConfig', () => {
  it('tests just base config', () => {
    const base = { foo: 'bar' }
    expect(asyncConfig(base)(config)).resolves.toEqual(base)
  })

  it('tests multiple async configs', () => {
    const base = { foo: 'bar' }
    const a = [['a', 'x'], () => Promise.resolve({ foo: 'foo' })]
    const b = [['b', 'y'], () => Promise.resolve({ bar: 'bar' })]
    expect(asyncConfig(base, a, b)(config)).resolves.toEqual({
      ...base,
      a: { x: { foo: 'foo' } },
      b: { y: { bar: 'bar' } },
    })
  })

  it('tests context paramter', async () => {
    const base = {}
    const f = jest
      .fn()
      .mockReturnValue(Promise.resolve({ whatever: 'whatever' }))
    await asyncConfig(base, [[], f])(config)
    expect(f).toHaveBeenCalledWith(config)
  })
})
