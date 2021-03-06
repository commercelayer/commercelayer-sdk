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
	const accessToken = (await getToken('integration')).accessToken
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

const randomAttributes = (res: any, num: number): {[key: string]: any} => {

	const excluded = ['id', 'type', 'reference', 'reference_origin', 'metadata', 'created_at', 'updated_at']
	const attributes: any = {}

	const fields = Object.keys(res)
	const tot = Math.max(1, Math.min(num, fields.length))

	do {
		const attribute = fields[Math.floor(Math.random() * fields.length)]
		if (!excluded.includes(attribute)) {
			const value = 'test-data'
			attributes[attribute] = value
		}
	}
	while (Object.keys(attributes).length < tot)

	return attributes

}


export { handleError, interceptRequest, randomAttributes }



const checkCommon = (config: AxiosRequestConfig, type: string, id?: string, token?: string, relationship?: string) => {
	expect(config.url).toBe(type + (id ? `/${id}` : '') + (relationship ? `/${relationship}`: ''))
	expect(config.headers.Authorization).toContain('Bearer ' + (token || ''))
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
