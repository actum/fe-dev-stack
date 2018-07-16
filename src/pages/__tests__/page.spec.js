// @flow

import React from 'react'
import renderer from 'react-test-renderer'
import type { Dict } from '../../lib/types'
import page from '../page'

const config = {
  publicPathDist: '/assets',
  publicPathDev: '/public/dev',
  cookies: {},
}

const pageConfig = { foo: 'bar' }

describe('page', () => {
  it('renders in production mode', async () => {
    const env = {
      NODE_ENV: 'production',
    }
    const initialState = {
      auth: { loggedIn: false },
    }
    const Page = await page(pageConfig)(<div id="foo" />)(
      { ...config, env },
      initialState,
    )
    const tree = renderer.create(<Page />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders in development mode', async () => {
    const env = {
      NODE_ENV: 'development',
    }
    const initialState = {
      auth: { loggedIn: false },
    }
    const Page = await page(pageConfig)(<div id="foo" />)(
      { ...config, env },
      initialState,
    )
    const tree = renderer.create(<Page />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders async page config', async () => {
    const env = {
      NODE_ENV: 'development',
    }
    const initialState = {
      auth: { loggedIn: false },
    }
    const Page = await page(
      (): Promise<Dict<any>> => Promise.resolve(pageConfig),
    )(<div id="foo" />)({ ...config, env }, initialState)
    const tree = renderer.create(<Page />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders error when async config throws', async () => {
    const env = {
      NODE_ENV: 'development',
    }
    const initialState = {
      auth: { loggedIn: false },
    }
    const Page = await page(
      (): Promise<Dict<any>> => Promise.reject(new Error('nein!')),
    )(<div id="foo" />)({ ...config, env }, initialState)
    const tree = renderer.create(<Page />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
