// @flow

import apiErrorsToFormikErrors from '../apiErrorsToFormikErrors'

describe('apiErrorsToFormikErrors', () => {
  it('transforms api errors to formik ones', () => {
    expect(
      apiErrorsToFormikErrors({
        message: 'foo',
        modelErrors: [
          {
            key: 'data.Email',
            errors: ['required', 'empty'],
          },
          {
            key: 'LastName',
            errors: ['xxx', 'yyy'],
          },
        ],
      }),
    ).toEqual({ form: 'foo', lastName: 'xxx', email: 'required' })
  })
})
