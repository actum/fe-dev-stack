// @flow

import fetch from 'isomorphic-fetch'
import type { UnaryFnP, Request } from 'composable-fetch'
import { composableFetch, pipeP, tryCatchP } from 'composable-fetch'

export type Fetch = UnaryFnP<Request, Response>

type FetchError = Error & {
  res: Response,
  data: {|
    success: boolean,
    message: string,
  |},
}

export const handleFetchError = async (error: any) => {
  const { res } = error
  const genericError: FetchError = ((new Error('Fetch error'): any): FetchError)
  genericError.res = res
  genericError.data = { success: false, message: 'An error occured.' }

  try {
    await composableFetch.decodeResponse(res)
    if (typeof res.data === 'object' && res.data.message)
      genericError.data = res.data
  } catch (_) {
    //
  }

  throw genericError
}

export const genericFetch: Fetch = pipeP(
  (req: Request): Request => {
    req.credentials = 'same-origin'
    return req
  },
  composableFetch.fetch1(fetch),
  composableFetch.withSafe204(),
  composableFetch.checkStatus,
)

export const JSONReq: UnaryFnP<Request, Request> = pipeP(
  composableFetch.withHeader('Content-Type', 'application/json'),
  composableFetch.withHeader('Accept', 'application/json'),
  composableFetch.withEncodedBody(JSON.stringify),
)

export const JSONRes = composableFetch.decodeJSONResponse

export const fetchJSONRaw: Fetch = tryCatchP(
  pipeP(
    JSONReq,
    genericFetch,
    JSONRes,
  ),
  handleFetchError,
)

export type FetchJSON = UnaryFnP<Request, any>

export const fetchJSON: FetchJSON = pipeP(
  fetchJSONRaw,
  ({ data }) => data,
)
