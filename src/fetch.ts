
import type { DocWithData } from 'jsonapi-typescript'
import type { InterceptorManager } from './interceptor'


import Debug from './debug'
const debug = Debug('fetch')


export type FetchResponse = DocWithData
export type FetchOptions = RequestInit


export class FetchError extends Error {

  static isFetchError = (error: any): error is FetchError => {
    return error instanceof FetchError
  }

  readonly #errors?: any[]
  readonly #status: number
  readonly #statusText: string

  constructor(status: number, statusText: string, body?: any) {
    super(statusText)
    this.#status = status
    this.#statusText = statusText
    if (body) this.#errors = body.errors
  }


  get errors(): any[] | undefined { return this.#errors }

  get status(): number { return this.#status }

  get statusText(): string { return this.#statusText }

}



export const fetchURL = async (url: URL, options: FetchOptions, interceptors?: InterceptorManager): Promise<FetchResponse> => {

  debug('fetch: %s, %O', url, options || {})

  if (interceptors?.request?.onSuccess) ( { url, options } = await interceptors.request.onSuccess({ url, options }) )

  // const request: Request = new Request(url, options)

  let response = await fetch(url, options)

  if (response.ok) {
    if (interceptors?.rawReader?.onSuccess) await interceptors.rawReader.onSuccess(response)
    if (interceptors?.response?.onSuccess) response = await interceptors.response.onSuccess(response)
  } else {
    if (interceptors?.rawReader?.onFailure) await interceptors.rawReader.onFailure(response)
  }

  const responseBody = await response.json().catch(() => {})

  if (!response.ok) {
    let error = new FetchError(response.status, response.statusText, responseBody)
    if (interceptors?.response?.onFailure) error = await interceptors.response.onFailure(error)
    if (error) throw error
  }

  return responseBody

}