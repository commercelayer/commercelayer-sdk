import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { ShippingMethod, ShippingMethodType } from './shipping_methods'
import type { Attachment } from './attachments'


type ShippingWeightTierType = 'shipping_weight_tiers'
type ShippingWeightTierRel = ResourceRel & { type: ShippingWeightTierType }
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }


interface ShippingWeightTier extends Resource {
	
	readonly type: ShippingWeightTierType

	name: string
	up_to?: number | null
	price_amount_cents: number
	price_amount_float?: number | null
	formatted_price_amount?: string | null

	shipping_method?: ShippingMethod | null
	attachments?: Attachment[] | null

}


interface ShippingWeightTierCreate extends ResourceCreate {
	
	name: string
	up_to?: number | null
	price_amount_cents: number

	shipping_method: ShippingMethodRel

}


interface ShippingWeightTierUpdate extends ResourceUpdate {
	
	name?: string | null
	up_to?: number | null
	price_amount_cents?: number | null

	shipping_method?: ShippingMethodRel | null

}


class ShippingWeightTiers extends ApiResource<ShippingWeightTier> {

	static readonly TYPE: ShippingWeightTierType = 'shipping_weight_tiers' as const

	async create(resource: ShippingWeightTierCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingWeightTier> {
		return this.resources.create<ShippingWeightTierCreate, ShippingWeightTier>({ ...resource, type: ShippingWeightTiers.TYPE }, params, options)
	}

	async update(resource: ShippingWeightTierUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingWeightTier> {
		return this.resources.update<ShippingWeightTierUpdate, ShippingWeightTier>({ ...resource, type: ShippingWeightTiers.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ShippingWeightTiers.TYPE } : id, options)
	}

	async shipping_method(shippingWeightTierId: string | ShippingWeightTier, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		const _shippingWeightTierId = (shippingWeightTierId as ShippingWeightTier).id || shippingWeightTierId as string
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `shipping_weight_tiers/${_shippingWeightTierId}/shipping_method`, params, options) as unknown as ShippingMethod
	}

	async attachments(shippingWeightTierId: string | ShippingWeightTier, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shippingWeightTierId = (shippingWeightTierId as ShippingWeightTier).id || shippingWeightTierId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipping_weight_tiers/${_shippingWeightTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isShippingWeightTier(resource: any): resource is ShippingWeightTier {
		return resource.type && (resource.type === ShippingWeightTiers.TYPE)
	}


	relationship(id: string | ResourceId | null): ShippingWeightTierRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ShippingWeightTiers.TYPE } : { id: id.id, type: ShippingWeightTiers.TYPE }
	}


	type(): ShippingWeightTierType {
		return ShippingWeightTiers.TYPE
	}

}


export default ShippingWeightTiers

export type { ShippingWeightTier, ShippingWeightTierCreate, ShippingWeightTierUpdate, ShippingWeightTierType }
