import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Merchant, MerchantType, MerchantSortable } from './merchants'
import type { PriceList, PriceListType, PriceListSortable } from './price_lists'
import type { InventoryModel, InventoryModelType, InventoryModelSortable } from './inventory_models'
import type { SubscriptionModel, SubscriptionModelType, SubscriptionModelSortable } from './subscription_models'
import type { TaxCalculator, TaxCalculatorType, TaxCalculatorSortable } from './tax_calculators'
import type { CustomerGroup, CustomerGroupType, CustomerGroupSortable } from './customer_groups'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'


type MarketType = 'markets'
type MarketRel = ResourceRel & { type: MarketType }
type MerchantRel = ResourceRel & { type: MerchantType }
type PriceListRel = ResourceRel & { type: PriceListType }
type InventoryModelRel = ResourceRel & { type: InventoryModelType }
type SubscriptionModelRel = ResourceRel & { type: SubscriptionModelType }
type TaxCalculatorRel = ResourceRel & { type: TaxCalculatorType }
type CustomerGroupRel = ResourceRel & { type: CustomerGroupType }


export type MarketSortable = Pick<Market, 'id' | 'name' | 'code' | 'disabled_at'> & ResourceSortable
export type MarketFilterable = Pick<Market, 'id' | 'name' | 'code' | 'disabled_at'> & ResourceFilterable


interface Market extends Resource {
	
	readonly type: MarketType

	number?: number | null
	name: string
	code?: string | null
	facebook_pixel_id?: string | null
	checkout_url?: string | null
	external_prices_url?: string | null
	external_order_validation_url?: string | null
	private?: boolean | null
	disabled_at?: string | null
	shared_secret: string

	merchant?: Merchant | null
	price_list?: PriceList | null
	inventory_model?: InventoryModel | null
	subscription_model?: SubscriptionModel | null
	tax_calculator?: TaxCalculator | null
	customer_group?: CustomerGroup | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface MarketCreate extends ResourceCreate {
	
	name: string
	code?: string | null
	facebook_pixel_id?: string | null
	checkout_url?: string | null
	external_prices_url?: string | null
	external_order_validation_url?: string | null
	_disable?: boolean | null
	_enable?: boolean | null

	merchant: MerchantRel
	price_list: PriceListRel
	inventory_model: InventoryModelRel
	subscription_model?: SubscriptionModelRel | null
	tax_calculator?: TaxCalculatorRel | null
	customer_group?: CustomerGroupRel | null

}


interface MarketUpdate extends ResourceUpdate {
	
	name?: string | null
	code?: string | null
	facebook_pixel_id?: string | null
	checkout_url?: string | null
	external_prices_url?: string | null
	external_order_validation_url?: string | null
	_disable?: boolean | null
	_enable?: boolean | null

	merchant?: MerchantRel | null
	price_list?: PriceListRel | null
	inventory_model?: InventoryModelRel | null
	subscription_model?: SubscriptionModelRel | null
	tax_calculator?: TaxCalculatorRel | null
	customer_group?: CustomerGroupRel | null

}


class Markets extends ApiResource<Market, MarketSortable> {

	static readonly TYPE: MarketType = 'markets' as const

	async create(resource: MarketCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		return this.resources.create<MarketCreate, Market>({ ...resource, type: Markets.TYPE }, params, options)
	}

	async update(resource: MarketUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		return this.resources.update<MarketUpdate, Market>({ ...resource, type: Markets.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Markets.TYPE } : id, options)
	}

	async merchant(marketId: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Merchant> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Merchant, MerchantSortable>({ type: 'merchants' }, `markets/${_marketId}/merchant`, params, options) as unknown as Merchant
	}

	async price_list(marketId: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceList> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<PriceList, PriceListSortable>({ type: 'price_lists' }, `markets/${_marketId}/price_list`, params, options) as unknown as PriceList
	}

	async inventory_model(marketId: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<InventoryModel, InventoryModelSortable>({ type: 'inventory_models' }, `markets/${_marketId}/inventory_model`, params, options) as unknown as InventoryModel
	}

	async subscription_model(marketId: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SubscriptionModel> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<SubscriptionModel, SubscriptionModelSortable>({ type: 'subscription_models' }, `markets/${_marketId}/subscription_model`, params, options) as unknown as SubscriptionModel
	}

	async tax_calculator(marketId: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCalculator> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<TaxCalculator, TaxCalculatorSortable>({ type: 'tax_calculators' }, `markets/${_marketId}/tax_calculator`, params, options) as unknown as TaxCalculator
	}

	async customer_group(marketId: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<CustomerGroup, CustomerGroupSortable>({ type: 'customer_groups' }, `markets/${_marketId}/customer_group`, params, options) as unknown as CustomerGroup
	}

	async attachments(marketId: string | Market, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `markets/${_marketId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(marketId: string | Market, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `markets/${_marketId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		return this.resources.update<MarketUpdate, Market>({ id: (typeof id === 'string')? id: id.id, type: Markets.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		return this.resources.update<MarketUpdate, Market>({ id: (typeof id === 'string')? id: id.id, type: Markets.TYPE, _enable: true }, params, options)
	}


	isMarket(resource: any): resource is Market {
		return resource.type && (resource.type === Markets.TYPE)
	}


	relationship(id: string | ResourceId | null): MarketRel {
		return super.relationshipOneToOne<MarketRel>(id)
	}

	relationshipToMany(...ids: string[]): MarketRel[] {
		return super.relationshipOneToMany<MarketRel>(...ids)
	}


	type(): MarketType {
		return Markets.TYPE
	}

}


export default Markets

export type { Market, MarketCreate, MarketUpdate, MarketType }

/*
export const MarketsClient = (init: ResourceAdapter | ResourcesInitConfig): Markets => {
	return new Markets((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
