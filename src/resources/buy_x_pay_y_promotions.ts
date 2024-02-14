import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { PromotionRule } from './promotion_rules'
import type { OrderAmountPromotionRule } from './order_amount_promotion_rules'
import type { SkuListPromotionRule } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'
import type { CustomPromotionRule } from './custom_promotion_rules'
import type { SkuList } from './sku_lists'
import type { Coupon } from './coupons'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag } from './tags'
import type { Version } from './versions'
import type { Sku } from './skus'


type BuyXPayYPromotionRel = ResourceRel & { type: typeof BuyXPayYPromotions.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type OrderAmountPromotionRuleRel = ResourceRel & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceRel & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceRel & { type: 'coupon_codes_promotion_rules' }
type CustomPromotionRuleRel = ResourceRel & { type: 'custom_promotion_rules' }
type SkuListRel = ResourceRel & { type: 'sku_lists' }
type TagRel = ResourceRel & { type: 'tags' }


interface BuyXPayYPromotion extends Resource {
	
	name?: string
	currency_code?: string
	exclusive?: boolean
	priority?: number
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	total_usage_count?: number
	active?: boolean
	disabled_at?: string
	x?: number
	y?: number
	cheapest_free?: boolean

	market?: Market
	promotion_rules?: PromotionRule[]
	order_amount_promotion_rule?: OrderAmountPromotionRule
	sku_list_promotion_rule?: SkuListPromotionRule
	coupon_codes_promotion_rule?: CouponCodesPromotionRule
	custom_promotion_rule?: CustomPromotionRule
	sku_list?: SkuList
	coupons?: Coupon[]
	attachments?: Attachment[]
	events?: Event[]
	tags?: Tag[]
	versions?: Version[]
	skus?: Sku[]

}


interface BuyXPayYPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string
	exclusive?: boolean
	priority?: number
	starts_at: string
	expires_at: string
	total_usage_limit?: number
	_disable?: boolean
	_enable?: boolean
	x: number
	y: number
	cheapest_free?: boolean

	market?: MarketRel
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	custom_promotion_rule?: CustomPromotionRuleRel
	sku_list: SkuListRel
	tags?: TagRel[]

}


interface BuyXPayYPromotionUpdate extends ResourceUpdate {
	
	name?: string
	currency_code?: string
	exclusive?: boolean
	priority?: number
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	_disable?: boolean
	_enable?: boolean
	x?: number
	y?: number
	cheapest_free?: boolean

	market?: MarketRel
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	custom_promotion_rule?: CustomPromotionRuleRel
	sku_list?: SkuListRel
	tags?: TagRel[]

}


class BuyXPayYPromotions extends ApiResource {

	static readonly TYPE: 'buy_x_pay_y_promotions' = 'buy_x_pay_y_promotions' as const
	// static readonly PATH = 'buy_x_pay_y_promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BuyXPayYPromotion>> {
		return this.resources.list<BuyXPayYPromotion>({ type: BuyXPayYPromotions.TYPE }, params, options)
	}

	async create(resource: BuyXPayYPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BuyXPayYPromotion> {
		return this.resources.create<BuyXPayYPromotionCreate, BuyXPayYPromotion>({ ...resource, type: BuyXPayYPromotions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BuyXPayYPromotion> {
		return this.resources.retrieve<BuyXPayYPromotion>({ type: BuyXPayYPromotions.TYPE, id }, params, options)
	}

	async update(resource: BuyXPayYPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BuyXPayYPromotion> {
		return this.resources.update<BuyXPayYPromotionUpdate, BuyXPayYPromotion>({ ...resource, type: BuyXPayYPromotions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: BuyXPayYPromotions.TYPE, id }, options)
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

	async custom_promotion_rule(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async sku_list(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async coupons(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isBuyXPayYPromotion(resource: any): resource is BuyXPayYPromotion {
		return resource.type && (resource.type === BuyXPayYPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): BuyXPayYPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: BuyXPayYPromotions.TYPE } : { id: id.id, type: BuyXPayYPromotions.TYPE }
	}


	type(): string {
		return BuyXPayYPromotions.TYPE
	}

}


export default BuyXPayYPromotions

export { BuyXPayYPromotion, BuyXPayYPromotionCreate, BuyXPayYPromotionUpdate }
