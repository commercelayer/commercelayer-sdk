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


type PercentageDiscountPromotionRel = ResourceRel & { type: typeof PercentageDiscountPromotions.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type OrderAmountPromotionRuleRel = ResourceRel & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceRel & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceRel & { type: 'coupon_codes_promotion_rules' }
type CustomPromotionRuleRel = ResourceRel & { type: 'custom_promotion_rules' }
type SkuListRel = ResourceRel & { type: 'sku_lists' }
type TagRel = ResourceRel & { type: 'tags' }


interface PercentageDiscountPromotion extends Resource {
	
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
	percentage?: number

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


interface PercentageDiscountPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string
	exclusive?: boolean
	priority?: number
	starts_at: string
	expires_at: string
	total_usage_limit?: number
	_disable?: boolean
	_enable?: boolean
	percentage: number

	market?: MarketRel
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	custom_promotion_rule?: CustomPromotionRuleRel
	sku_list?: SkuListRel
	tags?: TagRel[]

}


interface PercentageDiscountPromotionUpdate extends ResourceUpdate {
	
	name?: string
	currency_code?: string
	exclusive?: boolean
	priority?: number
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	_disable?: boolean
	_enable?: boolean
	percentage?: number

	market?: MarketRel
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	custom_promotion_rule?: CustomPromotionRuleRel
	sku_list?: SkuListRel
	tags?: TagRel[]

}


class PercentageDiscountPromotions extends ApiResource {

	static readonly TYPE: 'percentage_discount_promotions' = 'percentage_discount_promotions' as const
	// static readonly PATH = 'percentage_discount_promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PercentageDiscountPromotion>> {
		return this.resources.list<PercentageDiscountPromotion>({ type: PercentageDiscountPromotions.TYPE }, params, options)
	}

	async create(resource: PercentageDiscountPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PercentageDiscountPromotion> {
		return this.resources.create<PercentageDiscountPromotionCreate, PercentageDiscountPromotion>({ ...resource, type: PercentageDiscountPromotions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PercentageDiscountPromotion> {
		return this.resources.retrieve<PercentageDiscountPromotion>({ type: PercentageDiscountPromotions.TYPE, id }, params, options)
	}

	async update(resource: PercentageDiscountPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PercentageDiscountPromotion> {
		return this.resources.update<PercentageDiscountPromotionUpdate, PercentageDiscountPromotion>({ ...resource, type: PercentageDiscountPromotions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: PercentageDiscountPromotions.TYPE, id }, options)
	}

	async market(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async custom_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async sku_list(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async coupons(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async attachments(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async skus(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPercentageDiscountPromotion(resource: any): resource is PercentageDiscountPromotion {
		return resource.type && (resource.type === PercentageDiscountPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): PercentageDiscountPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PercentageDiscountPromotions.TYPE } : { id: id.id, type: PercentageDiscountPromotions.TYPE }
	}


	type(): string {
		return PercentageDiscountPromotions.TYPE
	}

}


export default PercentageDiscountPromotions

export { PercentageDiscountPromotion, PercentageDiscountPromotionCreate, PercentageDiscountPromotionUpdate }
