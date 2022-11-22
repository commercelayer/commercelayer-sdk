/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosProxyConfig, Method } from 'axios'
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


const handleError = (error: Error): void => {

	let sdkError = new SdkError({ message: error.message })

	if (axios.isAxiosError(error)) {
		if (error.response) {
			// The request was made and the server responded with a status code that falls out of the range of 2xx
			const apiError = new ApiError(sdkError)
			apiError.type = ErrorType.RESPONSE
			apiError.status = error.response.status
			apiError.code = String(apiError.status)
			apiError.errors = error.response.data.errors
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

// Subset of AxiosRequestConfig
type RequestConfig = {
	timeout?: number;
	params?: { [key: string]: string | number | boolean };
	httpAgent?: HttpAgent;
	httpsAgent?: HttpsAgent;
	proxy?: ProxyConfig;
}

type ApiClientInitConfig = { organization: string, domain?: string, accessToken: string } & RequestConfig
type ApiClientConfig = Partial<ApiClientInitConfig>


class ApiClient {

	static create(options: ApiClientInitConfig): ApiClient {
		if (!options?.organization) throw new Error("Undefined 'organization' parameter")
		if (!options?.accessToken) throw new Error("Undefined 'accessToken' parameter")
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

		const axiosOptions = {
			baseURL: this.baseUrl,
			timeout: config.client.timeout,
			headers: {
				'Accept': 'application/vnd.api+json',
				'Content-Type': 'application/vnd.api+json',
				'Authorization': 'Bearer ' + this.#accessToken,
			},
			...axiosConfig
		}

		debug('axios options: %O', axiosOptions)

		this.#client = axios.create(axiosOptions)

		this.interceptors = this.#client.interceptors

	}


	config(config: ApiClientConfig): void {

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

	}


	async request(method: Method, path: string, body?: any, options?: ApiClientConfig): Promise<any> {

		debug('request %s %s, %O, %O', method, path, body || {}, options || {})

		const data = body ? { data: body } : undefined
		const url = path

		// Runtime request parameters
		const baseUrl = options?.organization ? baseURL(options.organization, options.domain) : undefined
		const accessToken = options?.accessToken || this.#accessToken
		const headers = accessToken ? { 'Authorization': 'Bearer ' + accessToken } : undefined

		const requestParams = { method, baseURL: baseUrl, url, data, headers, ...options }

		debug('request params: %O', requestParams)

		// const start = Date.now()
		return this.#client.request(requestParams)
			.then(response => response.data)
			.catch(error => handleError(error))
		// .finally(() => console.log(`<<-- ${method} ${path} ${Date.now() - start}`))

	}

}



export default ApiClient

export { ApiClientInitConfig, ApiClientConfig, RequestConfig }
