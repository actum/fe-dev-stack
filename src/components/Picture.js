// @flow

import React from 'react'
import type { URL } from '../lib/types'

type Source = {|
  view: string,
  src: URL,
|}

type Props = {
  alt: string,
  defaultSrc: URL,
  className?: string,
  imgClass?: string,
  sources?: Source[],
}

const Picture = ({ alt, className, defaultSrc, imgClass, sources }: Props) => (
  <picture className={className}>
    {sources
      ? sources.map(({ view, src }) => (
          <source media={`(min-width: ${view}px)`} srcSet={src} />
        ))
      : null}

    <img alt={alt} className={imgClass} srcSet={defaultSrc} title={alt} />
  </picture>
)

export default Picture
