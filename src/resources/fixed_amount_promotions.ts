import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { PromotionRule } from './promotion_rules'
import type { OrderAmountPromotionRule } from './order_amount_promotion_rules'
import type { SkuListPromotionRule } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'
import type { Attachment } from './attachments'


type FixedAmountPromotionRel = ResourceRel & { type: typeof FixedAmountPromotions.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type PromotionRuleRel = ResourceRel & { type: 'promotion_rules' }
type OrderAmountPromotionRuleRel = ResourceRel & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceRel & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceRel & { type: 'coupon_codes_promotion_rules' }


interface FixedAmountPromotion extends Resource {
	
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

}


interface FixedAmountPromotionCreate extends ResourceCreate {
	
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

}


interface FixedAmountPromotionUpdate extends ResourceUpdate {
	
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

}


class FixedAmountPromotions extends ApiResource {

	static readonly TYPE: 'fixed_amount_promotions' = 'fixed_amount_promotions' as const
	// static readonly PATH = 'fixed_amount_promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<FixedAmountPromotion>> {
		return this.resources.list<FixedAmountPromotion>({ type: FixedAmountPromotions.TYPE }, params, options)
	}

	async create(resource: FixedAmountPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.create<FixedAmountPromotionCreate, FixedAmountPromotion>({ ...resource, type: FixedAmountPromotions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.retrieve<FixedAmountPromotion>({ type: FixedAmountPromotions.TYPE, id }, params, options)
	}

	async update(resource: FixedAmountPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.update<FixedAmountPromotionUpdate, FixedAmountPromotion>({ ...resource, type: FixedAmountPromotions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: FixedAmountPromotions.TYPE, id }, options)
	}

	async market(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId
		return this.resources.fetch<Market>({ type: 'markets' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async attachments(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isFixedAmountPromotion(resource: any): resource is FixedAmountPromotion {
		return resource.type && (resource.type === FixedAmountPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FixedAmountPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: FixedAmountPromotions.TYPE } : { id: id.id, type: FixedAmountPromotions.TYPE }
	}


	type(): string {
		return FixedAmountPromotions.TYPE
	}

}


export default FixedAmountPromotions

export { FixedAmountPromotion, FixedAmountPromotionCreate, FixedAmountPromotionUpdate }
