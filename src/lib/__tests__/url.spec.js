// @flow

import url from '../url'

test('should create url string from base url and query params object', () => {
  expect(
    url.createUrl('https:///www.zindulka.com/boatDetail', {
      boatId: 1234,
      providerId: 1234,
    }),
  ).toBe('https:///www.zindulka.com/boatDetail?boatId=1234&providerId=1234')
})

test('should add query params to url if they are already in base url', () => {
  expect(
    url.createUrl('https:///www.zindulka.com/boatDetail?boatId=1234', {
      providerId: 1234,
    }),
  ).toBe('https:///www.zindulka.com/boatDetail?boatId=1234&providerId=1234')
})

test('creates mailto url string from base url and options object object without a recipient', () => {
  expect(
    url.createMailtoUrl({
      body: `\n${'Hello World'}`,
      subject: 'Hello World',
    }),
  ).toBe('mailto:?body=%0AHello%20World&subject=Hello%20World')
})

test('creates mailto url string from base url and options object with a recipient', () => {
  expect(
    url.createMailtoUrl({
      body: `\n${'Hello World'}`,
      recipient: 'info@yachting.com',
      subject: 'Hello World',
    }),
  ).toBe('mailto:info@yachting.com?body=%0AHello%20World&subject=Hello%20World')
})

test('should get hash anchor from url and if exists execute a function', () => {
  const win = {
    location: { hash: '#anchor=abc,1' },
  }
  const cb = jest.fn()
  url.getHash(win, 'anchor', cb)
  expect(cb).toHaveBeenCalledWith(['abc', '1'])
})

test('get undefined hash anchor from url does not call callback', () => {
  const win = {
    location: { hash: '#anchor=abc,1' },
  }
  const cb = jest.fn()
  url.getHash(win, 'whatever', cb)
  expect(cb).not.toHaveBeenCalled()
})

test('set hash', () => {
  const win = {
    location: { hash: '#anchor=abc,1' },
  }
  url.setHash(win, 'foo', ['x', 'y'])
  expect(win.location.hash).toBe('anchor=abc,1;foo=x,y')
})

test('unset hash', () => {
  const win = {
    location: { hash: '#anchor=abc,1' },
  }
  url.setHash(win, 'anchor', null)
  expect(win.location.hash).toBe('')
})
