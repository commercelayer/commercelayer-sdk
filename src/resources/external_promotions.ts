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
import type { Sku } from './skus'


type ExternalPromotionRel = ResourceRel & { type: typeof ExternalPromotions.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type PromotionRuleRel = ResourceRel & { type: 'promotion_rules' }
type OrderAmountPromotionRuleRel = ResourceRel & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceRel & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceRel & { type: 'coupon_codes_promotion_rules' }
type CouponRel = ResourceRel & { type: 'coupons' }
type SkuListRel = ResourceRel & { type: 'sku_lists' }
type TagRel = ResourceRel & { type: 'tags' }


interface ExternalPromotion extends Resource {
	
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
	promotion_url?: string
	shared_secret?: string

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
	skus?: Sku[]

}


interface ExternalPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string
	exclusive?: boolean
	priority?: number
	starts_at: string
	expires_at: string
	total_usage_limit?: number
	_disable?: boolean
	_enable?: boolean
	promotion_url: string

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	coupons?: CouponRel[]
	sku_list?: SkuListRel
	tags?: TagRel[]

}


interface ExternalPromotionUpdate extends ResourceUpdate {
	
	name?: string
	currency_code?: string
	exclusive?: boolean
	priority?: number
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	_disable?: boolean
	_enable?: boolean
	promotion_url?: string

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	coupons?: CouponRel[]
	sku_list?: SkuListRel
	tags?: TagRel[]

}


class ExternalPromotions extends ApiResource {

	static readonly TYPE: 'external_promotions' = 'external_promotions' as const
	// static readonly PATH = 'external_promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalPromotion>> {
		return this.resources.list<ExternalPromotion>({ type: ExternalPromotions.TYPE }, params, options)
	}

	async create(resource: ExternalPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.create<ExternalPromotionCreate, ExternalPromotion>({ ...resource, type: ExternalPromotions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.retrieve<ExternalPromotion>({ type: ExternalPromotions.TYPE, id }, params, options)
	}

	async update(resource: ExternalPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.update<ExternalPromotionUpdate, ExternalPromotion>({ ...resource, type: ExternalPromotions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ExternalPromotions.TYPE, id }, options)
	}

	async market(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `external_promotions/${_externalPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `external_promotions/${_externalPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `external_promotions/${_externalPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `external_promotions/${_externalPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async coupons(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `external_promotions/${_externalPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async sku_list(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `external_promotions/${_externalPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async attachments(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `external_promotions/${_externalPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `external_promotions/${_externalPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `external_promotions/${_externalPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `external_promotions/${_externalPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async skus(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `external_promotions/${_externalPromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isExternalPromotion(resource: any): resource is ExternalPromotion {
		return resource.type && (resource.type === ExternalPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): ExternalPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ExternalPromotions.TYPE } : { id: id.id, type: ExternalPromotions.TYPE }
	}


	type(): string {
		return ExternalPromotions.TYPE
	}

}


export default ExternalPromotions

export { ExternalPromotion, ExternalPromotionCreate, ExternalPromotionUpdate }
