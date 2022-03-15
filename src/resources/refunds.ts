import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { Capture } from './captures'


type RefundRel = ResourceRel & { type: typeof Refunds.TYPE }


interface Refund extends Resource {
	
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
	reference_capture?: Capture

}


class Refunds extends ApiResource {

	static readonly TYPE: 'refunds' = 'refunds'
	// static readonly PATH = 'refunds'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Refund>> {
		return this.resources.list<Refund>({ type: Refunds.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Refund> {
		return this.resources.retrieve<Refund>({ type: Refunds.TYPE, id }, params, options)
	}

	async order(refundId: string | Refund, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _refundId = (refundId as Refund).id || refundId
		return this.resources.fetch<Order>({ type: 'orders' }, `refunds/${_refundId}/order`, params, options) as unknown as Order
	}

	async reference_capture(refundId: string | Refund, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Capture> {
		const _refundId = (refundId as Refund).id || refundId
		return this.resources.fetch<Capture>({ type: 'captures' }, `refunds/${_refundId}/reference_capture`, params, options) as unknown as Capture
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isRefund(resource: any): resource is Refund {
		return resource.type && (resource.type === Refunds.TYPE)
	}


	relationship(id: string | ResourceId | null): RefundRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Refunds.TYPE } : { id: id.id, type: Refunds.TYPE }
	}


	type(): string {
		return Refunds.TYPE
	}

}


export default Refunds

export { Refund }
