/* eslint-disable import/no-dynamic-require, global-require, no-console */

import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from '../src/store/store'
import page from '../src/pages/page'
import join from './join'

const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1)

const requirePage = (feature, pagesSourceDir) =>
  require(join([...pagesSourceDir, feature])).default

const requireFeatureWithDefaultPageLayout = (feature, featuresSourceDir) => {
  let config = {}
  let error = false

  try {
    config = require(join([...featuresSourceDir, feature, 'config'])).default
  } catch (e) {
    console.log(e)
    error = true
  }

  return page(config, feature)(
    <div className="container" id={`${lowerFirst(feature)}Container`}>
      {error && `Feature ${feature} is not meant to be rendered.`}
    </div>,
  )
}

const requireComponent = (feature, { featuresSourceDir, pagesSourceDir }) => {
  try {
    return requirePage(feature, pagesSourceDir)
  } catch (e) {
    return requireFeatureWithDefaultPageLayout(feature, featuresSourceDir)
  }
}

export default async function(file, config, initialState) {
  const Component = await requireComponent(file, config)(config, initialState)
  const comp = (
    <Provider store={configureStore({}, config.env)}>
      <Component />
    </Provider>
  )
  return `<!doctype html>${ReactDOM.renderToStaticMarkup(comp)}`
}
