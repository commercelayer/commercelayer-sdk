
import type { ResourceSortable, ResourceType } from "./resource"
import { ErrorType, SdkError } from "./error"
import type { PositiveNumberRange, StringKey } from "./types"

import Debug from './debug'
const debug = Debug('query')


const arrayFilters = ['_any', '_all', '_in']
const objectFilters = ['_jcont']


interface QueryParamsRetrieve {
	include?: string[]
	fields?: string[] | Record<string, string[]>
}


type QueryArraySortable<RS> = Array<StringKey<RS> | `-${StringKey<RS>}`>
type QueryRecordSortable<RS> = Partial<Record<keyof RS, 'asc' | 'desc'>>
type QueryFilter = Record<string, string | number | boolean | object | Array<string | number>>
type QueryPageSize = PositiveNumberRange<25>

interface QueryParamsList<RS extends ResourceSortable> extends QueryParamsRetrieve {
	sort?: QueryArraySortable<RS> | QueryRecordSortable<RS>
	filters?: QueryFilter
	pageNumber?: number
	pageSize?: QueryPageSize
}

type QueryParams<RS extends ResourceSortable> = QueryParamsRetrieve | QueryParamsList<RS>

export type { QueryParamsRetrieve, QueryParamsList, QueryParams, QueryFilter }


const isParamsList = <RS extends ResourceSortable>(params: any): params is QueryParamsList<RS> => {
	return params && (params.filters || params.pageNumber || params.pageSize || params.sort)
}



const generateQueryStringParams = (params: QueryParamsRetrieve | QueryParamsList<ResourceSortable> | undefined, res: string | ResourceType): Record<string, string> => {

	debug('generate query string params: %O, %O', params, res)

	const qp: Record<string, string> = {}
	if (!params) return qp

	// Include
	if (params.include) qp.include = params.include.join(',')
	// Fields
	if (params.fields) {
		if (Array.isArray(params.fields)) params.fields = { [(res as ResourceType).type || res]: params.fields }
		Object.entries(params.fields).forEach(([p, v]) => {
			qp[`fields[${p}]`] = v.join(',')
		})
	}

	if (isParamsList(params)) {
		// Sort
		if (params.sort) {
			if (Array.isArray(params.sort)) qp.sort = params.sort.join(',')
			else qp.sort = Object.entries(params.sort).map(([k, v]) => `${v === 'desc' ? '-' : ''}${k}`).join(',')
		}
		// Page
		if (params.pageNumber) qp['page[number]'] = String(params.pageNumber)
		if (params.pageSize) qp['page[size]'] = String(params.pageSize)
		// Filters
		if (params.filters) {
			Object.entries(params.filters).forEach(([p, v]) => {
				const filter = p.substring(p.lastIndexOf('_'))
				let val
				if (Array.isArray(v)) {
					if (!arrayFilters.includes(filter)) throw new SdkError({ message: `Wrong ${filter} filter: Array value is supported only for the following filters: ${arrayFilters.join(', ')}`, type: ErrorType.REQUEST })
					val = v.join(',')
				}
				else if (typeof v === 'object') {
					if (!objectFilters.includes(filter)) throw new SdkError({ message: `Wrong ${filter} filter: Object value is supported only for the following filters: ${objectFilters.join(', ')}`, type: ErrorType.REQUEST })
					val = JSON.stringify(v)
				}
				else val = String(v)
				qp[`filter[q][${p}]`] = val
			})
		}
	}

	debug('query string params: %O', qp)

	return qp

}


const generateSearchString = (params?: QueryParams<ResourceSortable>, questionMark: boolean = true): string => {
	if (!params || (Object.keys(params).length === 0)) return ''
	return `${questionMark ? '?' : ''}${Object.entries(params).map(([key, val]) => `${key}=${String(val)}`).join('&')}`
}


export { generateQueryStringParams, isParamsList, generateSearchString }
