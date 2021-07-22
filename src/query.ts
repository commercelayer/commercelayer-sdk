/* eslint-disable @typescript-eslint/no-explicit-any */

interface QueryParamsRetrieve {
	include?: string[]
	fields?: { [key: string]: string[] }
}


interface QueryParamsList extends QueryParamsRetrieve {
	sort?: string[] | { [key: string]: 'asc' | 'desc' }
	filters?: { [key: string]: string | number | boolean }
	pageNumber?: number
	pageSize?: number
}

type QueryParams = QueryParamsRetrieve | QueryParamsList

export { QueryParamsRetrieve, QueryParamsList }



type FilterPredicate =
	'blank' |
	'cont' |
	'cont_all' |
	'cont_any' |
	'does_not_match' |
	'does_not_match_all' |
	'does_not_match_any' |
	'end' |
	'end_all' |
	'end_any' |
	'eq' |
	'false' |
	'gt' |
	'gt_all' |
	'gt_any' |
	'gteq' |
	'gteq_all' |
	'gteq_any' |
	'in' |
	'lt' |
	'lt_all' |
	'lt_any' |
	'lteq' |
	'lteq_all' |
	'lteq_any' |
	'matches' |
	'matches_all' |
	'matches_any' |
	'not_cont' |
	'not_cont_all' |
	'not_end' |
	'not_end_all' |
	'not_end_any' |
	'not_eq' |
	'not_eq_all' |
	'not_in' |
	'not_null' |
	'not_start' |
	'not_start_all' |
	'not_start_any' |
	'null' |
	'present' |
	'start' |
	'start_all' |
	'start_any' |
	'true'




const isParamsList = (params: any): params is QueryParamsList => {
	return (params.filters || params.pageNumber || params.pageSize || params.sort)
}


class QueryBuilderRetrieve {

	#resource: string

	#include?: string[]
	#fields?: { [key: string]: string[] }


	constructor(resource?: string) {
		this.#resource = resource || ''
	}


	include(...resources: string[]): QueryBuilderRetrieve {
		if (!this.#include) this.#include = []
		this.#include.push(...resources)
		return this
	}

	field(field: string, resource?: string): QueryBuilderRetrieve {
		if (!this.#fields) this.#fields = {}
		if (!resource) resource = this.#resource
		if (!this.#fields[resource]) this.#fields[resource] = []
		this.#fields[resource].push(field)
		return this
	}

	fields(fields: string[], resource?: string): QueryBuilderRetrieve {
		fields.forEach(f => {
			this.field(f, resource)
		})
		return this
	}


	clear(): QueryBuilderRetrieve {
		this.#include = undefined
		this.#fields = undefined
		return this
	}


	build(): QueryParams {
		return {
			include: this.#include,
			fields: this.#fields,
		}
	}


	generate(): { [key: string]: string } {
		return generateQueryStringParams(this.build())
	}

}


class QueryBuilderList extends QueryBuilderRetrieve {

	#sort?: string[]
	#filters?: { [key: string]: string | number | boolean }
	#pageNumber?: number
	#pageSize?: number


	constructor(resource?: string) {
		super(resource)
	}

	include(...resources: string[]): QueryBuilderList {
		return super.include(...resources) as QueryBuilderList
	}

	field(field: string, resource?: string): QueryBuilderList {
		return super.field(field, resource) as QueryBuilderList
	}

	fields(fields: string[], resource?: string): QueryBuilderList {
		return super.fields(fields, resource) as QueryBuilderList
	}


	pageNumber(num: number): QueryBuilderList {
		this.#pageNumber = num
		return this
	}

	pageSize(size: number): QueryBuilderList {
		this.#pageSize = size
		return this
	}

	page(num: number, size: number): QueryBuilderList {
		this.#pageNumber = num
		this.#pageSize = size
		return this
	}

	sort(field: string, descending?: boolean): QueryBuilderList {
		if (!this.#sort) this.#sort = []
		this.#sort.push(`${descending ? '-' : ''}${field}`)
		return this
	}

	filter(field: string | string[], predicate: FilterPredicate, value: string | number | boolean | string[], resource?: string): QueryBuilderList {
		if (!this.#filters) this.#filters = {}
		const r = resource ? `${resource}_` : ''
		this.#filters[`${Array.isArray(field) ? field.map(f => `${r}${f}`).join('_or_') : (r + field)}_${predicate}`] = Array.isArray(value) ? value.join(',') : value
		return this
	}


	clear(): QueryBuilderList {
		super.clear()
		this.#sort = undefined
		this.#filters = undefined
		this.#pageNumber = undefined
		this.#pageSize = undefined
		return this
	}


	build(): QueryParams {
		return Object.assign(super.build(), {
			sort: this.#sort,
			filters: this.#filters,
			pageNumber: this.#pageNumber,
			pageSize: this.#pageSize,
		})
	}


	generate(): { [key: string]: string } {
		return generateQueryStringParams(this.build())
	}

}


class QueryBuilder extends QueryBuilderList {

	constructor(resource?: string) {
		super(resource)
	}

}


export default QueryBuilder

export { QueryBuilderRetrieve, QueryBuilderList }



const generateQueryStringParams = (params: QueryParamsRetrieve | QueryParamsList | undefined): { [key: string]: string } => {

	const qp: { [key: string]: string } = {}
	if (!params) return qp

	// Include
	if (params.include) qp['include'] = params.include.join(',')
	// Fields
	if (params.fields) {
		Object.entries(params.fields).forEach(([p, v]) => {
			qp[`fields[${p}]`] = v.join(',')
		})
	}

	if (isParamsList(params)) {
		// Sort
		if (params.sort) {
			if (Array.isArray(params.sort)) qp['sort'] = params.sort.join(',')
			else qp['sort'] = Object.entries(params.sort).map(([k, v]) => `${v === 'desc' ? '-' : ''}${k}`).join(',')
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

	return qp

}


export { generateQueryStringParams }
