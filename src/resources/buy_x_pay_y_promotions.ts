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


type BuyXPayYPromotionType = 'buy_x_pay_y_promotions'
type BuyXPayYPromotionRel = ResourceRel & { type: BuyXPayYPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CouponRel = ResourceRel & { type: CouponType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


interface BuyXPayYPromotion extends Resource {
	
	readonly type: BuyXPayYPromotionType

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
	x: number
	y: number
	cheapest_free?: boolean | null

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


interface BuyXPayYPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at: string
	expires_at: string
	total_usage_limit: number
	x: number
	y: number
	cheapest_free?: boolean | null

	market?: MarketRel | null
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	coupons?: CouponRel[] | null
	sku_list: SkuListRel
	tags?: TagRel[] | null

}


interface BuyXPayYPromotionUpdate extends ResourceUpdate {
	
	name?: string | null
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at?: string | null
	expires_at?: string | null
	total_usage_limit?: number | null
	_disable?: boolean | null
	_enable?: boolean | null
	x?: number | null
	y?: number | null
	cheapest_free?: boolean | null

	market?: MarketRel | null
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	coupons?: CouponRel[] | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


class BuyXPayYPromotions extends ApiResource<BuyXPayYPromotion> {

	static readonly TYPE: BuyXPayYPromotionType = 'buy_x_pay_y_promotions' as const

	async create(resource: BuyXPayYPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BuyXPayYPromotion> {
		return this.resources.create<BuyXPayYPromotionCreate, BuyXPayYPromotion>({ ...resource, type: BuyXPayYPromotions.TYPE }, params, options)
	}

	async update(resource: BuyXPayYPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BuyXPayYPromotion> {
		return this.resources.update<BuyXPayYPromotionUpdate, BuyXPayYPromotion>({ ...resource, type: BuyXPayYPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: BuyXPayYPromotions.TYPE } : id, options)
	}

	async market(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async coupons(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async sku_list(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async attachments(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async skus(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async _disable(id: string | BuyXPayYPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BuyXPayYPromotion> {
		return this.resources.update<BuyXPayYPromotionUpdate, BuyXPayYPromotion>({ id: (typeof id === 'string')? id: id.id, type: BuyXPayYPromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | BuyXPayYPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BuyXPayYPromotion> {
		return this.resources.update<BuyXPayYPromotionUpdate, BuyXPayYPromotion>({ id: (typeof id === 'string')? id: id.id, type: BuyXPayYPromotions.TYPE, _enable: true }, params, options)
	}


	isBuyXPayYPromotion(resource: any): resource is BuyXPayYPromotion {
		return resource.type && (resource.type === BuyXPayYPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): BuyXPayYPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: BuyXPayYPromotions.TYPE } : { id: id.id, type: BuyXPayYPromotions.TYPE }
	}


	type(): BuyXPayYPromotionType {
		return BuyXPayYPromotions.TYPE
	}

}


export default BuyXPayYPromotions

export type { BuyXPayYPromotion, BuyXPayYPromotionCreate, BuyXPayYPromotionUpdate, BuyXPayYPromotionType }
