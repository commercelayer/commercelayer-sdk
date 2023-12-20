import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PromotionRule, PromotionRuleType } from './promotion_rules'
import type { OrderAmountPromotionRule, OrderAmountPromotionRuleType } from './order_amount_promotion_rules'
import type { SkuListPromotionRule, SkuListPromotionRuleType } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { Coupon, CouponType } from './coupons'
import type { SkuList, SkuListType } from './sku_lists'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'
import type { Sku } from './skus'


type FixedAmountPromotionType = 'fixed_amount_promotions'
type FixedAmountPromotionRel = ResourceRel & { type: FixedAmountPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CouponRel = ResourceRel & { type: CouponType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


interface FixedAmountPromotion extends Resource {
	
	readonly type: FixedAmountPromotionType

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
	fixed_amount_cents: number
	fixed_amount_float?: number | null
	formatted_fixed_amount?: string | null

	market?: Market | null
	promotion_rules?: PromotionRule[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRule | null
	sku_list_promotion_rule?: SkuListPromotionRule | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRule | null
	coupons?: Coupon[] | null
	sku_list?: SkuList | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null
	skus?: Sku[] | null

}


interface FixedAmountPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at: string
	expires_at: string
	total_usage_limit?: number | null
	_disable?: boolean | null
	_enable?: boolean | null
	fixed_amount_cents: number

	market?: MarketRel | null
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	coupons?: CouponRel[] | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


interface FixedAmountPromotionUpdate extends ResourceUpdate {
	
	name?: string | null
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at?: string | null
	expires_at?: string | null
	total_usage_limit?: number | null
	_disable?: boolean | null
	_enable?: boolean | null
	fixed_amount_cents?: number | null

	market?: MarketRel | null
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	coupons?: CouponRel[] | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


class FixedAmountPromotions extends ApiResource<FixedAmountPromotion> {

	static readonly TYPE: FixedAmountPromotionType = 'fixed_amount_promotions' as const

	async create(resource: FixedAmountPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.create<FixedAmountPromotionCreate, FixedAmountPromotion>({ ...resource, type: FixedAmountPromotions.TYPE }, params, options)
	}

	async update(resource: FixedAmountPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.update<FixedAmountPromotionUpdate, FixedAmountPromotion>({ ...resource, type: FixedAmountPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: FixedAmountPromotions.TYPE } : id, options)
	}

	async market(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async coupons(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async sku_list(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async attachments(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async skus(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async _disable(id: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.update<FixedAmountPromotionUpdate, FixedAmountPromotion>({ id: (typeof id === 'string')? id: id.id, type: FixedAmountPromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.update<FixedAmountPromotionUpdate, FixedAmountPromotion>({ id: (typeof id === 'string')? id: id.id, type: FixedAmountPromotions.TYPE, _enable: true }, params, options)
	}


	isFixedAmountPromotion(resource: any): resource is FixedAmountPromotion {
		return resource.type && (resource.type === FixedAmountPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FixedAmountPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: FixedAmountPromotions.TYPE } : { id: id.id, type: FixedAmountPromotions.TYPE }
	}


	type(): FixedAmountPromotionType {
		return FixedAmountPromotions.TYPE
	}

}


export default FixedAmountPromotions

export type { FixedAmountPromotion, FixedAmountPromotionCreate, FixedAmountPromotionUpdate, FixedAmountPromotionType }
