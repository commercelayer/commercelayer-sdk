import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PromotionRule } from './promotion_rules'
import type { OrderAmountPromotionRule, OrderAmountPromotionRuleType } from './order_amount_promotion_rules'
import type { SkuListPromotionRule, SkuListPromotionRuleType } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { CustomPromotionRule, CustomPromotionRuleType } from './custom_promotion_rules'
import type { SkuList, SkuListType } from './sku_lists'
import type { Coupon } from './coupons'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'
import type { Sku } from './skus'


type ExternalPromotionType = 'external_promotions'
type ExternalPromotionRel = ResourceRel & { type: ExternalPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CustomPromotionRuleRel = ResourceRel & { type: CustomPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


interface ExternalPromotion extends Resource {
	
	readonly type: ExternalPromotionType

	name: string
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at: string
	expires_at: string
	total_usage_limit?: number | null
	total_usage_count?: number | null
	active?: boolean | null
	status?: 'expired' | 'pending' | 'active' | 'inactive' | 'disabled' | null
	disabled_at?: string | null
	promotion_url: string
	circuit_state?: string | null
	circuit_failure_count?: number | null
	shared_secret: string

	market?: Market | null
	promotion_rules?: PromotionRule[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRule | null
	sku_list_promotion_rule?: SkuListPromotionRule | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRule | null
	custom_promotion_rule?: CustomPromotionRule | null
	sku_list?: SkuList | null
	coupons?: Coupon[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null
	skus?: Sku[] | null

}


interface ExternalPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at: string
	expires_at: string
	total_usage_limit?: number | null
	_disable?: boolean | null
	_enable?: boolean | null
	promotion_url: string

	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


interface ExternalPromotionUpdate extends ResourceUpdate {
	
	name?: string | null
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at?: string | null
	expires_at?: string | null
	total_usage_limit?: number | null
	_disable?: boolean | null
	_enable?: boolean | null
	promotion_url?: string | null
	_reset_circuit?: boolean | null

	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


class ExternalPromotions extends ApiResource<ExternalPromotion> {

	static readonly TYPE: ExternalPromotionType = 'external_promotions' as const

	async create(resource: ExternalPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.create<ExternalPromotionCreate, ExternalPromotion>({ ...resource, type: ExternalPromotions.TYPE }, params, options)
	}

	async update(resource: ExternalPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.update<ExternalPromotionUpdate, ExternalPromotion>({ ...resource, type: ExternalPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ExternalPromotions.TYPE } : id, options)
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

	async custom_promotion_rule(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `external_promotions/${_externalPromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async sku_list(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `external_promotions/${_externalPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async coupons(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `external_promotions/${_externalPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
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

	async _disable(id: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.update<ExternalPromotionUpdate, ExternalPromotion>({ id: (typeof id === 'string')? id: id.id, type: ExternalPromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.update<ExternalPromotionUpdate, ExternalPromotion>({ id: (typeof id === 'string')? id: id.id, type: ExternalPromotions.TYPE, _enable: true }, params, options)
	}

	async _reset_circuit(id: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.update<ExternalPromotionUpdate, ExternalPromotion>({ id: (typeof id === 'string')? id: id.id, type: ExternalPromotions.TYPE, _reset_circuit: true }, params, options)
	}


	isExternalPromotion(resource: any): resource is ExternalPromotion {
		return resource.type && (resource.type === ExternalPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): ExternalPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ExternalPromotions.TYPE } : { id: id.id, type: ExternalPromotions.TYPE }
	}


	type(): ExternalPromotionType {
		return ExternalPromotions.TYPE
	}

}


export default ExternalPromotions

export type { ExternalPromotion, ExternalPromotionCreate, ExternalPromotionUpdate, ExternalPromotionType }
