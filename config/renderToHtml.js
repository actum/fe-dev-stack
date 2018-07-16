/* eslint-disable import/no-dynamic-require, global-require */

import fs from 'fs'
import fse from 'fs-extra'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from '../src/store/store'
import config from './index'
import join from './join'

fs.readdirSync(join(config.htmlSourceDir)).forEach(async (file) => {
  const Component = await require(join([...config.htmlSourceDir, file])).default
  const comp = (
    <Provider store={configureStore(config.initialState, config.env)}>
      <Component />
    </Provider>
  )

  fse.ensureDirSync(join(config.htmlOutputDir))
  fs.writeFileSync(
    join([...config.htmlOutputDir, file.replace(/\.js$/, '.html')]),
    ReactDOM.renderToStaticMarkup(comp),
    'utf8',
  )
})
