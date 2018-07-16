// @flow

import fs from 'fs'
import React from 'react'
import { chain, pipe, uniqBy, toLower } from 'ramda'
import join from '../../dev/join'
import config from '../../dev/config'
import page from './page'

const getDirectories = (path: string[]): string[] =>
  fs
    .readdirSync(join(path))
    .filter((file) => fs.lstatSync(join([...path, file])).isDirectory())
    .filter((file) => file !== '__tests__')

const pages: string[] = pipe(
  chain(getDirectories),
  uniqBy(toLower),
)([config.featuresSourceDir, config.pagesSourceDir])

const Page = page()(
  <div className="container">
    <div className="page-header">
      <h1 className="page-title">Pages</h1>
    </div>
    <ul>
      {pages.map((file) => (
        <li>
          <a href={`/${file}`}>{file}</a>
        </li>
      ))}
    </ul>
  </div>,
)

export default Page
