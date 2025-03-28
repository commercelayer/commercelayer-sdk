
import type { Resource, ResourceType } from "./resource"
import { ErrorType, SdkError } from "./error"
import type { PositiveNumberRange, StringKey } from "./types"
import type { ResourceFields, ResourceSortFields, ResourceTypeLock } from "./api"

import Debug from './debug'
const debug = Debug('query')


const arrayFilters = ['_any', '_all', '_in', '_not_in_or_null']
const isArrayFilter = (filter: string): boolean => {
	return arrayFilters.some(f => filter.endsWith(f))
}

const objectFilters = ['_jcont']
const isObjectFilter = (filter: string): boolean => {
	return objectFilters.some(f => filter.endsWith(f))
}


// type QueryResType<T> = T extends { type: infer Type } ? Type : never
type QueryResType<T extends Resource> = T['type']

export type QueryInclude = string[]

type QueryResourceFields<R extends ResourceTypeLock> = keyof ResourceFields[R]
export type QueryArrayFields<R extends Resource> = Array<QueryResourceFields<QueryResType<R>>>
export type QueryRecordFields = { [key in keyof ResourceFields]?: Array<(QueryResourceFields<key>)> }
export type QueryFields<R extends Resource> = QueryArrayFields<R> | QueryRecordFields

export interface QueryParamsRetrieve<R extends Resource = Resource> {
	include?: QueryInclude
	fields?: QueryFields<R>
}

type QuerySortType = 'asc' | 'desc'
type QueryResourceSortable<R extends Resource> = ResourceSortFields[QueryResType<R>]
type QueryResourceSortableFields<R extends Resource> = StringKey<QueryResourceSortable<R>>
export type QueryArraySortable<R extends Resource> = Array<QueryResourceSortableFields<R> | `-${QueryResourceSortableFields<R>}`>
export type QueryRecordSortable<R extends Resource> = Partial<Record<keyof QueryResourceSortable<R>, QuerySortType>>
export type QuerySort<R extends Resource> = QueryArraySortable<R> | QueryRecordSortable<R>

export type QueryFilter = Record<string, string | number | boolean | object | Array<string | number>>

export type QueryPageNumber = number
export type QueryPageSize = PositiveNumberRange<25>

export interface QueryParamsList<R extends Resource = Resource> extends QueryParamsRetrieve<R> {
	sort?: QuerySort<R>
	filters?: QueryFilter
	pageNumber?: QueryPageNumber
	pageSize?: QueryPageSize
}

export type QueryParams<R extends Resource = Resource> = QueryParamsRetrieve<R> | QueryParamsList<R>



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
				let val
				if (Array.isArray(v)) {
					if (!isArrayFilter(p)) throw new SdkError({ message: `Incorrect filter [${p}]: Array value is supported only for the following filters: ${arrayFilters.join(', ')}`, type: ErrorType.REQUEST })
					val = v.join(',')
				}
				else if (typeof v === 'object') {
					if (!isObjectFilter(p)) throw new SdkError({ message: `Incorrect filter [${p}]: Object value is supported only for the following filters: ${objectFilters.join(', ')}`, type: ErrorType.REQUEST })
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
