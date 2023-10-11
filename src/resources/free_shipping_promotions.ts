import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PromotionRule, PromotionRuleType } from './promotion_rules'
import type { OrderAmountPromotionRule, OrderAmountPromotionRuleType } from './order_amount_promotion_rules'
import type { SkuListPromotionRule, SkuListPromotionRuleType } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { Coupon, CouponType } from './coupons'
import type { SkuList } from './sku_lists'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'


type FreeShippingPromotionType = 'free_shipping_promotions'
type FreeShippingPromotionRel = ResourceRel & { type: FreeShippingPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CouponRel = ResourceRel & { type: CouponType }
type TagRel = ResourceRel & { type: TagType }


interface FreeShippingPromotion extends Resource {
	
	readonly type: FreeShippingPromotionType

	name: string
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at: string
	expires_at: string
	total_usage_limit: number
	total_usage_count?: number | null
	active?: boolean | null
	disabled_at?: string | null

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

}


interface FreeShippingPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at: string
	expires_at: string
	total_usage_limit: number

	market?: MarketRel | null
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	coupons?: CouponRel[] | null
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
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	coupons?: CouponRel[] | null
	tags?: TagRel[] | null

}


class FreeShippingPromotions extends ApiResource<FreeShippingPromotion> {

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
		return this.resources.fetch<Market>({ type: 'markets' }, `free_shipping_promotions/${_freeShippingPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async coupons(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `free_shipping_promotions/${_freeShippingPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async sku_list(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `free_shipping_promotions/${_freeShippingPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async attachments(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `free_shipping_promotions/${_freeShippingPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `free_shipping_promotions/${_freeShippingPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `free_shipping_promotions/${_freeShippingPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `free_shipping_promotions/${_freeShippingPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
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
		return ((id === null) || (typeof id === 'string')) ? { id, type: FreeShippingPromotions.TYPE } : { id: id.id, type: FreeShippingPromotions.TYPE }
	}


	type(): FreeShippingPromotionType {
		return FreeShippingPromotions.TYPE
	}


	parse(payload: any): FreeShippingPromotion | FreeShippingPromotion[] {
		return super.parse(payload)
	}

}


export default FreeShippingPromotions

export type { FreeShippingPromotion, FreeShippingPromotionCreate, FreeShippingPromotionUpdate, FreeShippingPromotionType }
