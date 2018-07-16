// @flow

import moment from 'moment'

import format from '../format'

describe('Formats two date in a range based on locale', () => {
  const dateFrom = '2018-07-07'
  const dateTo = '2018-07-14'

  test('locale english', () => {
    moment.locale('en')

    expect(format.dateRange(dateFrom, dateTo)).toEqual(
      '07/07/2018 - 07/14/2018',
    )
  })

  test('locale czech', () => {
    moment.locale('cs')

    expect(format.dateRange(dateFrom, dateTo)).toEqual(
      '07.07.2018 - 14.07.2018',
    )
  })
})

describe('Sets currency and number format', () => {
  test('CZK', () => {
    expect(format.money(1000, 'czk')).toEqual('1 000 Kč')
  })

  test('USD', () => {
    expect(format.money(10000, 'usd')).toEqual('$ 10,000')
  })

  test('GBP', () => {
    expect(format.money(23191512.32, 'gbp')).toEqual('£ 23,191,512')
  })

  test('EUR', () => {
    expect(format.money(21582.56, 'eur')).toEqual('21 583 €')
  })
})
