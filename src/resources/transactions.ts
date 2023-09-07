import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Version } from './versions'


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
	message?: string | null
	error_code?: string | null
	error_detail?: string | null
	token?: string | null
	gateway_transaction_id?: string | null

	order?: Order | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


class Transactions extends ApiResource<Transaction> {

	static readonly TYPE: TransactionType = 'transactions' as const

	async order(transactionId: string | Transaction, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _transactionId = (transactionId as Transaction).id || transactionId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `transactions/${_transactionId}/order`, params, options) as unknown as Order
	}

	async attachments(transactionId: string | Transaction, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _transactionId = (transactionId as Transaction).id || transactionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `transactions/${_transactionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(transactionId: string | Transaction, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _transactionId = (transactionId as Transaction).id || transactionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `transactions/${_transactionId}/versions`, params, options) as unknown as ListResponse<Version>
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
