import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, /* ResourceFilterable */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { Authorization } from './authorizations'


type VoidType = 'voids'
type VoidRel = ResourceRel & { type: VoidType }


export type VoidSortable = Pick<Void, 'id' | 'number' | 'amount_cents'> & ResourceSortable
// export type VoidFilterable = Pick<Void, 'id' | 'number' | 'currency_code' | 'amount_cents' | 'succeeded' | 'message' | 'error_code' | 'error_detail' | 'token' | 'gateway_transaction_id'> & ResourceFilterable


interface Void extends Resource {
	
	readonly type: VoidType

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
	reference_authorization?: Authorization | null

}


class Voids extends ApiResource<Void> {

	static readonly TYPE: VoidType = 'voids' as const

	async order(voidId: string | Void, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `voids/${_voidId}/order`, params, options) as unknown as Order
	}

	async attachments(voidId: string | Void, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `voids/${_voidId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(voidId: string | Void, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Event>({ type: 'events' }, `voids/${_voidId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(voidId: string | Void, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `voids/${_voidId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async reference_authorization(voidId: string | Void, params?: QueryParamsRetrieve<Authorization>, options?: ResourcesConfig): Promise<Authorization> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Authorization>({ type: 'authorizations' }, `voids/${_voidId}/reference_authorization`, params, options) as unknown as Authorization
	}


	isVoid(resource: any): resource is Void {
		return resource.type && (resource.type === Voids.TYPE)
	}


	relationship(id: string | ResourceId | null): VoidRel {
		return super.relationshipOneToOne<VoidRel>(id)
	}

	relationshipToMany(...ids: string[]): VoidRel[] {
		return super.relationshipOneToMany<VoidRel>(...ids)
	}


	type(): VoidType {
		return Voids.TYPE
	}

}


export default Voids

export type { Void, VoidType }

/*
export const VoidsClient = (init: ResourceAdapter | ResourcesInitConfig): Voids => {
	return new Voids((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
