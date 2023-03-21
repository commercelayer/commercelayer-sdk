import { ApiResource, Resource, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { Order } from './orders'


type TransactionType = 'transactions'
type TransactionRel = ResourceRel & { type: TransactionType }


interface Transaction extends Resource {
	
	readonly type: TransactionType

	number: string
	currency_code: string
	amount_cents: number
	amount_float: number
	formatted_amount: string
	succeeded: boolean
	message?: string
	error_code?: string
	error_detail?: string
	token?: string
	gateway_transaction_id?: string

	order?: Order

}


class Transactions extends ApiResource<Transaction> {

	static readonly TYPE: TransactionType = 'transactions' as const

	async order(transactionId: string | Transaction, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _transactionId = (transactionId as Transaction).id || transactionId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `transactions/${_transactionId}/order`, params, options) as unknown as Order
	}


	isTransaction(resource: any): resource is Transaction {
		return resource.type && (resource.type === Transactions.TYPE)
	}


	relationship(id: string | ResourceId | null): TransactionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Transactions.TYPE } : { id: id.id, type: Transactions.TYPE }
	}


	type(): TransactionType {
		return Transactions.TYPE
	}

}


export default Transactions

export type { Transaction, TransactionType }
