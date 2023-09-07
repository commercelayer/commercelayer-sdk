import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PromotionRule, PromotionRuleType } from './promotion_rules'
import type { OrderAmountPromotionRule, OrderAmountPromotionRuleType } from './order_amount_promotion_rules'
import type { SkuListPromotionRule, SkuListPromotionRuleType } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { SkuList, SkuListType } from './sku_lists'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'
import type { Sku } from './skus'


type FixedPricePromotionType = 'fixed_price_promotions'
type FixedPricePromotionRel = ResourceRel & { type: FixedPricePromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


interface FixedPricePromotion extends Resource {
	
	readonly type: FixedPricePromotionType

	name: string
	currency_code?: string | null
	starts_at: string
	expires_at: string
	total_usage_limit: number
	total_usage_count?: number | null
	active?: boolean | null
	fixed_amount_cents: number
	fixed_amount_float?: number | null
	formatted_fixed_amount?: string | null

	market?: Market | null
	promotion_rules?: PromotionRule[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRule | null
	sku_list_promotion_rule?: SkuListPromotionRule | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRule | null
	sku_list?: SkuList | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null
	skus?: Sku[] | null

}


interface FixedPricePromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string | null
	starts_at: string
	expires_at: string
	total_usage_limit: number
	fixed_amount_cents: number

	market?: MarketRel | null
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	sku_list: SkuListRel
	tags?: TagRel[] | null

}


interface FixedPricePromotionUpdate extends ResourceUpdate {
	
	name?: string | null
	currency_code?: string | null
	starts_at?: string | null
	expires_at?: string | null
	total_usage_limit?: number | null
	fixed_amount_cents?: number | null

	market?: MarketRel | null
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


class FixedPricePromotions extends ApiResource<FixedPricePromotion> {

	static readonly TYPE: FixedPricePromotionType = 'fixed_price_promotions' as const

	async create(resource: FixedPricePromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.create<FixedPricePromotionCreate, FixedPricePromotion>({ ...resource, type: FixedPricePromotions.TYPE }, params, options)
	}

	async update(resource: FixedPricePromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.update<FixedPricePromotionUpdate, FixedPricePromotion>({ ...resource, type: FixedPricePromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: FixedPricePromotions.TYPE } : id, options)
	}

	async market(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `fixed_price_promotions/${_fixedPricePromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `fixed_price_promotions/${_fixedPricePromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `fixed_price_promotions/${_fixedPricePromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `fixed_price_promotions/${_fixedPricePromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async sku_list(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `fixed_price_promotions/${_fixedPricePromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async attachments(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `fixed_price_promotions/${_fixedPricePromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `fixed_price_promotions/${_fixedPricePromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `fixed_price_promotions/${_fixedPricePromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `fixed_price_promotions/${_fixedPricePromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async skus(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `fixed_price_promotions/${_fixedPricePromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}


	isFixedPricePromotion(resource: any): resource is FixedPricePromotion {
		return resource.type && (resource.type === FixedPricePromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FixedPricePromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: FixedPricePromotions.TYPE } : { id: id.id, type: FixedPricePromotions.TYPE }
	}


	type(): FixedPricePromotionType {
		return FixedPricePromotions.TYPE
	}

}


export default FixedPricePromotions

export type { FixedPricePromotion, FixedPricePromotionCreate, FixedPricePromotionUpdate, FixedPricePromotionType }
