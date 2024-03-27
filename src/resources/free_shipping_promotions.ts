import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType, MarketSortable } from './markets'
import type { PromotionRule, PromotionRuleSortable } from './promotion_rules'
import type { OrderAmountPromotionRule, OrderAmountPromotionRuleType, OrderAmountPromotionRuleSortable } from './order_amount_promotion_rules'
import type { SkuListPromotionRule, SkuListPromotionRuleType, SkuListPromotionRuleSortable } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType, CouponCodesPromotionRuleSortable } from './coupon_codes_promotion_rules'
import type { CustomPromotionRule, CustomPromotionRuleType, CustomPromotionRuleSortable } from './custom_promotion_rules'
import type { SkuList, SkuListType, SkuListSortable } from './sku_lists'
import type { Coupon, CouponSortable } from './coupons'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Event, EventSortable } from './events'
import type { Tag, TagType, TagSortable } from './tags'
import type { Version, VersionSortable } from './versions'


type FreeShippingPromotionType = 'free_shipping_promotions'
type FreeShippingPromotionRel = ResourceRel & { type: FreeShippingPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CustomPromotionRuleRel = ResourceRel & { type: CustomPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


export type FreeShippingPromotionSortable = Pick<FreeShippingPromotion, 'id' | 'name' | 'currency_code' | 'exclusive' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at'> & ResourceSortable
export type FreeShippingPromotionFilterable = Pick<FreeShippingPromotion, 'id' | 'name' | 'currency_code' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at'> & ResourceFilterable


interface FreeShippingPromotion extends Resource {
	
	readonly type: FreeShippingPromotionType

	name: string
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at: string
	expires_at: string
	total_usage_limit?: number | null
	total_usage_count?: number | null
	active?: boolean | null
	disabled_at?: string | null

	market?: Market | null
	promotion_rules?: PromotionRule[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRule | null
	sku_list_promotion_rule?: SkuListPromotionRule | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRule | null
	custom_promotion_rule?: CustomPromotionRule | null
	sku_list?: SkuList | null
	coupons?: Coupon[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface FreeShippingPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at: string
	expires_at: string
	total_usage_limit?: number | null
	_disable?: boolean | null
	_enable?: boolean | null

	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


interface FreeShippingPromotionUpdate extends ResourceUpdate {
	
	name?: string | null
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at?: string | null
	expires_at?: string | null
	total_usage_limit?: number | null
	_disable?: boolean | null
	_enable?: boolean | null

	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


class FreeShippingPromotions extends ApiResource<FreeShippingPromotion, FreeShippingPromotionSortable> {

	static readonly TYPE: FreeShippingPromotionType = 'free_shipping_promotions' as const

	async create(resource: FreeShippingPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.create<FreeShippingPromotionCreate, FreeShippingPromotion>({ ...resource, type: FreeShippingPromotions.TYPE }, params, options)
	}

	async update(resource: FreeShippingPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.update<FreeShippingPromotionUpdate, FreeShippingPromotion>({ ...resource, type: FreeShippingPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: FreeShippingPromotions.TYPE } : id, options)
	}

	async market(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Market, MarketSortable>({ type: 'markets' }, `free_shipping_promotions/${_freeShippingPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule, OrderAmountPromotionRuleSortable>({ type: 'order_amount_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<SkuListPromotionRule, SkuListPromotionRuleSortable>({ type: 'sku_list_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule, CouponCodesPromotionRuleSortable>({ type: 'coupon_codes_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async custom_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<CustomPromotionRule, CustomPromotionRuleSortable>({ type: 'custom_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async sku_list(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<SkuList, SkuListSortable>({ type: 'sku_lists' }, `free_shipping_promotions/${_freeShippingPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async coupons(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList<CouponSortable>, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Coupon, CouponSortable>({ type: 'coupons' }, `free_shipping_promotions/${_freeShippingPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async attachments(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `free_shipping_promotions/${_freeShippingPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `free_shipping_promotions/${_freeShippingPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList<TagSortable>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Tag, TagSortable>({ type: 'tags' }, `free_shipping_promotions/${_freeShippingPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `free_shipping_promotions/${_freeShippingPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.update<FreeShippingPromotionUpdate, FreeShippingPromotion>({ id: (typeof id === 'string')? id: id.id, type: FreeShippingPromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.update<FreeShippingPromotionUpdate, FreeShippingPromotion>({ id: (typeof id === 'string')? id: id.id, type: FreeShippingPromotions.TYPE, _enable: true }, params, options)
	}


	isFreeShippingPromotion(resource: any): resource is FreeShippingPromotion {
		return resource.type && (resource.type === FreeShippingPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FreeShippingPromotionRel {
		return super.relationshipOneToOne<FreeShippingPromotionRel>(id)
	}

	relationshipToMany(...ids: string[]): FreeShippingPromotionRel[] {
		return super.relationshipOneToMany<FreeShippingPromotionRel>(...ids)
	}


	type(): FreeShippingPromotionType {
		return FreeShippingPromotions.TYPE
	}

}


export default FreeShippingPromotions

export type { FreeShippingPromotion, FreeShippingPromotionCreate, FreeShippingPromotionUpdate, FreeShippingPromotionType }

/*
export const FreeShippingPromotionsClient = (init: ResourceAdapter | ResourcesInitConfig): FreeShippingPromotions => {
	return new FreeShippingPromotions((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
