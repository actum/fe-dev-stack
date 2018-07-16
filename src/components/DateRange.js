// @flow

import React from 'react'

import format from '../lib/format'

import IconCalendar from '../assets/svg/icon-calendar.svg'

type Props = {
  dateFrom: string,
  dateTo: string,
  className?: string,
  icon?: boolean,
}

const DateRange = ({ className, dateFrom, dateTo, icon }: Props) => (
  <div className={className}>
    {icon && <IconCalendar />}

    {format.dateRange(dateFrom, dateTo)}
  </div>
)

export default DateRange
