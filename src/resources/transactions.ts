/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 22-07-2021
 **/

import { ApiResource, Resource, ResourcesConfig, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList } from '../query'

import { Order } from './orders'




interface Transaction extends Resource {
	
	number?: string
	currency_code?: string
	amount_cents?: number
	amount_float?: number
	formatted_amount?: string
	succeeded?: boolean
	message?: string
	error_code?: string
	error_detail?: string
	token?: string
	gateway_transaction_id?: string

	order?: Order

}


class Transactions extends ApiResource {

	static readonly TYPE: 'transactions' = 'transactions'
	// static readonly PATH = 'transactions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<Transaction[]> {
		return this.resources.list({ type: Transactions.TYPE }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isTransaction(resource: any): resource is Transaction {
		return resource.type && (resource.type === Transactions.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Transactions.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Transactions.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof Transactions.TYPE } {
		return { id, type: Transactions.TYPE }
	}

}


export default Transactions

export { Transaction }
