/* eslint-disable no-use-before-define */

// @flow

import type { TFunction } from 'react-i18next'
import type { FormikProps } from 'formik'
import type { MiddlewareAPI } from 'redux'
import type Moment from 'moment'
import type { State as ContextState } from './redux/contextReducer'
import type { Fetch, FetchJSON } from './fetch'
import type { NotyShorthand } from './noty'

import { currencies } from './constants'

//--------------------------------------------------
// generic common

export type Dict<T> = { [string]: T }

export type FunctionEvent = (event: Event) => void

//--------------------------------------------------
// app specific
// (aliases to hide library details)

export type TranslatorProps = {
  t: TFunction,
}

export type FormProps<V> = FormikProps<V>

//--------------------------------------------------
// app specific: redux

export type AppState = {|
  context: ContextState,
  auth: AuthState,
  modal: ModalState,
  checkout: CheckoutState,
  rentalCart: RentalCartState,
  shortlist: ShortlistState,
|}

export type CustomInjectedDependencies = {
  +genericFetch: Fetch,
  +fetchJSON: FetchJSON,
  +redirect: (url: string) => void,
  +reload: () => void,
  +noty: any,
  +notySuccess: NotyShorthand,
  +notyInfo: NotyShorthand,
  +notyError: NotyShorthand,
  +getHash: (key: string, cb: (values: string[]) => void) => string[] | void,
  +setHash: (key: string, values: (string | number)[] | null) => void,
  +scroll: any,
  +addClassToDocument: (state: string) => void,
  +removeClassFromDocument: (state: string) => void,
  +getDocument: () => any,
  +getWindow: () => any,
  +getGoPay: () => any,
}

export type InjectedDependencies = MiddlewareAPI<AppState, DispatchableAction> &
  CustomInjectedDependencies

export type Action<P, M> = {|
  +type: string,
  +payload: P,
  +meta: M,
|}

export type SimpleAction<P> = {|
  type: string,
  payload?: P,
  andThen?: DispatchableAction[],
|}

export type PromiseAction<T, M> = (
  deps: InjectedDependencies,
) => {|
  type: string,
  payload: Promise<T>,
  meta?: M,
  andThen?: DispatchableAction[],
|}

export type EffAction<P> = (deps: InjectedDependencies) => SimpleAction<P>

export type AffAction<T> = (
  deps: InjectedDependencies,
) => {|
  type: string,
  promise: Promise<T>,
  andThen?: DispatchableAction[],
|}

export type DispatchableAction =
  | SimpleAction<any>
  | PromiseAction<any, any>
  | EffAction<any>
  | AffAction<any>

//--------------------------------------------------
// app specific: common

export type GUID = string

export type ID = number | string

export type LanguageCode = string

export type URL = string

export type Price = number

export type Year = number

export type Currency = $Keys<typeof currencies>

export type Option = {
  id: ID,
  name: string,
  selected?: boolean,
}

export type Dates = {
  startDate: Moment,
  endDate: Moment,
}

//--------------------------------------------------
// app specific: config related

export type GlobalConfig = {
  env: {
    NODE_ENV: string,
    [string]: string,
  },
  publicPathDist: string,
  publicPathDev: string,
  cookies: Dict<string>,
  [string]: any,
}

export type PageConfig =
  | ((config: GlobalConfig) => Promise<Dict<any>>)
  | Dict<any>

export type Localization = Dict<string>

//--------------------------------------------------
// app specific: features

export type BookingDetails<D> = {|
  dateFrom: D,
  dateTo: D,
  image: URL,
  name: string,
  model: string,
  type: string,
  productionYear: Year,
  berths: ?string,
  cabins: ?string,
  heads: ?string,
  company: ?string,
  country: string,
  countryCode: string,
  marina: string,
  price: Price,
  basePrice: Price,
  discountPercentage: number,
|}

export type BookingDetailsCheckout<D> = {|
  dateFrom: D,
  dateTo: D,
  image: URL,
  name: string,
  model: string,
  // type: string,
  // productionYear: Year,
  // berths: string,
  // cabins: string,
  // heads: string,
  // company: string,
  country: string,
  countryCode: string,
  marina: string,
  price: Price,
  basePrice: Price,
  discountPercentage: number,
|}

export type Boat<D> = {
  guid: GUID,
  boatId: ID,
  providerId: ID,
  status:
    | 'available'
    | 'booked'
    | 'preBooked'
    | 'preBookedByMe'
    | 'inWaitingList'
    | 'expired',
  preBookedUntil: ?Moment,
  booking: BookingDetails<D>,
}

export type BoatCheckout<D> = {
  guid: GUID,
  boatId: ID,
  providerId: ID,
  booking: BookingDetailsCheckout<D>,
}

export type FlatBoat = {
  // guid: GUID,
  boatId: ID,
  providerId: ID,
  // status:
  //   | 'available'
  //   | 'booked'
  //   | 'preBooked'
  //   | 'preBookedByMe'
  //   | 'inWaitingList'
  //   | 'expired',
  // preBookedUntil: ?Moment,
  dateFrom: string,
  dateTo: string,
  image: URL,
  name: string,
  model: string,
  type: string,
  productionYear: Year,
  berths: ?string,
  cabins: ?string,
  heads: ?string,
  company: ?string,
  country: string,
  countryCode: string,
  marina: string,
  price: Price,
  basePrice: Price,
  discountPercentage: number,
}

export type Deposit = {
  id: string,
  value: number,
  selected?: boolean,
}

export type Sharing = {
  facebook: {
    appId: string,
  },
}

export type Benefit = {
  id: string,
  title: string,
  description: string,
}

export type Gallery = {
  alt: string,
  src: URL,
  srcThumbnail: URL,
}

export type CategoryItem = {
  benefits: Benefit[],
  image: Gallery,
  currency: Currency,
  marinas: Option[],
  name: string,
  price: Price,
  url: URL,
}
