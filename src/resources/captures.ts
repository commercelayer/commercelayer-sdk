import { ApiResource, Resource, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Authorization } from './authorizations'
import type { Refund } from './refunds'
import type { Event } from './events'


type CaptureType = 'captures'
type CaptureRel = ResourceRel & { type: CaptureType }


interface Capture extends Resource {
	
	readonly type: CaptureType

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
	refund_amount_cents?: number
	refund_amount_float?: number
	formatted_refund_amount?: string
	refund_balance_cents?: number
	refund_balance_float?: number
	formatted_refund_balance?: string

	order?: Order
	reference_authorization?: Authorization
	refunds?: Refund[]
	events?: Event[]

}


interface CaptureUpdate extends ResourceUpdate {
	
	_refund?: boolean
	_refund_amount_cents?: number
	
}


class Captures extends ApiResource<Capture> {

	static readonly TYPE: CaptureType = 'captures' as const

	async update(resource: CaptureUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Capture> {
		return this.resources.update<CaptureUpdate, Capture>({ ...resource, type: Captures.TYPE }, params, options)
	}

	async order(captureId: string | Capture, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `captures/${_captureId}/order`, params, options) as unknown as Order
	}

	async reference_authorization(captureId: string | Capture, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Authorization> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Authorization>({ type: 'authorizations' }, `captures/${_captureId}/reference_authorization`, params, options) as unknown as Authorization
	}

	async refunds(captureId: string | Capture, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Refund>> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Refund>({ type: 'refunds' }, `captures/${_captureId}/refunds`, params, options) as unknown as ListResponse<Refund>
	}

	async events(captureId: string | Capture, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Event>({ type: 'events' }, `captures/${_captureId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isCapture(resource: any): resource is Capture {
		return resource.type && (resource.type === Captures.TYPE)
	}


	relationship(id: string | ResourceId | null): CaptureRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Captures.TYPE } : { id: id.id, type: Captures.TYPE }
	}


	type(): CaptureType {
		return Captures.TYPE
	}

}


export default Captures

export type { Capture, CaptureUpdate, CaptureType }
