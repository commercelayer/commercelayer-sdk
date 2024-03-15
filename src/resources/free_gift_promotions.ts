import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PromotionRule } from './promotion_rules'
import type { OrderAmountPromotionRule, OrderAmountPromotionRuleType } from './order_amount_promotion_rules'
import type { SkuListPromotionRule, SkuListPromotionRuleType } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { CustomPromotionRule, CustomPromotionRuleType } from './custom_promotion_rules'
import type { SkuList, SkuListType } from './sku_lists'
import type { Coupon } from './coupons'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'
import type { Sku } from './skus'


type FreeGiftPromotionType = 'free_gift_promotions'
type FreeGiftPromotionRel = ResourceRel & { type: FreeGiftPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CustomPromotionRuleRel = ResourceRel & { type: CustomPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


interface FreeGiftPromotion extends Resource {
	
	readonly type: FreeGiftPromotionType

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
	max_quantity?: number | null

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
	skus?: Sku[] | null

}


interface FreeGiftPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at: string
	expires_at: string
	total_usage_limit?: number | null
	_disable?: boolean | null
	_enable?: boolean | null
	max_quantity?: number | null

	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	sku_list: SkuListRel
	tags?: TagRel[] | null

}


interface FreeGiftPromotionUpdate extends ResourceUpdate {
	
	name?: string | null
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at?: string | null
	expires_at?: string | null
	total_usage_limit?: number | null
	_disable?: boolean | null
	_enable?: boolean | null
	max_quantity?: number | null

	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


class FreeGiftPromotions extends ApiResource<FreeGiftPromotion> {

	static readonly TYPE: FreeGiftPromotionType = 'free_gift_promotions' as const

	async create(resource: FreeGiftPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.create<FreeGiftPromotionCreate, FreeGiftPromotion>({ ...resource, type: FreeGiftPromotions.TYPE }, params, options)
	}

	async update(resource: FreeGiftPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.update<FreeGiftPromotionUpdate, FreeGiftPromotion>({ ...resource, type: FreeGiftPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: FreeGiftPromotions.TYPE } : id, options)
	}

	async market(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `free_gift_promotions/${_freeGiftPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `free_gift_promotions/${_freeGiftPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `free_gift_promotions/${_freeGiftPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `free_gift_promotions/${_freeGiftPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async custom_promotion_rule(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `free_gift_promotions/${_freeGiftPromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async sku_list(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `free_gift_promotions/${_freeGiftPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async coupons(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `free_gift_promotions/${_freeGiftPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async attachments(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `free_gift_promotions/${_freeGiftPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `free_gift_promotions/${_freeGiftPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `free_gift_promotions/${_freeGiftPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `free_gift_promotions/${_freeGiftPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async skus(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `free_gift_promotions/${_freeGiftPromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async _disable(id: string | FreeGiftPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.update<FreeGiftPromotionUpdate, FreeGiftPromotion>({ id: (typeof id === 'string')? id: id.id, type: FreeGiftPromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | FreeGiftPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.update<FreeGiftPromotionUpdate, FreeGiftPromotion>({ id: (typeof id === 'string')? id: id.id, type: FreeGiftPromotions.TYPE, _enable: true }, params, options)
	}


	isFreeGiftPromotion(resource: any): resource is FreeGiftPromotion {
		return resource.type && (resource.type === FreeGiftPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FreeGiftPromotionRel {
		return super.relationshipOneToOne<FreeGiftPromotionRel>(id)
	}

	relationshipToMany(...ids: string[]): FreeGiftPromotionRel[] {
		return super.relationshipOneToMany<FreeGiftPromotionRel>(...ids)
	}


	type(): FreeGiftPromotionType {
		return FreeGiftPromotions.TYPE
	}

}


export default FreeGiftPromotions

export type { FreeGiftPromotion, FreeGiftPromotionCreate, FreeGiftPromotionUpdate, FreeGiftPromotionType }
