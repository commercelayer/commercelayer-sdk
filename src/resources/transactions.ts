import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderSortable } from './orders'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Event, EventSortable } from './events'
import type { Version, VersionSortable } from './versions'


type TransactionType = 'transactions'
type TransactionRel = ResourceRel & { type: TransactionType }


export type TransactionSortable = Pick<Transaction, 'id' | 'number' | 'amount_cents'> & ResourceSortable
export type TransactionFilterable = Pick<Transaction, 'id' | 'number' | 'currency_code' | 'amount_cents' | 'succeeded' | 'message' | 'error_code' | 'error_detail' | 'token' | 'gateway_transaction_id'> & ResourceFilterable


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
	events?: Event[] | null
	versions?: Version[] | null

}


class Transactions extends ApiResource<Transaction, TransactionSortable> {

	static readonly TYPE: TransactionType = 'transactions' as const

	async order(transactionId: string | Transaction, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _transactionId = (transactionId as Transaction).id || transactionId as string
		return this.resources.fetch<Order, OrderSortable>({ type: 'orders' }, `transactions/${_transactionId}/order`, params, options) as unknown as Order
	}

	async attachments(transactionId: string | Transaction, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _transactionId = (transactionId as Transaction).id || transactionId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `transactions/${_transactionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(transactionId: string | Transaction, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _transactionId = (transactionId as Transaction).id || transactionId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `transactions/${_transactionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(transactionId: string | Transaction, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _transactionId = (transactionId as Transaction).id || transactionId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `transactions/${_transactionId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isTransaction(resource: any): resource is Transaction {
		return resource.type && (resource.type === Transactions.TYPE)
	}


	relationship(id: string | ResourceId | null): TransactionRel {
		return super.relationshipOneToOne<TransactionRel>(id)
	}

	relationshipToMany(...ids: string[]): TransactionRel[] {
		return super.relationshipOneToMany<TransactionRel>(...ids)
	}


	type(): TransactionType {
		return Transactions.TYPE
	}

}


export default Transactions

export type { Transaction, TransactionType }

/*
export const TransactionsClient = (init: ResourceAdapter | ResourcesInitConfig): Transactions => {
	return new Transactions((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
