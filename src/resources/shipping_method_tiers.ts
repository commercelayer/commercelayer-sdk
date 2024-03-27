import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { ShippingMethod, ShippingMethodSortable } from './shipping_methods'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'


type ShippingMethodTierType = 'shipping_method_tiers'
type ShippingMethodTierRel = ResourceRel & { type: ShippingMethodTierType }


export type ShippingMethodTierSortable = Pick<ShippingMethodTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceSortable
export type ShippingMethodTierFilterable = Pick<ShippingMethodTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceFilterable


interface ShippingMethodTier extends Resource {
	
	readonly type: ShippingMethodTierType

	name: string
	up_to?: number | null
	price_amount_cents: number
	price_amount_float?: number | null
	formatted_price_amount?: string | null

	shipping_method?: ShippingMethod | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


class ShippingMethodTiers extends ApiResource<ShippingMethodTier, ShippingMethodTierSortable> {

	static readonly TYPE: ShippingMethodTierType = 'shipping_method_tiers' as const

	async shipping_method(shippingMethodTierId: string | ShippingMethodTier, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		const _shippingMethodTierId = (shippingMethodTierId as ShippingMethodTier).id || shippingMethodTierId as string
		return this.resources.fetch<ShippingMethod, ShippingMethodSortable>({ type: 'shipping_methods' }, `shipping_method_tiers/${_shippingMethodTierId}/shipping_method`, params, options) as unknown as ShippingMethod
	}

	async attachments(shippingMethodTierId: string | ShippingMethodTier, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shippingMethodTierId = (shippingMethodTierId as ShippingMethodTier).id || shippingMethodTierId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `shipping_method_tiers/${_shippingMethodTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(shippingMethodTierId: string | ShippingMethodTier, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shippingMethodTierId = (shippingMethodTierId as ShippingMethodTier).id || shippingMethodTierId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `shipping_method_tiers/${_shippingMethodTierId}/versions`, params, options) as unknown as ListResponse<Version>
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

/*
export const ShippingMethodTiersClient = (init: ResourceAdapter | ResourcesInitConfig): ShippingMethodTiers => {
	return new ShippingMethodTiers((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
