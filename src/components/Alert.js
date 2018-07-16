// @flow

import React from 'react'
import classNames from 'classnames'

import moment from 'moment'
import type Moment from 'moment'

import { availabilityStatus } from '../lib/constants'

type Props = {
  status: string,
  className?: string,
  title?: string,
  text?: string,
  preBookedUntil?: ?Moment,
}

const Alert = ({ className, title, text, preBookedUntil, status }: Props) => {
  if (status === availabilityStatus.available.STATUS) return null

  return (
    <div
      className={classNames(
        `alert alert--${availabilityStatus[status].ALERT}`,
        className,
      )}
    >
      <strong>{title}</strong>
      <br />
      {text}{' '}
      {status === availabilityStatus.preBookedByMe.STATUS &&
        moment(preBookedUntil).format('dddd Do MMMM')}
    </div>
  )
}

export default Alert
