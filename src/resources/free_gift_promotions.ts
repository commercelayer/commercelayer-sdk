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


type FreeGiftPromotionRel = ResourceRel & { type: typeof FreeGiftPromotions.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type OrderAmountPromotionRuleRel = ResourceRel & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceRel & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceRel & { type: 'coupon_codes_promotion_rules' }
type CustomPromotionRuleRel = ResourceRel & { type: 'custom_promotion_rules' }
type SkuListRel = ResourceRel & { type: 'sku_lists' }
type TagRel = ResourceRel & { type: 'tags' }


interface FreeGiftPromotion extends Resource {
	
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
	max_quantity?: number

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


interface FreeGiftPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string
	exclusive?: boolean
	priority?: number
	starts_at: string
	expires_at: string
	total_usage_limit?: number
	_disable?: boolean
	_enable?: boolean
	max_quantity?: number

	market?: MarketRel
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	custom_promotion_rule?: CustomPromotionRuleRel
	sku_list: SkuListRel
	tags?: TagRel[]

}


interface FreeGiftPromotionUpdate extends ResourceUpdate {
	
	name?: string
	currency_code?: string
	exclusive?: boolean
	priority?: number
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	_disable?: boolean
	_enable?: boolean
	max_quantity?: number

	market?: MarketRel
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	custom_promotion_rule?: CustomPromotionRuleRel
	sku_list?: SkuListRel
	tags?: TagRel[]

}


class FreeGiftPromotions extends ApiResource {

	static readonly TYPE: 'free_gift_promotions' = 'free_gift_promotions' as const
	// static readonly PATH = 'free_gift_promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<FreeGiftPromotion>> {
		return this.resources.list<FreeGiftPromotion>({ type: FreeGiftPromotions.TYPE }, params, options)
	}

	async create(resource: FreeGiftPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.create<FreeGiftPromotionCreate, FreeGiftPromotion>({ ...resource, type: FreeGiftPromotions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.retrieve<FreeGiftPromotion>({ type: FreeGiftPromotions.TYPE, id }, params, options)
	}

	async update(resource: FreeGiftPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.update<FreeGiftPromotionUpdate, FreeGiftPromotion>({ ...resource, type: FreeGiftPromotions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: FreeGiftPromotions.TYPE, id }, options)
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isFreeGiftPromotion(resource: any): resource is FreeGiftPromotion {
		return resource.type && (resource.type === FreeGiftPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FreeGiftPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: FreeGiftPromotions.TYPE } : { id: id.id, type: FreeGiftPromotions.TYPE }
	}


	type(): string {
		return FreeGiftPromotions.TYPE
	}

}


export default FreeGiftPromotions

export { FreeGiftPromotion, FreeGiftPromotionCreate, FreeGiftPromotionUpdate }
