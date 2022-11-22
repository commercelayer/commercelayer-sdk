import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { PercentageDiscountPromotion } from './percentage_discount_promotions'
import type { FreeShippingPromotion } from './free_shipping_promotions'
import type { FixedAmountPromotion } from './fixed_amount_promotions'
import type { FreeGiftPromotion } from './free_gift_promotions'
import type { FixedPricePromotion } from './fixed_price_promotions'
import type { ExternalPromotion } from './external_promotions'
import type { SkuList } from './sku_lists'
import type { Sku } from './skus'


type SkuListPromotionRuleRel = ResourceRel & { type: typeof SkuListPromotionRules.TYPE }
type PercentageDiscountPromotionRel = ResourceRel & { type: 'percentage_discount_promotions' }
type FreeShippingPromotionRel = ResourceRel & { type: 'free_shipping_promotions' }
type FixedAmountPromotionRel = ResourceRel & { type: 'fixed_amount_promotions' }
type FreeGiftPromotionRel = ResourceRel & { type: 'free_gift_promotions' }
type FixedPricePromotionRel = ResourceRel & { type: 'fixed_price_promotions' }
type ExternalPromotionRel = ResourceRel & { type: 'external_promotions' }
type SkuListRel = ResourceRel & { type: 'sku_lists' }


interface SkuListPromotionRule extends Resource {
	
	all_skus?: boolean
	min_quantity?: number

	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FixedAmountPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion
	sku_list?: SkuList
	skus?: Sku[]

}


interface SkuListPromotionRuleCreate extends ResourceCreate {
	
	all_skus?: boolean
	min_quantity?: number

	promotion: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel
	sku_list?: SkuListRel

}


interface SkuListPromotionRuleUpdate extends ResourceUpdate {
	
	all_skus?: boolean
	min_quantity?: number

	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel
	sku_list?: SkuListRel

}


class SkuListPromotionRules extends ApiResource {

	static readonly TYPE: 'sku_list_promotion_rules' = 'sku_list_promotion_rules' as const
	// static readonly PATH = 'sku_list_promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuListPromotionRule>> {
		return this.resources.list<SkuListPromotionRule>({ type: SkuListPromotionRules.TYPE }, params, options)
	}

	async create(resource: SkuListPromotionRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		return this.resources.create<SkuListPromotionRuleCreate, SkuListPromotionRule>({ ...resource, type: SkuListPromotionRules.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		return this.resources.retrieve<SkuListPromotionRule>({ type: SkuListPromotionRules.TYPE, id }, params, options)
	}

	async update(resource: SkuListPromotionRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		return this.resources.update<SkuListPromotionRuleUpdate, SkuListPromotionRule>({ ...resource, type: SkuListPromotionRules.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: SkuListPromotionRules.TYPE, id }, options)
	}

	async sku_list(skuListPromotionRuleId: string | SkuListPromotionRule, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _skuListPromotionRuleId = (skuListPromotionRuleId as SkuListPromotionRule).id || skuListPromotionRuleId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `sku_list_promotion_rules/${_skuListPromotionRuleId}/sku_list`, params, options) as unknown as SkuList
	}

	async skus(skuListPromotionRuleId: string | SkuListPromotionRule, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _skuListPromotionRuleId = (skuListPromotionRuleId as SkuListPromotionRule).id || skuListPromotionRuleId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `sku_list_promotion_rules/${_skuListPromotionRuleId}/skus`, params, options) as unknown as ListResponse<Sku>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isSkuListPromotionRule(resource: any): resource is SkuListPromotionRule {
		return resource.type && (resource.type === SkuListPromotionRules.TYPE)
	}


	relationship(id: string | ResourceId | null): SkuListPromotionRuleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: SkuListPromotionRules.TYPE } : { id: id.id, type: SkuListPromotionRules.TYPE }
	}


	type(): string {
		return SkuListPromotionRules.TYPE
	}

}


export default SkuListPromotionRules

export { SkuListPromotionRule, SkuListPromotionRuleCreate, SkuListPromotionRuleUpdate }
