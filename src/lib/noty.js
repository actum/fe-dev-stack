// @flow

import Noty from 'noty'

export const noty = ({ layout = 'topRight', text, type, button }: any) => {
  const buttons = []

  if (button) {
    buttons.push(
      Noty.button(button.text, button.class, button.fn, { ...button.data }),
    )
  }

  new Noty({
    buttons,
    layout,
    text,
    timeout: type === 'error' ? false : 4000,
    type,
  }).show()
}

export type NotyShorthand = (
  text: string,
  opts?: {|
    type: 'info' | 'success' | 'error',
    layout: string,
    button: any,
  |},
) => void

export const notySuccess: NotyShorthand = (text, opts) =>
  noty({ ...opts, text, type: 'success' })

export const notyInfo: NotyShorthand = (text, opts) =>
  noty({ ...opts, text, type: 'info' })

export const notyError: NotyShorthand = (text, opts) =>
  noty({ ...opts, text, type: 'error' })
