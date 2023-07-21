
import axios from 'axios'
import type { AxiosAdapter, CreateAxiosDefaults, AxiosInstance, AxiosProxyConfig, Method } from 'axios'
import { SdkError, ApiError, ErrorType } from './error'
import type { InterceptorManager } from './interceptor'
import config from './config'
import type { Agent as HttpAgent } from 'http'
import type { Agent as HttpsAgent } from 'https'

import Debug from './debug'
const debug = Debug('client')



const baseURL = (organization: string, domain?: string): string => {
	return `https://${organization.toLowerCase()}.${domain || config.default.domain}/api`
}


const handleError = (error: Error): never => {

	let sdkError = new SdkError({ message: error.message })

	if (axios.isAxiosError(error)) {
		if (error.response) {
			// The request was made and the server responded with a status code that falls out of the range of 2xx
			const apiError = new ApiError(sdkError)
			apiError.type = ErrorType.RESPONSE
			apiError.status = error.response.status
			apiError.statusText = error.response.statusText
			apiError.code = String(apiError.status)
			apiError.errors = error.response.data.errors
			if (!apiError.message && apiError.statusText) apiError.message = apiError.statusText
			sdkError = apiError
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
			sdkError.type = ErrorType.REQUEST
			sdkError.request = error.request
		} else {
			// Something happened in setting up the request that triggered an Error
			sdkError.type = ErrorType.CLIENT
		}
	} else if (axios.isCancel(error)) sdkError.type = ErrorType.CANCEL
	else sdkError.source = error

	throw sdkError

}


type ProxyConfig = AxiosProxyConfig | false
type Adapter = AxiosAdapter

type RequestParams = Record<string, string | number | boolean>
type RequestHeaders = Record<string, string>

// Subset of AxiosRequestConfig
type RequestConfig = {
	timeout?: number;
	params?: RequestParams;
	httpAgent?: HttpAgent;
	httpsAgent?: HttpsAgent;
	proxy?: ProxyConfig;
	headers?: RequestHeaders
}

type ApiConfig = {
	organization: string,
	domain?: string,
	accessToken: string
}

type ApiClientInitConfig = ApiConfig & RequestConfig & { adapter?: Adapter }
type ApiClientConfig = Partial<ApiClientInitConfig>


class ApiClient {

	static create(options: ApiClientInitConfig): ApiClient {
		for (const attr of config.client.requiredAttributes)
			if (!options || !options[attr as keyof ApiClientInitConfig]) throw new SdkError({ message: `Undefined '${attr}' parameter` })
		return new ApiClient(options)
	}

	baseUrl: string
	#accessToken: string
	#client: AxiosInstance

	public interceptors: InterceptorManager

	private constructor(options: ApiClientInitConfig) {

		debug('new client instance %O', options)

		this.baseUrl = baseURL(options.organization, options.domain)
		this.#accessToken = options.accessToken

		const axiosConfig: RequestConfig = {
			timeout: options.timeout || config.client.timeout,
			proxy: options.proxy,
			httpAgent: options.httpAgent,
			httpsAgent: options.httpsAgent,
		}

		// Set custom headers
		const customHeaders = this.customHeaders(options.headers)

		const axiosOptions: CreateAxiosDefaults = {
			baseURL: this.baseUrl,
			timeout: config.client.timeout,
			headers: {
				...customHeaders,
				'Accept': 'application/vnd.api+json',
				'Content-Type': 'application/vnd.api+json',
				'Authorization': 'Bearer ' + this.#accessToken
			},
			...axiosConfig
		}

		if (options.adapter) axiosOptions.adapter = options.adapter

		debug('axios options: %O', axiosOptions)

		this.#client = axios.create(axiosOptions)

		this.interceptors = this.#client.interceptors

	}


	config(config: ApiClientConfig): ApiClient {

		debug('config %o', config)

		const def = this.#client.defaults

		// Axios config
		if (config.timeout) def.timeout = config.timeout
		if (config.proxy) def.proxy = config.proxy
		if (config.httpAgent) def.httpAgent = config.httpAgent
		if (config.httpsAgent) def.httpsAgent = config.httpsAgent

		// API Client config
		if (config.organization) this.baseUrl = baseURL(config.organization, config.domain)
		if (config.accessToken) {
			this.#accessToken = config.accessToken
			def.headers.common.Authorization = 'Bearer ' + this.#accessToken;
		}
		if (config.headers) def.headers.common = this.customHeaders(config.headers)
		if (config.adapter) this.adapter(config.adapter)

		return this

	}


	adapter(adapter: Adapter): ApiClient {
		if (adapter) this.#client.defaults.adapter = adapter
		return this
	}


	async request(method: Method, path: string, body?: any, options?: ApiClientConfig): Promise<any> {

		debug('request %s %s, %O, %O', method, path, body || {}, options || {})

		const data = body ? { data: body } : undefined
		const url = path

		// Runtime request parameters
		const baseUrl = options?.organization ? baseURL(options.organization, options.domain) : undefined
		const accessToken = options?.accessToken || this.#accessToken

		const headers = this.customHeaders(options?.headers)
		if (accessToken) headers.Authorization = 'Bearer ' + accessToken

		const requestParams = { method, baseURL: baseUrl, url, data, ...options, headers }

		debug('request params: %O', requestParams)

		// const start = Date.now()
		return this.#client.request(requestParams)
			.then(response => response.data)
			.catch(error => handleError(error))
		// .finally(() => console.log(`<<-- ${method} ${path} ${Date.now() - start}`))

	}


	private customHeaders(headers?: RequestHeaders): RequestHeaders {
		const customHeaders: RequestHeaders = {}
		if (headers) {
			for (const [name, value] of Object.entries(headers))
				if (!['accept', 'content-type', 'authorization'].includes(name.toLowerCase())) customHeaders[name] = value
		}
		return customHeaders
	}

}



export default ApiClient

export type { ApiClientInitConfig, ApiClientConfig, RequestConfig }
