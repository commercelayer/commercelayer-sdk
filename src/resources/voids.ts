import { ApiResource, Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Authorization } from './authorizations'
import type { Event } from './events'


type VoidType = 'voids'
type VoidRel = ResourceRel & { type: VoidType }


interface Void extends Resource {
	
	readonly type: VoidType

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
	reference_authorization?: Authorization
	events?: Event[]

}


class Voids extends ApiResource<Void> {

	static readonly TYPE: VoidType = 'voids' as const
	// static readonly PATH = 'voids'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Void>> {
		return this.resources.list<Void>({ type: Voids.TYPE }, params, options)
	}

	async order(voidId: string | Void, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `voids/${_voidId}/order`, params, options) as unknown as Order
	}

	async reference_authorization(voidId: string | Void, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Authorization> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Authorization>({ type: 'authorizations' }, `voids/${_voidId}/reference_authorization`, params, options) as unknown as Authorization
	}

	async events(voidId: string | Void, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Event>({ type: 'events' }, `voids/${_voidId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isVoid(resource: any): resource is Void {
		return resource.type && (resource.type === Voids.TYPE)
	}


	relationship(id: string | ResourceId | null): VoidRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Voids.TYPE } : { id: id.id, type: Voids.TYPE }
	}


	type(): VoidType {
		return Voids.TYPE
	}

}


export default Voids

export type { Void, VoidType }
