import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PercentageDiscountPromotion, PercentageDiscountPromotionType } from './percentage_discount_promotions'
import type { FreeShippingPromotion, FreeShippingPromotionType } from './free_shipping_promotions'
import type { FreeGiftPromotion, FreeGiftPromotionType } from './free_gift_promotions'
import type { FixedPricePromotion, FixedPricePromotionType } from './fixed_price_promotions'
import type { ExternalPromotion, ExternalPromotionType } from './external_promotions'
import type { FixedAmountPromotion, FixedAmountPromotionType } from './fixed_amount_promotions'
import type { SkuList, SkuListType } from './sku_lists'
import type { Sku } from './skus'


type SkuListPromotionRuleType = 'sku_list_promotion_rules'
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type PercentageDiscountPromotionRel = ResourceRel & { type: PercentageDiscountPromotionType }
type FreeShippingPromotionRel = ResourceRel & { type: FreeShippingPromotionType }
type FreeGiftPromotionRel = ResourceRel & { type: FreeGiftPromotionType }
type FixedPricePromotionRel = ResourceRel & { type: FixedPricePromotionType }
type ExternalPromotionRel = ResourceRel & { type: ExternalPromotionType }
type FixedAmountPromotionRel = ResourceRel & { type: FixedAmountPromotionType }
type SkuListRel = ResourceRel & { type: SkuListType }


interface SkuListPromotionRule extends Resource {
	
	readonly type: SkuListPromotionRuleType

	all_skus?: boolean
	min_quantity?: number

	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion | FixedAmountPromotion
	sku_list?: SkuList
	skus?: Sku[]

}


interface SkuListPromotionRuleCreate extends ResourceCreate {
	
	all_skus?: boolean
	min_quantity?: number

	promotion: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel
	sku_list?: SkuListRel

}


interface SkuListPromotionRuleUpdate extends ResourceUpdate {
	
	all_skus?: boolean
	min_quantity?: number

	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel
	sku_list?: SkuListRel

}


class SkuListPromotionRules extends ApiResource<SkuListPromotionRule> {

	static readonly TYPE: SkuListPromotionRuleType = 'sku_list_promotion_rules' as const

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuListPromotionRule>> {
		return this.resources.list<SkuListPromotionRule>({ type: SkuListPromotionRules.TYPE }, params, options)
	}

	async create(resource: SkuListPromotionRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		return this.resources.create<SkuListPromotionRuleCreate, SkuListPromotionRule>({ ...resource, type: SkuListPromotionRules.TYPE }, params, options)
	}

	async update(resource: SkuListPromotionRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		return this.resources.update<SkuListPromotionRuleUpdate, SkuListPromotionRule>({ ...resource, type: SkuListPromotionRules.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: SkuListPromotionRules.TYPE } : id, options)
	}

	async sku_list(skuListPromotionRuleId: string | SkuListPromotionRule, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _skuListPromotionRuleId = (skuListPromotionRuleId as SkuListPromotionRule).id || skuListPromotionRuleId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `sku_list_promotion_rules/${_skuListPromotionRuleId}/sku_list`, params, options) as unknown as SkuList
	}

	async skus(skuListPromotionRuleId: string | SkuListPromotionRule, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _skuListPromotionRuleId = (skuListPromotionRuleId as SkuListPromotionRule).id || skuListPromotionRuleId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `sku_list_promotion_rules/${_skuListPromotionRuleId}/skus`, params, options) as unknown as ListResponse<Sku>
	}


	isSkuListPromotionRule(resource: any): resource is SkuListPromotionRule {
		return resource.type && (resource.type === SkuListPromotionRules.TYPE)
	}


	relationship(id: string | ResourceId | null): SkuListPromotionRuleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: SkuListPromotionRules.TYPE } : { id: id.id, type: SkuListPromotionRules.TYPE }
	}


	type(): SkuListPromotionRuleType {
		return SkuListPromotionRules.TYPE
	}

}


export default SkuListPromotionRules

export type { SkuListPromotionRule, SkuListPromotionRuleCreate, SkuListPromotionRuleUpdate, SkuListPromotionRuleType }
