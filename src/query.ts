
import type { ResourceType } from "./resource"

import Debug from './debug'
const debug = Debug('query')


type QueryFilter = Record<string, string | number | boolean>


interface QueryParamsRetrieve {
	include?: string[]
	fields?: string[] | Record<string, string[]>
}


interface QueryParamsList extends QueryParamsRetrieve {
	sort?: string[] | Record<string, 'asc' | 'desc'>
	filters?: QueryFilter
	pageNumber?: number
	pageSize?: number
}

type QueryParams = QueryParamsRetrieve | QueryParamsList

export type { QueryParamsRetrieve, QueryParamsList, QueryParams, QueryFilter }



const isParamsList = (params: any): params is QueryParamsList => {
	return params && (params.filters || params.pageNumber || params.pageSize || params.sort)
}


const generateQueryStringParams = (params: QueryParamsRetrieve | QueryParamsList | undefined, res: string | ResourceType): Record<string, string> => {

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
				qp[`filter[q][${p}]`] = String(v)
			})
		}
	}

	debug('query string params: %O', qp)

	return qp

}


export { generateQueryStringParams, isParamsList }
