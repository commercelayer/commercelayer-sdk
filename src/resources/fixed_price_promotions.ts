import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { PromotionRule } from './promotion_rules'
import { OrderAmountPromotionRule } from './order_amount_promotion_rules'
import { SkuListPromotionRule } from './sku_list_promotion_rules'
import { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'
import { Attachment } from './attachments'
import { SkuList } from './sku_lists'
import { Sku } from './skus'


type FixedPricePromotionRel = ResourceRel & { type: typeof FixedPricePromotions.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type PromotionRuleRel = ResourceRel & { type: 'promotion_rules' }
type OrderAmountPromotionRuleRel = ResourceRel & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceRel & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceRel & { type: 'coupon_codes_promotion_rules' }
type SkuListRel = ResourceRel & { type: 'sku_lists' }


interface FixedPricePromotion extends Resource {
	
	name?: string
	currency_code?: string
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	total_usage_count?: number
	active?: boolean
	fixed_amount_cents?: number
	fixed_amount_float?: number
	formatted_fixed_amount?: string

	market?: Market
	promotion_rules?: PromotionRule[]
	order_amount_promotion_rule?: OrderAmountPromotionRule
	sku_list_promotion_rule?: SkuListPromotionRule
	coupon_codes_promotion_rule?: CouponCodesPromotionRule
	attachments?: Attachment[]
	sku_list?: SkuList
	skus?: Sku[]

}


interface FixedPricePromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string
	starts_at: string
	expires_at: string
	total_usage_limit: number
	fixed_amount_cents: number

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	sku_list: SkuListRel

}


interface FixedPricePromotionUpdate extends ResourceUpdate {
	
	name?: string
	currency_code?: string
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	fixed_amount_cents?: number

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	sku_list?: SkuListRel

}


class FixedPricePromotions extends ApiResource {

	static readonly TYPE: 'fixed_price_promotions' = 'fixed_price_promotions'
	// static readonly PATH = 'fixed_price_promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<FixedPricePromotion>> {
		return this.resources.list<FixedPricePromotion>({ type: FixedPricePromotions.TYPE }, params, options)
	}

	async create(resource: FixedPricePromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.create({ ...resource, type: FixedPricePromotions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.retrieve<FixedPricePromotion>({ type: FixedPricePromotions.TYPE, id }, params, options)
	}

	async update(resource: FixedPricePromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.update({ ...resource, type: FixedPricePromotions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: FixedPricePromotions.TYPE, id }, options)
	}

	async market(fixedPricePromotionId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		return this.resources.fetch<Market>({ type: 'markets' }, `fixed_price_promotions/${fixedPricePromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(fixedPricePromotionId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `fixed_price_promotions/${fixedPricePromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(fixedPricePromotionId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `fixed_price_promotions/${fixedPricePromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(fixedPricePromotionId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `fixed_price_promotions/${fixedPricePromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async attachments(fixedPricePromotionId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `fixed_price_promotions/${fixedPricePromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async sku_list(fixedPricePromotionId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `fixed_price_promotions/${fixedPricePromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async skus(fixedPricePromotionId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		return this.resources.fetch<Sku>({ type: 'skus' }, `fixed_price_promotions/${fixedPricePromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
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
