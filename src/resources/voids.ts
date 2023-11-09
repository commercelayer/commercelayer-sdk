import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { Authorization } from './authorizations'


type VoidRel = ResourceRel & { type: typeof Voids.TYPE }


interface Void extends Resource {
	
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
	attachments?: Attachment[]
	events?: Event[]
	versions?: Version[]
	reference_authorization?: Authorization

}


class Voids extends ApiResource {

	static readonly TYPE: 'voids' = 'voids' as const
	// static readonly PATH = 'voids'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Void>> {
		return this.resources.list<Void>({ type: Voids.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Void> {
		return this.resources.retrieve<Void>({ type: Voids.TYPE, id }, params, options)
	}

	async order(voidId: string | Void, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `voids/${_voidId}/order`, params, options) as unknown as Order
	}

	async attachments(voidId: string | Void, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `voids/${_voidId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(voidId: string | Void, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Event>({ type: 'events' }, `voids/${_voidId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(voidId: string | Void, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `voids/${_voidId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async reference_authorization(voidId: string | Void, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Authorization> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Authorization>({ type: 'authorizations' }, `voids/${_voidId}/reference_authorization`, params, options) as unknown as Authorization
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isVoid(resource: any): resource is Void {
		return resource.type && (resource.type === Voids.TYPE)
	}


	relationship(id: string | ResourceId | null): VoidRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Voids.TYPE } : { id: id.id, type: Voids.TYPE }
	}


	type(): string {
		return Voids.TYPE
	}

}


export default Voids

export { Void }
