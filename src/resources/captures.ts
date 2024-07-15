import { ApiResource } from '../resource'
import type { Resource, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { Authorization } from './authorizations'
import type { Refund } from './refunds'
import type { Return } from './returns'


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
	message?: string | null
	error_code?: string | null
	error_detail?: string | null
	token?: string | null
	gateway_transaction_id?: string | null
	refund_amount_cents?: number | null
	refund_amount_float?: number | null
	formatted_refund_amount?: string | null
	refund_balance_cents?: number | null
	refund_balance_float?: number | null
	formatted_refund_balance?: string | null

	order?: Order | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null
	reference_authorization?: Authorization | null
	refunds?: Refund[] | null
	return?: Return | null

}


interface CaptureUpdate extends ResourceUpdate {
	
	succeeded?: boolean | null
	_forward?: boolean | null
	_refund?: boolean | null
	_refund_amount_cents?: number | null
	
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

	async attachments(captureId: string | Capture, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `captures/${_captureId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(captureId: string | Capture, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Event>({ type: 'events' }, `captures/${_captureId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(captureId: string | Capture, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `captures/${_captureId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async reference_authorization(captureId: string | Capture, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Authorization> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Authorization>({ type: 'authorizations' }, `captures/${_captureId}/reference_authorization`, params, options) as unknown as Authorization
	}

	async refunds(captureId: string | Capture, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Refund>> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Refund>({ type: 'refunds' }, `captures/${_captureId}/refunds`, params, options) as unknown as ListResponse<Refund>
	}

	async return(captureId: string | Capture, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Return> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Return>({ type: 'returns' }, `captures/${_captureId}/return`, params, options) as unknown as Return
	}

	async _forward(id: string | Capture, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Capture> {
		return this.resources.update<CaptureUpdate, Capture>({ id: (typeof id === 'string')? id: id.id, type: Captures.TYPE, _forward: true }, params, options)
	}

	async _refund(id: string | Capture, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Capture> {
		return this.resources.update<CaptureUpdate, Capture>({ id: (typeof id === 'string')? id: id.id, type: Captures.TYPE, _refund: true }, params, options)
	}

	async _refund_amount_cents(id: string | Capture, triggerValue: number, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Capture> {
		return this.resources.update<CaptureUpdate, Capture>({ id: (typeof id === 'string')? id: id.id, type: Captures.TYPE, _refund_amount_cents: triggerValue }, params, options)
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
