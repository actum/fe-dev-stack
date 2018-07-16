// @flow

import { last, split, pipe } from 'ramda'
import type { Dict } from './types'
import unsafe from './unsafe'

const lowerFirst = (s: string): string => s.charAt(0).toLowerCase() + s.slice(1)

type ModelError = {|
  key: string,
  errors: string[],
|}

export type ApiErrorsToFormikErrors = ({|
  modelErrors: ModelError[],
  message: string,
|}) => { form: string } & Dict<string>

const apiErrorsToFormikErrors: ApiErrorsToFormikErrors = ({
  modelErrors,
  message,
}) =>
  (modelErrors || []).reduce(
    (fields, { key, errors: [error] }) => {
      fields[
        pipe(
          split('.'),
          last,
          unsafe,
          lowerFirst,
        )(key)
      ] = error
      return fields
    },
    { form: message },
  )

export default apiErrorsToFormikErrors
