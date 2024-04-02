import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PercentageDiscountPromotion, PercentageDiscountPromotionType } from './percentage_discount_promotions'
import type { FreeShippingPromotion, FreeShippingPromotionType } from './free_shipping_promotions'
import type { BuyXPayYPromotion, BuyXPayYPromotionType } from './buy_x_pay_y_promotions'
import type { FreeGiftPromotion, FreeGiftPromotionType } from './free_gift_promotions'
import type { FixedPricePromotion, FixedPricePromotionType } from './fixed_price_promotions'
import type { ExternalPromotion, ExternalPromotionType } from './external_promotions'
import type { FixedAmountPromotion, FixedAmountPromotionType } from './fixed_amount_promotions'
import type { Version } from './versions'
import type { SkuList, SkuListType } from './sku_lists'
import type { Sku } from './skus'


type SkuListPromotionRuleType = 'sku_list_promotion_rules'
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type PercentageDiscountPromotionRel = ResourceRel & { type: PercentageDiscountPromotionType }
type FreeShippingPromotionRel = ResourceRel & { type: FreeShippingPromotionType }
type BuyXPayYPromotionRel = ResourceRel & { type: BuyXPayYPromotionType }
type FreeGiftPromotionRel = ResourceRel & { type: FreeGiftPromotionType }
type FixedPricePromotionRel = ResourceRel & { type: FixedPricePromotionType }
type ExternalPromotionRel = ResourceRel & { type: ExternalPromotionType }
type FixedAmountPromotionRel = ResourceRel & { type: FixedAmountPromotionType }
type SkuListRel = ResourceRel & { type: SkuListType }


export type SkuListPromotionRuleSort = Pick<SkuListPromotionRule, 'id'> & ResourceSort
// export type SkuListPromotionRuleFilter = Pick<SkuListPromotionRule, 'id'> & ResourceFilter


interface SkuListPromotionRule extends Resource {
	
	readonly type: SkuListPromotionRuleType

	all_skus?: boolean | null
	min_quantity?: number | null

	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | BuyXPayYPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion | FixedAmountPromotion | null
	versions?: Version[] | null
	sku_list?: SkuList | null
	skus?: Sku[] | null

}


interface SkuListPromotionRuleCreate extends ResourceCreate {
	
	all_skus?: boolean | null
	min_quantity?: number | null

	promotion: PercentageDiscountPromotionRel | FreeShippingPromotionRel | BuyXPayYPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel
	sku_list?: SkuListRel | null

}


interface SkuListPromotionRuleUpdate extends ResourceUpdate {
	
	all_skus?: boolean | null
	min_quantity?: number | null

	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | BuyXPayYPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel | null
	sku_list?: SkuListRel | null

}


class SkuListPromotionRules extends ApiResource<SkuListPromotionRule> {

	static readonly TYPE: SkuListPromotionRuleType = 'sku_list_promotion_rules' as const

	async create(resource: SkuListPromotionRuleCreate, params?: QueryParamsRetrieve<SkuListPromotionRule>, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		return this.resources.create<SkuListPromotionRuleCreate, SkuListPromotionRule>({ ...resource, type: SkuListPromotionRules.TYPE }, params, options)
	}

	async update(resource: SkuListPromotionRuleUpdate, params?: QueryParamsRetrieve<SkuListPromotionRule>, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		return this.resources.update<SkuListPromotionRuleUpdate, SkuListPromotionRule>({ ...resource, type: SkuListPromotionRules.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: SkuListPromotionRules.TYPE } : id, options)
	}

	async versions(skuListPromotionRuleId: string | SkuListPromotionRule, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _skuListPromotionRuleId = (skuListPromotionRuleId as SkuListPromotionRule).id || skuListPromotionRuleId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `sku_list_promotion_rules/${_skuListPromotionRuleId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async sku_list(skuListPromotionRuleId: string | SkuListPromotionRule, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		const _skuListPromotionRuleId = (skuListPromotionRuleId as SkuListPromotionRule).id || skuListPromotionRuleId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `sku_list_promotion_rules/${_skuListPromotionRuleId}/sku_list`, params, options) as unknown as SkuList
	}

	async skus(skuListPromotionRuleId: string | SkuListPromotionRule, params?: QueryParamsList<Sku>, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _skuListPromotionRuleId = (skuListPromotionRuleId as SkuListPromotionRule).id || skuListPromotionRuleId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `sku_list_promotion_rules/${_skuListPromotionRuleId}/skus`, params, options) as unknown as ListResponse<Sku>
	}


	isSkuListPromotionRule(resource: any): resource is SkuListPromotionRule {
		return resource.type && (resource.type === SkuListPromotionRules.TYPE)
	}


	relationship(id: string | ResourceId | null): SkuListPromotionRuleRel {
		return super.relationshipOneToOne<SkuListPromotionRuleRel>(id)
	}

	relationshipToMany(...ids: string[]): SkuListPromotionRuleRel[] {
		return super.relationshipOneToMany<SkuListPromotionRuleRel>(...ids)
	}


	type(): SkuListPromotionRuleType {
		return SkuListPromotionRules.TYPE
	}

}


export default SkuListPromotionRules

export type { SkuListPromotionRule, SkuListPromotionRuleCreate, SkuListPromotionRuleUpdate, SkuListPromotionRuleType }
