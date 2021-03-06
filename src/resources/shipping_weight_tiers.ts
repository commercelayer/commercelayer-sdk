import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { ShippingMethod } from './shipping_methods'
import type { Attachment } from './attachments'


type ShippingWeightTierRel = ResourceRel & { type: typeof ShippingWeightTiers.TYPE }
type ShippingMethodRel = ResourceRel & { type: 'shipping_methods' }


interface ShippingWeightTier extends Resource {
	
	name?: string
	up_to?: number
	price_amount_cents?: number
	price_amount_float?: number
	formatted_price_amount?: string

	shipping_method?: ShippingMethod
	attachments?: Attachment[]

}


interface ShippingWeightTierCreate extends ResourceCreate {
	
	name: string
	up_to?: number
	price_amount_cents: number

	shipping_method: ShippingMethodRel

}


interface ShippingWeightTierUpdate extends ResourceUpdate {
	
	name?: string
	up_to?: number
	price_amount_cents?: number

	shipping_method?: ShippingMethodRel

}


class ShippingWeightTiers extends ApiResource {

	static readonly TYPE: 'shipping_weight_tiers' = 'shipping_weight_tiers'
	// static readonly PATH = 'shipping_weight_tiers'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingWeightTier>> {
		return this.resources.list<ShippingWeightTier>({ type: ShippingWeightTiers.TYPE }, params, options)
	}

	async create(resource: ShippingWeightTierCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingWeightTier> {
		return this.resources.create<ShippingWeightTierCreate, ShippingWeightTier>({ ...resource, type: ShippingWeightTiers.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingWeightTier> {
		return this.resources.retrieve<ShippingWeightTier>({ type: ShippingWeightTiers.TYPE, id }, params, options)
	}

	async update(resource: ShippingWeightTierUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingWeightTier> {
		return this.resources.update<ShippingWeightTierUpdate, ShippingWeightTier>({ ...resource, type: ShippingWeightTiers.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ShippingWeightTiers.TYPE, id }, options)
	}

	async shipping_method(shippingWeightTierId: string | ShippingWeightTier, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		const _shippingWeightTierId = (shippingWeightTierId as ShippingWeightTier).id || shippingWeightTierId
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `shipping_weight_tiers/${_shippingWeightTierId}/shipping_method`, params, options) as unknown as ShippingMethod
	}

	async attachments(shippingWeightTierId: string | ShippingWeightTier, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shippingWeightTierId = (shippingWeightTierId as ShippingWeightTier).id || shippingWeightTierId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipping_weight_tiers/${_shippingWeightTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isShippingWeightTier(resource: any): resource is ShippingWeightTier {
		return resource.type && (resource.type === ShippingWeightTiers.TYPE)
	}


	relationship(id: string | ResourceId | null): ShippingWeightTierRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ShippingWeightTiers.TYPE } : { id: id.id, type: ShippingWeightTiers.TYPE }
	}


	type(): string {
		return ShippingWeightTiers.TYPE
	}

}


export default ShippingWeightTiers

export { ShippingWeightTier, ShippingWeightTierCreate, ShippingWeightTierUpdate }
