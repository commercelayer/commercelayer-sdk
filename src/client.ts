/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, Method } from 'axios'
import { DocWithData as JSONApiDocument, ResourceObject as JSONApiResource } from 'jsonapi-typescript'
import ApiError, { ErrorType } from './error'


const baseURL = (organization: string, domain?: string): string => {
	return `https://${organization.toLowerCase()}.${domain ? domain : 'commercelayer.io'}/api`
}

/*
axios.interceptors.request.use(request => {
	console.log()
	console.log('REQUEST -->')
	console.log(request)
	return request
})

axios.interceptors.response.use(response => {
	console.log()
	console.log('<-- RESPONSE')
	console.log(response.data)
	return response
})
*/


const handleError = (error: Error) => {

	const apiError = new ApiError({ message: error.message, type: ErrorType.GENERIC })

	if (axios.isAxiosError(error)) {
		if (error.response) {
			// The request was made and the server responded with a status code that falls out of the range of 2xx
			apiError.type = ErrorType.RESPONSE
			apiError.status = error.response.status
			apiError.code = String(apiError.status)
			apiError.errors = error.response.data.errors
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
			apiError.type = ErrorType.REQUEST
		} else {
			// Something happened in setting up the request that triggered an Error
			apiError.type = ErrorType.CLIENT
		}
	}

	throw apiError

}


// Subset of AxiosRequestConfig
type RequestConfig = {
	timeout?: number
	params?: { [key: string]: string | number | boolean }
}

type ApiClientInitConfig = { organization: string, domain?: string, accessToken: string } & RequestConfig
type ApiClientConfig = { organization?: string, domain?: string, accessToken?: string } & RequestConfig


class ApiClient {

	static create(options: ApiClientInitConfig): ApiClient {
		if (!options?.organization) throw new Error("Undefined 'organization' parameter")
		if (!options?.accessToken) throw new Error("Undefined 'accessToken' parameter")
		return new ApiClient(options)
	}

	baseUrl: string
	#accessToken: string
	#client: AxiosInstance

	private constructor(options: ApiClientInitConfig) {

		this.baseUrl = baseURL(options.organization, options.domain)
		this.#accessToken = options.accessToken

		const axiosConfig: RequestConfig = {
			timeout: options.timeout || 3000
		}

		this.#client = axios.create({
			baseURL: this.baseUrl,
			timeout: 3000,
			headers: {
				'Accept': 'application/vnd.api+json',
				'Content-Type': 'application/vnd.api+json',
				'Authorization': 'Bearer ' + this.#accessToken,
			},
			...axiosConfig
		})

		/*
		this.#client.interceptors.request.use(function (config) {
			console.log('>>>>>>>>>> REQUEST INTERCEPTOR')
			return config;
		  }, function (error) {
			// Do something with request error
			return Promise.reject(error);
		  })
		  */

	}


	config(config: ApiClientConfig): void {

		const def = this.#client.defaults

		// Axios config
		if (config.timeout) def.timeout = config.timeout

		// API Client config
		if (config.organization) this.baseUrl = baseURL(config.organization, config.domain)
		if (config.accessToken) this.#accessToken = config.accessToken

	}


	async request(method: Method, path: string, body?: JSONApiResource, options?: ApiClientConfig): Promise<JSONApiDocument> {

		const data = body ? { data: body } : undefined
		const url = path

		// Runtime request parameters
		const baseUrl = options?.organization ? baseURL(options.organization, options.domain) : undefined
		const headers = options?.accessToken ? { 'Authorization': 'Bearer ' + options.accessToken } : undefined

		// const start = Date.now()

		return this.#client.request({ method, baseURL: baseUrl, url, data, headers, ...options })
			.then(response => response.data)
			.catch(error => handleError(error))
		// .finally(() => console.log(`<<-- ${method} ${path} ${Date.now() - start}`))

	}

}



export default ApiClient

export { ApiClientInitConfig, ApiClientConfig, RequestConfig }
