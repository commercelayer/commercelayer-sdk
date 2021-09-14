/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList } from '../query'

import { Order } from './orders'


type TransactionRel = ResourceId & { type: typeof Transactions.TYPE }


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

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Transaction>> {
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

	relationship(id: string | ResourceId): TransactionRel {
		return (typeof id === 'string') ? { id, type: Transactions.TYPE } : {id: id.id, type: Transactions.TYPE }
	}

}


export default Transactions

export { Transaction }
