import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'


type TransactionType = 'transactions'
type TransactionRel = ResourceRel & { type: TransactionType }


export type TransactionSort = Pick<Transaction, 'id' | 'number' | 'amount_cents'> & ResourceSort
// export type TransactionFilter = Pick<Transaction, 'id' | 'number' | 'currency_code' | 'amount_cents' | 'succeeded' | 'message' | 'error_code' | 'error_detail' | 'token' | 'gateway_transaction_id'> & ResourceFilter


interface Transaction extends Resource {
	
	readonly type: TransactionType

	/** 
	 * The transaction number, auto generated.
	 * @example ```"42/T/001"```
	 */
	number: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard, inherited from the associated order.
	 * @example ```"EUR"```
	 */
	currency_code: string
	/** 
	 * The transaction amount, in cents.
	 * @example ```"1500"```
	 */
	amount_cents: number
	/** 
	 * The transaction amount, float.
	 * @example ```"15"```
	 */
	amount_float: number
	/** 
	 * The transaction amount, formatted.
	 * @example ```"€15,00"```
	 */
	formatted_amount: string
	/** 
	 * Indicates if the transaction is successful.
	 */
	succeeded: boolean
	/** 
	 * The message returned by the payment gateway.
	 * @example ```"Accepted"```
	 */
	message?: string | null
	/** 
	 * The error code, if any, returned by the payment gateway.
	 * @example ```"00001"```
	 */
	error_code?: string | null
	/** 
	 * The error detail, if any, returned by the payment gateway.
	 * @example ```"Already settled"```
	 */
	error_detail?: string | null
	/** 
	 * The token identifying the transaction, returned by the payment gateway.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	token?: string | null
	/** 
	 * The ID identifying the transaction, returned by the payment gateway.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	gateway_transaction_id?: string | null

	order?: Order | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null

}


class Transactions extends ApiResource<Transaction> {

	static readonly TYPE: TransactionType = 'transactions' as const

	async order(transactionId: string | Transaction, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _transactionId = (transactionId as Transaction).id || transactionId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `transactions/${_transactionId}/order`, params, options) as unknown as Order
	}

	async attachments(transactionId: string | Transaction, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _transactionId = (transactionId as Transaction).id || transactionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `transactions/${_transactionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(transactionId: string | Transaction, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _transactionId = (transactionId as Transaction).id || transactionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `transactions/${_transactionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(transactionId: string | Transaction, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _transactionId = (transactionId as Transaction).id || transactionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `transactions/${_transactionId}/versions`, params, options) as unknown as ListResponse<Version>
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
