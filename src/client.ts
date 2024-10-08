import { ErrorType, SdkError, handleError, isExpiredTokenError } from './error'
import type { InterceptorManager } from './interceptor'
import config from './config'
import type { FetchResponse, FetchRequestOptions, FetchClientOptions, Fetch } from './fetch'
import { fetchURL } from './fetch'
import { isTokenExpired } from './util'


import Debug from './debug'
const debug = Debug('client')



const baseURL = (organization: string, domain?: string): string => {
	return `https://${organization.toLowerCase()}.${domain || config.default.domain}/api`
}


type RequestParams = Record<string, string | number | boolean>
type RequestHeaders = Record<string, string>


export type RefreshToken = (expiredToken: string) => Promise<string>

type RequestConfig = {
	timeout?: number
	params?: RequestParams
	headers?: RequestHeaders
	userAgent?: string
	fetch?: Fetch
	refreshToken?: RefreshToken
}


type ApiConfig = {
	organization?: string
	domain?: string
	accessToken: string
}

type ApiClientInitConfig = ApiConfig & RequestConfig
type ApiClientConfig = Partial<ApiClientInitConfig>


export type Method = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH'



class ApiClient {

	static create(options: ApiClientInitConfig): ApiClient {
		for (const attr of config.client.requiredAttributes)
			if (!options || !options[attr as keyof ApiClientInitConfig]) throw new SdkError({ message: `Undefined '${attr}' parameter` })
		return new ApiClient(options)
	}


	#baseUrl: string
	#accessToken: string
	readonly #clientConfig: RequestConfig
	readonly #interceptors: InterceptorManager


	private constructor(options: ApiClientInitConfig) {

		debug('new client instance %O', options)

		this.#baseUrl = baseURL(options.organization ?? '', options.domain)
		this.#accessToken = options.accessToken

		const fetchConfig: RequestConfig = {
			timeout: options.timeout || config.client.timeout,
			fetch: options.fetch,
			refreshToken: options.refreshToken
		}

		// Set custom headers
		const customHeaders = this.customHeaders(options.headers)

		// Set headers
		const headers: RequestHeaders = {
			...customHeaders,
			'Accept': 'application/vnd.api+json',
			'Content-Type': 'application/vnd.api+json',
			'Authorization': 'Bearer ' + this.#accessToken
		}

		// Set User-Agent
		if (options.userAgent) headers['User-Agent'] = options.userAgent

		fetchConfig.headers = headers

		this.#clientConfig = fetchConfig

		debug('fetch config: %O', fetchConfig)

		// Interceptors
		this.#interceptors = {}

	}


	get interceptors(): InterceptorManager { return this.#interceptors }

	get requestHeaders(): RequestHeaders {
		if (!this.#clientConfig.headers) this.#clientConfig.headers = {}
		return this.#clientConfig.headers
	}


	/*
	set requestHeaders(headers: RequestHeaders) {
		this.#clientConfig.headers = { ...this.#clientConfig.headers, ...headers }
	}
	*/


	config(config: ApiClientConfig): this {

		debug('config %o', config)

		const def = this.#clientConfig
		if (!def.headers) def.headers = {}

		// Client config
		if (config.timeout) def.timeout = config.timeout

		if (config.userAgent) this.userAgent(config.userAgent)
		if (config.fetch) this.#clientConfig.fetch = config.fetch
		if (config.refreshToken) this.#clientConfig.refreshToken = config.refreshToken

		// API Client config
		if (config.organization) this.#baseUrl = baseURL(config.organization, config.domain)
		if (config.accessToken) {
			this.#accessToken = config.accessToken
			def.headers.Authorization = 'Bearer ' + this.#accessToken
		}
		if (config.headers) def.headers = { ...def.headers, ...this.customHeaders(config.headers) }

		return this

	}


	userAgent(userAgent: string): this {
		if (userAgent) this.requestHeaders['User-Agent'] = userAgent
		return this
	}


	async request(method: Method, path: string, body?: any, options?: ApiClientConfig): Promise<FetchResponse> {

		debug('request %s %s, %O, %O', method, path, body || {}, options || {})

		// Ignored params (in debug mode)
		if (options?.userAgent) debug('User-Agent header ignored in request config')

		// URL
		const baseUrl = options?.organization ? baseURL(options.organization, options.domain) : this.#baseUrl
		const url = new URL(`${baseUrl}/${path}`)

		// Body
		const bodyData = body ? JSON.stringify({ data: body }) : undefined

		// Headers
		const headers = { ...this.requestHeaders, ...this.customHeaders(options?.headers) }

		// Access token
		const accessToken = options?.accessToken || this.#accessToken
		if (accessToken) headers.Authorization = 'Bearer ' + accessToken

		const requestOptions: FetchRequestOptions = { method, body: bodyData, headers }

		// Timeout
		const timeout = options?.timeout || this.#clientConfig.timeout
		if (timeout) {
			if (AbortSignal?.timeout) requestOptions.signal = AbortSignal.timeout(timeout)
			else debug('Timeout not set. Undefined function: %s', 'AbortSignal.timeout')
		}

		if (options?.params) Object.entries(options?.params).forEach(([name, value]) => { url.searchParams.append(name, String(value)) })

		const clientOptions: FetchClientOptions = {
			interceptors: this.interceptors,
			fetch: options?.fetch || this.#clientConfig.fetch
		}

		// const start = Date.now()
		try {	// Execute api call
			return await fetchURL(url, requestOptions, clientOptions).catch((error: Error) => handleError(error))
		} catch (err: any) {	// Error executing api call

			if (isExpiredTokenError(err) && this.#clientConfig.refreshToken && isTokenExpired(this.#accessToken)) {	// If token has expired and must be refreshed
				
				debug('Access token has expired')
				const newAccessToken = await this.#clientConfig.refreshToken(this.#accessToken)	// Refresh access token ...
					.catch((e: any) => {	// Error refreshing access token
						debug('Refresh token error: %s', e.message)
						const tokenError = new SdkError({ message: 'Error refreshing access token', type: ErrorType.TOKEN_REFRESH })
						tokenError.source = e
						throw tokenError
					})

				if (newAccessToken) {	// ... set new access token in current config and repeat call
					debug('Access token refreshed')
					this.config({ accessToken: newAccessToken })
					if (requestOptions.headers) (requestOptions.headers as Record<string, string>).Authorization = `Bearer ${newAccessToken}`
					const response = await fetchURL(url, requestOptions, clientOptions).catch((error: Error) => handleError(error))
					return response
				}

			} else throw err

		}
		// .finally(() => { console.log(`<<-- ${method} ${path} ${Date.now() - start}`) })

	}


	private customHeaders(headers?: RequestHeaders): RequestHeaders {
		const customHeaders: RequestHeaders = {}
		if (headers) {
			for (const [name, value] of Object.entries(headers))
				if (!['accept', 'content-type', 'authorization', 'user-agent'].includes(name.toLowerCase())) customHeaders[name] = value
		}
		return customHeaders
	}


	get currentAccessToken(): string {
		return this.#accessToken
	}

}



export default ApiClient

export type { ApiClientInitConfig, ApiClientConfig, RequestConfig }
