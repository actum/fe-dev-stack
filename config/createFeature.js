/* eslint-disable no-console */

const fs = require('fs')
const fse = require('fs-extra')
const config = require('./index')
const exit = require('./exit')
const join = require('./join')

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const feature = process.argv[2] || exit('Name is missing.')

const templates = {
  'actions.js': `// @flow
`,
  'reducer.js': `// @flow

import type { Action } from '../../lib/types'
import {  } from './actions'

export type State = {}

const initialState: State = {}

export default function reducer(
  state: State = initialState,
  action: Action<any, any>,
): State {
  const { type, payload } = action

  switch (type) {
    default:
      return state
  }
}
`,
  'config.js': `// @flow

import createConfig from '../../lib/createConfig'
import type { Localization } from '../../lib/types'

export type Config = {
  localization: Localization,
}

const config: Config = {
  localization: {},
}

export default createConfig('${feature}')(config)
`,
  'index.js': `// @flow
import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { pipe } from 'ramda'
import type { TranslatorProps } from '../../lib/types'
import type { Config } from './index'
import type { State as DynamicProps } from './reducer'
import * as actions from './actions'

type OwnProps = {
  config: Config,
}

type ActionProps = {}

type Props = OwnProps & DynamicProps & ActionProps & TranslatorProps

const ${capitalize(feature)} = ({  }: Props) => <div>hello world</div>

// TODO revisit mapStateToProps
export default pipe(
  translate('${feature}'),
  connect(
    () => ({}),
    actions,
  ),
)(${capitalize(feature)})
`,
}

Object.entries(templates).forEach(([file, content]) => {
  fse.ensureDirSync(join([...config.featuresSourceDir, capitalize(feature)]))
  fs.writeFileSync(
    join([...config.featuresSourceDir, capitalize(feature), file]),
    content,
    'utf8',
  )
})

const todos = {
  'index.js': `
import ${capitalize(feature)} from './features/${capitalize(feature)}'
...
mount(${capitalize(feature)}, '${feature}Container', '${feature}', {
  props: { config: config.${feature} },
})
`,
  'reducers.js': `
import ${feature} from './features/${capitalize(feature)}/reducer'
...
${feature},
`,
}

console.log('Do not forget to add these:\n')

Object.entries(todos).forEach(([file, todo]) => {
  console.log(file)
  console.log(todo)
})
