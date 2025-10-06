import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { ShippingMethod } from './shipping_methods'
import type { Attachment } from './attachments'
import type { Version } from './versions'
import type { EventStore } from './event_stores'


type ShippingMethodTierType = 'shipping_method_tiers'
type ShippingMethodTierRel = ResourceRel & { type: ShippingMethodTierType }


export type ShippingMethodTierSort = Pick<ShippingMethodTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceSort
// export type ShippingMethodTierFilter = Pick<ShippingMethodTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceFilter


interface ShippingMethodTier extends Resource {
	
	readonly type: ShippingMethodTierType

	/** 
	 * The shipping method tier's name.
	 * @example ```"Light shipping under 3kg"```
	 */
	name: string
	/** 
	 * The tier upper limit. When 'null' it means infinity (useful to have an always matching tier).
	 * @example ```20.5```
	 */
	up_to?: number | null
	/** 
	 * The price of this shipping method tier, in cents.
	 * @example ```1000```
	 */
	price_amount_cents: number
	/** 
	 * The price of this shipping method tier, float.
	 * @example ```10```
	 */
	price_amount_float?: number | null
	/** 
	 * The price of this shipping method tier, formatted.
	 * @example ```"€10,00"```
	 */
	formatted_price_amount?: string | null

	shipping_method?: ShippingMethod | null
	attachments?: Attachment[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null

}


class ShippingMethodTiers extends ApiResource<ShippingMethodTier> {

	static readonly TYPE: ShippingMethodTierType = 'shipping_method_tiers' as const

	async shipping_method(shippingMethodTierId: string | ShippingMethodTier, params?: QueryParamsRetrieve<ShippingMethod>, options?: ResourcesConfig): Promise<ShippingMethod> {
		const _shippingMethodTierId = (shippingMethodTierId as ShippingMethodTier).id || shippingMethodTierId as string
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `shipping_method_tiers/${_shippingMethodTierId}/shipping_method`, params, options) as unknown as ShippingMethod
	}

	async attachments(shippingMethodTierId: string | ShippingMethodTier, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shippingMethodTierId = (shippingMethodTierId as ShippingMethodTier).id || shippingMethodTierId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipping_method_tiers/${_shippingMethodTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(shippingMethodTierId: string | ShippingMethodTier, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shippingMethodTierId = (shippingMethodTierId as ShippingMethodTier).id || shippingMethodTierId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `shipping_method_tiers/${_shippingMethodTierId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(shippingMethodTierId: string | ShippingMethodTier, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _shippingMethodTierId = (shippingMethodTierId as ShippingMethodTier).id || shippingMethodTierId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `shipping_method_tiers/${_shippingMethodTierId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}


	isShippingMethodTier(resource: any): resource is ShippingMethodTier {
		return resource.type && (resource.type === ShippingMethodTiers.TYPE)
	}


	relationship(id: string | ResourceId | null): ShippingMethodTierRel {
		return super.relationshipOneToOne<ShippingMethodTierRel>(id)
	}

	relationshipToMany(...ids: string[]): ShippingMethodTierRel[] {
		return super.relationshipOneToMany<ShippingMethodTierRel>(...ids)
	}


	type(): ShippingMethodTierType {
		return ShippingMethodTiers.TYPE
	}

}


export default ShippingMethodTiers

export type { ShippingMethodTier, ShippingMethodTierType }
