
import dotenv from 'dotenv'
import getToken from './token'
import CommerceLayer, { CommerceLayerClient, CommerceLayerConfig, QueryParamsList, QueryParamsRetrieve, RequestObj, Resource } from '../lib'
import { inspect, isDeepStrictEqual } from 'util'


dotenv.config()

export const GLOBAL_TIMEOUT = 15000

const organization = process.env.CL_SDK_ORGANIZATION as string
const domain = process.env.CL_SDK_DOMAIN as string

export { organization, domain }

const INTERCEPTOR_CANCEL = 'TEST-INTERCEPTED'
const REQUEST_TIMEOUT = 5550
const REQUEST_OPTIONS: CommerceLayerConfig = {
	timeout: REQUEST_TIMEOUT,
	params: { }
} as const

export const TestData = {
	id: 'testId',
	reference: 'sdk-test',
	reference_origin: 'cl-sdk',
	metadata: {
		meta_key_1: 'meta_value_1',
	}
} as const


const COMMON_PARAMS_FILTERS = { reference_eq: TestData.reference }

const COMMON_PARAMS_LIST: QueryParamsList<Resource> = {
	filters: COMMON_PARAMS_FILTERS,
	pageSize: 25,
	pageNumber: 1,
	sort: { updated_at: 'desc', created_at: 'asc', reference: 'desc' },
} as const

const COMMON_PARAMS_FIELDS = ['id', 'reference', 'reference_origin', 'updated_at', 'metadata']
const COMMON_PARAMS_RETRIEVE = {
	fields: COMMON_PARAMS_FIELDS,
}


export const CommonData = {
	options: REQUEST_OPTIONS,
	paramsRetrieve: COMMON_PARAMS_RETRIEVE,
	paramsList: COMMON_PARAMS_LIST,
	paramsFields: COMMON_PARAMS_FIELDS as (keyof Resource)[],
} as const


let currentAccessToken: string

const initClient = async (config: CommerceLayerConfig): Promise<CommerceLayerClient> => {

	let accessToken: string
	if (config.accessToken) accessToken = config.accessToken
	else {
		const token = await getToken('integration')
		if (token === null) throw new Error('Unable to get access token')
		accessToken = token.accessToken
	}


	const client = CommerceLayer({ organization, accessToken, domain })
	currentAccessToken = accessToken

	client.config({ timeout: config.timeout || GLOBAL_TIMEOUT })
	try { vi.setConfig({ testTimeout: config.timeout || GLOBAL_TIMEOUT })  } catch(err: any) {}


	return client

}


const fakeClient = async (): Promise<CommerceLayerClient> => {
	const accessToken = 'fake-access-token'
	const client = CommerceLayer({ organization, accessToken, domain })
	currentAccessToken = accessToken
	return client
}


const getClient = (config?: CommerceLayerConfig): Promise<CommerceLayerClient> => {
	return config ? initClient(config) : fakeClient()
}

const printObject = (obj: unknown): string => {
	return inspect(obj, false, null, true)
}


export { initClient, fakeClient, getClient, printObject, currentAccessToken }



const handleError = (error: any) => {
	if (error.message !== INTERCEPTOR_CANCEL) throw error
}

const interceptRequest = (request?: RequestObj): RequestObj => {
	if (!request) throw new DOMException(INTERCEPTOR_CANCEL, 'AbortError')
	return request
}

const randomValue = (type: string, name?: string): any | Array<any> => {

	const numbers = [0, 1, 10, 100, 1000, 10000, 5, 55, 555, 12345, 6666]
	const strings = ['alfa', 'beta', 'gamma', 'delta', 'epsilon', 'kappa', 'lambda', 'omega', 'sigma', 'zeta']
	const booleans = [true, false, true, false, true, false, true, false, true, false]
	const objects = [{ key11: 'val11' }, { key21: 'val21' }, { key31: 'val31' }, { key41: 'val41' }, { key51: 'val51' }]

	let values: Array<string | number | boolean | object>

	if (name) {
		// type = 
	}

	if (type.startsWith('boolean')) values = booleans
	else
	if (type.startsWith('integer') || type.startsWith('number')) values = numbers
	else
	if (type.startsWith('fload') || type.startsWith('decimal')) values = numbers
	else
	if (type.startsWith('object')) values = objects
	else
	if (type.startsWith('string')) values = strings
	else values = strings

	let value = values[Math.floor(Math.random() * (values.length - 1))]

	if (type === 'string') value = `${value}_${Math.floor(Math.random() * 100)}`

	if (type.endsWith('[]')) value = [ value ]

	return value

}


export { handleError, interceptRequest, randomValue }



const checkCommon = (request: RequestObj, path: string, id?: string, token?: string, relationship?: string) => {
	expect(request.url.pathname).toBe('/api/' + path + (id ? `/${id}` : '') + (relationship ? `/${relationship}` : ''))
	expect(request.options.headers).toBeDefined()
	if (request.options.headers) expect(request.options.headers['Authorization']).toContain('Bearer ' + (token || ''))
	expect(request.options.signal).not.toBeNull()
}

const checkCommonData = (data: any, type: string, attributes: any, id?: string) => {
	if (id) expect(data.data.id).toBe(id)
	expect(data.data.type).toBe(type)
	const relationships: { [k: string]: any } = {}
	Object.entries(data.data.relationships).forEach(([k, v]) => relationships[k] = (v as any)['data'])
	const received = {
		...data.data.attributes,
		...relationships
	}
	expect(isDeepStrictEqual(received, attributes)).toBeTruthy()
}

const checkParam = (url: string | URL, name: string, value: string | number | boolean) => {
	const params = (url instanceof URL)? url.searchParams : new URL(url).searchParams
	expect(params.has(name)).toBeTruthy()
	expect(params.get(name)).toBe(String(value))
}

const checkCommonParamsList = (request: RequestObj, params: QueryParamsList<Resource>) => {
	const url = new URL(request.url)
	if (params.pageNumber) checkParam(url, 'page[number]', params.pageNumber)
	if (params.pageSize) checkParam(url, 'page[size]', params.pageSize)
	if (params.filters?.reference_eq) checkParam(url, 'filter[q][reference_eq]', String(params.filters.reference_eq))
	if (params.sort) {
		let value: string
		if (Array.isArray(params.sort)) value = params.sort.join(',')
		else value = Object.entries(params.sort).map(([k, v]) => `${(v === 'desc') ? '-' : ''}${k}`).join(',')
		checkParam(url, 'sort', value)
	}
}

const checkCommonParams = (request: RequestObj, params: QueryParamsRetrieve) => {
	if (params.fields) {
		const url = new URL(request.url)
		Object.entries(params.fields).forEach(([type, fields]) => {
			checkParam(url, `fields[${type}]`, fields.join(','))
		})
	}
}


export { checkCommon, checkCommonData, checkCommonParams, checkCommonParamsList, checkParam }
