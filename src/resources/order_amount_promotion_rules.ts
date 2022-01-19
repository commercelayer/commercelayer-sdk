import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { PercentageDiscountPromotion } from './percentage_discount_promotions'
import { FreeShippingPromotion } from './free_shipping_promotions'
import { FixedAmountPromotion } from './fixed_amount_promotions'
import { FreeGiftPromotion } from './free_gift_promotions'
import { FixedPricePromotion } from './fixed_price_promotions'
import { ExternalPromotion } from './external_promotions'


type OrderAmountPromotionRuleRel = ResourceRel & { type: typeof OrderAmountPromotionRules.TYPE }
type PercentageDiscountPromotionRel = ResourceRel & { type: 'percentage_discount_promotions' }
type FreeShippingPromotionRel = ResourceRel & { type: 'free_shipping_promotions' }
type FixedAmountPromotionRel = ResourceRel & { type: 'fixed_amount_promotions' }
type FreeGiftPromotionRel = ResourceRel & { type: 'free_gift_promotions' }
type FixedPricePromotionRel = ResourceRel & { type: 'fixed_price_promotions' }
type ExternalPromotionRel = ResourceRel & { type: 'external_promotions' }


interface OrderAmountPromotionRule extends Resource {
	
	order_amount_cents?: number
	order_amount_float?: number
	formatted_order_amount?: string

	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FixedAmountPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion

}


interface OrderAmountPromotionRuleCreate extends ResourceCreate {
	
	order_amount_cents?: number

	promotion: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel

}


interface OrderAmountPromotionRuleUpdate extends ResourceUpdate {
	
	order_amount_cents?: number

	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel

}


class OrderAmountPromotionRules extends ApiResource {

	static readonly TYPE: 'order_amount_promotion_rules' = 'order_amount_promotion_rules'
	// static readonly PATH = 'order_amount_promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderAmountPromotionRule>> {
		return this.resources.list({ type: OrderAmountPromotionRules.TYPE }, params, options)
	}

	async create(resource: OrderAmountPromotionRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		return this.resources.create({ ...resource, type: OrderAmountPromotionRules.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		return this.resources.retrieve<OrderAmountPromotionRule>({ type: OrderAmountPromotionRules.TYPE, id }, params, options)
	}

	async update(resource: OrderAmountPromotionRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		return this.resources.update({ ...resource, type: OrderAmountPromotionRules.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: OrderAmountPromotionRules.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isOrderAmountPromotionRule(resource: any): resource is OrderAmountPromotionRule {
		return resource.type && (resource.type === OrderAmountPromotionRules.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderAmountPromotionRuleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: OrderAmountPromotionRules.TYPE } : { id: id.id, type: OrderAmountPromotionRules.TYPE }
	}


	type(): string {
		return OrderAmountPromotionRules.TYPE
	}

}


export default OrderAmountPromotionRules

export { OrderAmountPromotionRule, OrderAmountPromotionRuleCreate, OrderAmountPromotionRuleUpdate }
