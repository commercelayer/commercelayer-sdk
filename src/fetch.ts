
import type { InterceptorManager } from './interceptor'
import { ErrorType, SdkError } from './error'


import Debug from './debug'
const debug = Debug('fetch')


export type Fetch = (input: string | URL | Request, init?: RequestInit) => Promise<Response>

export type FetchResponse = any
export type FetchRequestOptions = RequestInit
export type FetchClientOptions = {
  interceptors?: InterceptorManager,
  fetch?: Fetch
}


export class FetchError extends Error {

  static isFetchError = (error: any): error is FetchError => {
    return error instanceof FetchError
  }

  readonly #errors?: any[]
  readonly #status: number
  readonly #statusText: string
  readonly #request?: Partial<FetchRequestOptions>

  constructor(status: number, statusText: string, body?: any, request?: FetchRequestOptions) {
    super(statusText)
    this.#status = status
    this.#statusText = statusText
    if (body) this.#errors = body.errors
    if (request) this.#request = request
  }


  get errors(): any[] | undefined { return this.#errors }

  get status(): number { return this.#status }

  get statusText(): string { return this.#statusText }

  get request(): Partial<FetchRequestOptions> | undefined { return this.#request }

}



export const fetchURL = async (url: URL, requestOptions: FetchRequestOptions, clientOptions?: FetchClientOptions): Promise<FetchResponse> => {

  debug('fetch: %s, %O, native[%s]', url, requestOptions || {}, (clientOptions?.fetch? 'no' : 'yes'))

  const interceptors = clientOptions?.interceptors

  if (interceptors?.request?.onSuccess) ( { url, options: requestOptions } = await interceptors.request.onSuccess({ url, options: requestOptions }) )

  // const request: Request = new Request(url, requestOptions)  // not supported by all fetch implementations

  const fetchClient = clientOptions?.fetch || fetch

  let response = await fetchClient(url, requestOptions)

  if (response.ok) {
    if (interceptors?.rawReader?.onSuccess) await interceptors.rawReader.onSuccess(response)
    if (interceptors?.response?.onSuccess) response = await interceptors.response.onSuccess(response)
  } else {
    if (interceptors?.rawReader?.onFailure) await interceptors.rawReader.onFailure(response)
  }

  const responseBody = (response.body && (response.status !== 204)) ? await response.json()
    .then(json => { debug('response: %O', json); return json })
    .catch((err: Error) => {
      debug('error: %s', err.message)
      if (response.ok) throw new SdkError({ message: 'Error parsing API response body', type: ErrorType.PARSE })
    })
    : undefined
    
  if (!response.ok) {
    let error = new FetchError(response.status, response.statusText, responseBody, requestOptions)
    if (interceptors?.response?.onFailure) error = await interceptors.response.onFailure(error)
    if (error) throw error
  }

  return responseBody

}