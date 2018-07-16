// @flow

import * as React from 'react'
import classNames from 'classnames'

import dataAttrs from '../lib/dataAttrs'
import type { Dict } from '../lib/types'

type Props = {
  attributes?: Dict<any>,
  children: React.Node,
  className?: string,
  disabled?: boolean,
  id?: string,
  isLoading?: boolean,
  link?: string,
  onClick?: Function,
  theme?: string,
  type?: string,
}

const Button = ({
  attributes = {},
  children,
  className,
  disabled = false,
  isLoading = false,
  id,
  link = '',
  onClick = () => {},
  theme = 'primary',
  type = 'button',
}: Props) =>
  link ? (
    <a
      {...dataAttrs(attributes)}
      className={classNames(`btn btn--${theme}`, className)}
      href={link}
      id={id}
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    <button
      {...dataAttrs(attributes)}
      className={classNames(`btn btn--${theme}`, className, {
        'is-loading': isLoading,
      })}
      disabled={disabled || isLoading}
      id={id}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )

export default Button
