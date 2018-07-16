// @flow

import accounting from 'accounting'
import moment from 'moment'

import { currencies } from './constants'

type Currency = $Keys<typeof currencies>

export default {
  money(amount: number, currency: Currency = 'eur'): string {
    return accounting.formatMoney(amount, currencies[currency.toLowerCase()])
  },

  dateRange(dateFrom: string, dateTo: string): string {
    return `${moment(dateFrom).format('L')} - ${moment(dateTo).format('L')}`
  },
}
