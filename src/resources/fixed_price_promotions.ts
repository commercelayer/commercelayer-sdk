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


type FixedPricePromotionRel = ResourceRel & { type: typeof FixedPricePromotions.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type OrderAmountPromotionRuleRel = ResourceRel & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceRel & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceRel & { type: 'coupon_codes_promotion_rules' }
type CustomPromotionRuleRel = ResourceRel & { type: 'custom_promotion_rules' }
type SkuListRel = ResourceRel & { type: 'sku_lists' }
type TagRel = ResourceRel & { type: 'tags' }


interface FixedPricePromotion extends Resource {
	
	name?: string
	currency_code?: string
	exclusive?: boolean
	priority?: number
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	total_usage_count?: number
	active?: boolean
	status?: string
	disabled_at?: string
	fixed_amount_cents?: number
	fixed_amount_float?: number
	formatted_fixed_amount?: string

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


interface FixedPricePromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string
	exclusive?: boolean
	priority?: number
	starts_at: string
	expires_at: string
	total_usage_limit?: number
	_disable?: boolean
	_enable?: boolean
	fixed_amount_cents: number

	market?: MarketRel
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	custom_promotion_rule?: CustomPromotionRuleRel
	sku_list: SkuListRel
	tags?: TagRel[]

}


interface FixedPricePromotionUpdate extends ResourceUpdate {
	
	name?: string
	currency_code?: string
	exclusive?: boolean
	priority?: number
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	_disable?: boolean
	_enable?: boolean
	fixed_amount_cents?: number

	market?: MarketRel
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	custom_promotion_rule?: CustomPromotionRuleRel
	sku_list?: SkuListRel
	tags?: TagRel[]

}


class FixedPricePromotions extends ApiResource {

	static readonly TYPE: 'fixed_price_promotions' = 'fixed_price_promotions' as const
	// static readonly PATH = 'fixed_price_promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<FixedPricePromotion>> {
		return this.resources.list<FixedPricePromotion>({ type: FixedPricePromotions.TYPE }, params, options)
	}

	async create(resource: FixedPricePromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.create<FixedPricePromotionCreate, FixedPricePromotion>({ ...resource, type: FixedPricePromotions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.retrieve<FixedPricePromotion>({ type: FixedPricePromotions.TYPE, id }, params, options)
	}

	async update(resource: FixedPricePromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.update<FixedPricePromotionUpdate, FixedPricePromotion>({ ...resource, type: FixedPricePromotions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: FixedPricePromotions.TYPE, id }, options)
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

	async custom_promotion_rule(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `fixed_price_promotions/${_fixedPricePromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async sku_list(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `fixed_price_promotions/${_fixedPricePromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async coupons(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `fixed_price_promotions/${_fixedPricePromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isFixedPricePromotion(resource: any): resource is FixedPricePromotion {
		return resource.type && (resource.type === FixedPricePromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FixedPricePromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: FixedPricePromotions.TYPE } : { id: id.id, type: FixedPricePromotions.TYPE }
	}


	type(): string {
		return FixedPricePromotions.TYPE
	}

}


export default FixedPricePromotions

export { FixedPricePromotion, FixedPricePromotionCreate, FixedPricePromotionUpdate }
