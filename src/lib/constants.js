// @flow

// Responsive breakpoints
export const breakpoints = {
  SM: 576,
  SM_MAX: 575,
  MD: 768,
  MD_MAX: 767,
  LG: 992,
  LG_MAX: 991,
  XL: 1200,
  XL_MAX: 1199,
}
// Media queries
export const mq = {
  XS_ONLY: `(max-width: ${breakpoints.SM - 1}px)`,
  SM_MIN: `(min-width: ${breakpoints.SM}px)`,
  SM_ONLY: `(min-width: ${breakpoints.SM}px) and (max-width: ${breakpoints.MD -
    1}px)`,
  SM_MAX: `(max-width: ${breakpoints.MD - 1}px)`,
  MD_MIN: `(min-width: ${breakpoints.MD}px)`,
  MD_ONLY: `(min-width: ${breakpoints.MD}px) and (max-width: ${breakpoints.LG -
    1}px)`,
  MD_MAX: `(max-width: ${breakpoints.LG - 1}px)`,
  LG_MIN: `(min-width: ${breakpoints.LG}px)`,
  LG_ONLY: `(min-width: ${breakpoints.LG}px) and (max-width: ${breakpoints.XL -
    1}px)`,
  LG_MAX: `(max-width: ${breakpoints.XL - 1}px)`,
  XL_ONLY: `(min-width: ${breakpoints.XL}px)`,
}

// Common states
export const states = {
  ACTIVE: 'is-active',
  DISABLED: 'is-disabled',
  HAS_ANIMATION: 'has-animation',
  HAS_ERROR: 'has-error',
  HIDDEN: 'is-hidden',
  LOADING: 'is-loading',
  NO_SCROLL: 'no-scroll',
  OPENED: 'is-opened',
  SELECTED: 'is-selected',
  STICKY: 'is-sticky',
}

export const keyCodes = {
  ESC: 27,
}

export const availabilityStatus = {
  available: {
    ALERT: 'success',
    STATUS: 'available',
  },
  booked: {
    ALERT: 'error',
    STATUS: 'booked',
  },
  preBooked: {
    ALERT: 'warning',
    STATUS: 'preBooked',
  },
  preBookedByMe: {
    ALERT: 'success',
    STATUS: 'preBookedByMe',
  },
  preBookLimitReached: {
    ALERT: 'error',
    STATUS: 'preBookLimitReached',
  },
  inWaitingList: {
    ALERT: 'info',
    STATUS: 'inWaitingList',
  },
  expired: {
    ALERT: 'error',
    STATUS: 'expired',
  },
}

export const currencies = {
  czk: {
    symbol: 'Kč',
    format: '%v %s',
    decimal: ',',
    thousand: ' ',
    precision: 0,
  },
  eur: {
    symbol: '€',
    format: '%v %s',
    decimal: ',',
    thousand: ' ',
    precision: 0,
  },
  gbp: {
    symbol: '£',
    format: '%s %v',
    decimal: '.',
    thousand: ',',
    precision: 0,
  },
  usd: {
    symbol: '$',
    format: '%s %v',
    decimal: '.',
    thousand: ',',
    precision: 0,
  },
}

export const facebook = {
  sendDialogBaseUrl: 'http://www.facebook.com/dialog/send',
  messengerBaseUrl: 'fb-messenger://share/',
}
