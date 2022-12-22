/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import getToken from './token'
import CommerceLayer, { CommerceLayerClient, QueryParamsList, QueryParamsRetrieve } from '../src'
import dotenv from 'dotenv'
import { inspect } from 'util'
import axios, { AxiosRequestConfig } from 'axios'
import { isEqual } from 'lodash'
import { RequestConfig } from '../src/client'

dotenv.config()

const GLOBAL_TIMEOUT = 15000

const organization = process.env.CL_SDK_ORGANIZATION as string
const domain = process.env.CL_SDK_DOMAIN as string

export { organization, domain }

const INTERCEPTOR_CANCEL = 'TEST-INTERCEPTED'
const REQUEST_TIMEOUT = 5550
const REQUEST_OPTIONS: RequestConfig = {
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

const COMMON_PARAMS_LIST: QueryParamsList = {
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
	paramsFields: COMMON_PARAMS_FIELDS,
} as const


let currentAccessToken: string

const initClient = async (): Promise<CommerceLayerClient> => {
	const token = await getToken('integration')
	if (token === null) throw new Error('Unable to get access token')
	const accessToken = token.accessToken
	currentAccessToken = accessToken
	const client = CommerceLayer({ organization, accessToken, domain })
	client.config({ timeout: GLOBAL_TIMEOUT })
	jest.setTimeout(GLOBAL_TIMEOUT)
	return client
}

const fakeClient = async (): Promise<CommerceLayerClient> => {
	const accessToken = 'fake-access-token'
	const client = CommerceLayer({ organization, accessToken, domain })
	currentAccessToken = accessToken
	return client
}

const getClient = (instance?: boolean): Promise<CommerceLayerClient> => {
	return instance ?  initClient() : fakeClient()
}

const printObject = (obj: unknown): string => {
	return inspect(obj, false, null, true)
}


export { initClient, fakeClient, getClient, printObject, currentAccessToken }



const handleError = (error: any) => {
	if (error.message !== INTERCEPTOR_CANCEL) throw error
}

const interceptRequest = (config?: AxiosRequestConfig): AxiosRequestConfig => {
	if (!config) throw new axios.Cancel(INTERCEPTOR_CANCEL)
	return config
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



const checkCommon = (config: AxiosRequestConfig, type: string, id?: string, token?: string, relationship?: string) => {
	expect(config.url).toBe(type + (id ? `/${id}` : '') + (relationship ? `/${relationship}`: ''))
	expect(config.headers?.Authorization).toContain('Bearer ' + (token || ''))
	expect(config.timeout).toBe(REQUEST_TIMEOUT)
}

const checkCommonData = (config: AxiosRequestConfig, type: string, attributes: any, id?: string) => {
	if (id) expect(config.data.data.id).toBe(id)
	expect(config.data.data.type).toBe(type)
	const relationships: { [k: string]: any } = {}
	Object.entries(config.data.data.relationships).forEach(([k, v]) => relationships[k] = (v as any)['data'])
	const received = {
		...config.data.data.attributes,
		...relationships
	}
	expect(isEqual(received, attributes)).toBeTruthy()
}

const checkParam = (params: any, name: string, value: string | number | boolean) => {
	expect(params).toHaveProperty([name])
	expect(params[name]).toBe(String(value))
}

const checkCommonParamsList = (config: AxiosRequestConfig, params: QueryParamsList) =>  {
	if (params.pageNumber) checkParam(config.params, 'page[number]', params.pageNumber)
	if (params.pageSize) checkParam(config.params, 'page[size]', params.pageSize)
	if (params.filters?.reference_eq) checkParam(config.params, 'filter[q][reference_eq]', params.filters.reference_eq)
	if (params.sort) {
		let value: string
		if (Array.isArray(params.sort)) value = params.sort.join(',')
		else value = Object.entries(params.sort).map(([k, v]) => `${(v === 'desc') ? '-' : ''}${k}`).join(',')
		checkParam(config.params, 'sort', value)
	}
}

const checkCommonParams = (config: AxiosRequestConfig, params: QueryParamsRetrieve) => {
	if (params.fields) {
		Object.entries(params.fields).forEach(([type, fields]) => {
			checkParam(config.params, `fields[${type}]`, fields.join(','))
		})
	}
}


export { checkCommon, checkCommonData, checkCommonParams, checkCommonParamsList }
