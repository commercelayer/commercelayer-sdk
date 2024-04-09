
import type { Resource, ResourceType } from "./resource"
import { ErrorType, SdkError } from "./error"
import type { PositiveNumberRange, StringKey } from "./types"
import type { ResourceFields, ResourceSortFields, ResourceTypeLock } from "./api"

import Debug from './debug'
const debug = Debug('query')


const arrayFilters = ['_any', '_all', '_in']
const objectFilters = ['_jcont']

// type QueryResType<T> = T extends { type: infer Type } ? Type : never
type QueryResType<T extends Resource> = T['type']

type QueryInclude = string[]
type QueryResourceFields<R extends ResourceTypeLock> = keyof ResourceFields[R]
type QueryArrayFields<R extends Resource> = Array<QueryResourceFields<QueryResType<R>>>
type QueryRecordFields = { [key in keyof ResourceFields]?: Array<(QueryResourceFields<key>)> }

interface QueryParamsRetrieve<R extends Resource = Resource> {
	include?: QueryInclude
	fields?: QueryArrayFields<R> | QueryRecordFields
}

type QuerySortType = 'asc' | 'desc'
type QueryResourceSortable<R extends Resource> = ResourceSortFields[QueryResType<R>]
type QueryResourceSortableFields<R extends Resource> = StringKey<QueryResourceSortable<R>>
type QueryArraySortable<R extends Resource> = Array<QueryResourceSortableFields<R> | `-${QueryResourceSortableFields<R>}`>
type QueryRecordSortable<R extends Resource> = Partial<Record<keyof QueryResourceSortable<R>, QuerySortType>>
type QueryFilter = Record<string, string | number | boolean | object | Array<string | number>>
type QueryPageNumber = number
type QueryPageSize = PositiveNumberRange<25>

interface QueryParamsList<R extends Resource = Resource> extends QueryParamsRetrieve<R> {
	sort?: QueryArraySortable<R> | QueryRecordSortable<R>
	filters?: QueryFilter
	pageNumber?: QueryPageNumber
	pageSize?: QueryPageSize
}

type QueryParams<R extends Resource = Resource> = QueryParamsRetrieve<R> | QueryParamsList<R>

export type { QueryParamsRetrieve, QueryParamsList, QueryParams, QueryFilter, QueryPageSize }



const isParamsList = <R extends Resource>(params: any): params is QueryParamsList<R> => {
	return params && (params.filters || params.pageNumber || params.pageSize || params.sort)
}


type QueryStringParams = Record<string, string>

const generateQueryStringParams = <R extends Resource>(params: QueryParams<R> | undefined, res: string | ResourceType): QueryStringParams => {

	debug('generate query string params: %O, %O', params, res)

	const qp: QueryStringParams = {}
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


const generateSearchString = (params?: QueryStringParams, questionMark: boolean = true): string => {
	if (!params || (Object.keys(params).length === 0)) return ''
	return `${questionMark ? '?' : ''}${Object.entries(params).map(([key, val]) => `${key}=${String(val)}`).join('&')}`
}


export { generateQueryStringParams, isParamsList, generateSearchString }
