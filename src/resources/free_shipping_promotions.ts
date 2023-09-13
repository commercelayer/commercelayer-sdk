import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { PromotionRule } from './promotion_rules'
import type { OrderAmountPromotionRule } from './order_amount_promotion_rules'
import type { SkuListPromotionRule } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'
import type { Coupon } from './coupons'
import type { SkuList } from './sku_lists'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag } from './tags'
import type { Version } from './versions'


type FreeShippingPromotionRel = ResourceRel & { type: typeof FreeShippingPromotions.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type PromotionRuleRel = ResourceRel & { type: 'promotion_rules' }
type OrderAmountPromotionRuleRel = ResourceRel & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceRel & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceRel & { type: 'coupon_codes_promotion_rules' }
type CouponRel = ResourceRel & { type: 'coupons' }
type TagRel = ResourceRel & { type: 'tags' }


interface FreeShippingPromotion extends Resource {
	
	name?: string
	currency_code?: string
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	total_usage_count?: number
	active?: boolean

	market?: Market
	promotion_rules?: PromotionRule[]
	order_amount_promotion_rule?: OrderAmountPromotionRule
	sku_list_promotion_rule?: SkuListPromotionRule
	coupon_codes_promotion_rule?: CouponCodesPromotionRule
	coupons?: Coupon[]
	sku_list?: SkuList
	attachments?: Attachment[]
	events?: Event[]
	tags?: Tag[]
	versions?: Version[]

}


interface FreeShippingPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string
	starts_at: string
	expires_at: string
	total_usage_limit: number

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	coupons?: CouponRel[]
	tags?: TagRel[]

}


interface FreeShippingPromotionUpdate extends ResourceUpdate {
	
	name?: string
	currency_code?: string
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	coupons?: CouponRel[]
	tags?: TagRel[]

}


class FreeShippingPromotions extends ApiResource {

	static readonly TYPE: 'free_shipping_promotions' = 'free_shipping_promotions' as const
	// static readonly PATH = 'free_shipping_promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<FreeShippingPromotion>> {
		return this.resources.list<FreeShippingPromotion>({ type: FreeShippingPromotions.TYPE }, params, options)
	}

	async create(resource: FreeShippingPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.create<FreeShippingPromotionCreate, FreeShippingPromotion>({ ...resource, type: FreeShippingPromotions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.retrieve<FreeShippingPromotion>({ type: FreeShippingPromotions.TYPE, id }, params, options)
	}

	async update(resource: FreeShippingPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.update<FreeShippingPromotionUpdate, FreeShippingPromotion>({ ...resource, type: FreeShippingPromotions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: FreeShippingPromotions.TYPE, id }, options)
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isFreeShippingPromotion(resource: any): resource is FreeShippingPromotion {
		return resource.type && (resource.type === FreeShippingPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FreeShippingPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: FreeShippingPromotions.TYPE } : { id: id.id, type: FreeShippingPromotions.TYPE }
	}


	type(): string {
		return FreeShippingPromotions.TYPE
	}

}


export default FreeShippingPromotions

export { FreeShippingPromotion, FreeShippingPromotionCreate, FreeShippingPromotionUpdate }
