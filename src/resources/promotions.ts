import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { PromotionRule } from './promotion_rules'
import type { OrderAmountPromotionRule } from './order_amount_promotion_rules'
import type { SkuListPromotionRule } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'
import type { Attachment } from './attachments'


type PromotionRel = ResourceRel & { type: typeof Promotions.TYPE }


interface Promotion extends Resource {
	
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
	attachments?: Attachment[]

}


class Promotions extends ApiResource {

	static readonly TYPE: 'promotions' = 'promotions'
	// static readonly PATH = 'promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Promotion>> {
		return this.resources.list<Promotion>({ type: Promotions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Promotion> {
		return this.resources.retrieve<Promotion>({ type: Promotions.TYPE, id }, params, options)
	}

	async market(promotionId: string | Promotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _promotionId = (promotionId as Promotion).id || promotionId
		return this.resources.fetch<Market>({ type: 'markets' }, `promotions/${_promotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(promotionId: string | Promotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _promotionId = (promotionId as Promotion).id || promotionId
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `promotions/${_promotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(promotionId: string | Promotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _promotionId = (promotionId as Promotion).id || promotionId
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `promotions/${_promotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(promotionId: string | Promotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _promotionId = (promotionId as Promotion).id || promotionId
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `promotions/${_promotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async attachments(promotionId: string | Promotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _promotionId = (promotionId as Promotion).id || promotionId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `promotions/${_promotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPromotion(resource: any): resource is Promotion {
		return resource.type && (resource.type === Promotions.TYPE)
	}


	relationship(id: string | ResourceId | null): PromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Promotions.TYPE } : { id: id.id, type: Promotions.TYPE }
	}


	type(): string {
		return Promotions.TYPE
	}

}


export default Promotions

export { Promotion }
