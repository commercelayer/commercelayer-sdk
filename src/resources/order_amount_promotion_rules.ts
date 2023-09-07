import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { PercentageDiscountPromotion } from './percentage_discount_promotions'
import type { FreeShippingPromotion } from './free_shipping_promotions'
import type { FreeGiftPromotion } from './free_gift_promotions'
import type { FixedPricePromotion } from './fixed_price_promotions'
import type { ExternalPromotion } from './external_promotions'
import type { FixedAmountPromotion } from './fixed_amount_promotions'
import type { Version } from './versions'


type OrderAmountPromotionRuleRel = ResourceRel & { type: typeof OrderAmountPromotionRules.TYPE }
type PercentageDiscountPromotionRel = ResourceRel & { type: 'percentage_discount_promotions' }
type FreeShippingPromotionRel = ResourceRel & { type: 'free_shipping_promotions' }
type FreeGiftPromotionRel = ResourceRel & { type: 'free_gift_promotions' }
type FixedPricePromotionRel = ResourceRel & { type: 'fixed_price_promotions' }
type ExternalPromotionRel = ResourceRel & { type: 'external_promotions' }
type FixedAmountPromotionRel = ResourceRel & { type: 'fixed_amount_promotions' }


interface OrderAmountPromotionRule extends Resource {
	
	order_amount_cents?: number
	order_amount_float?: number
	formatted_order_amount?: string
	use_subtotal?: boolean

	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion | FixedAmountPromotion
	versions?: Version[]

}


interface OrderAmountPromotionRuleCreate extends ResourceCreate {
	
	order_amount_cents?: number
	use_subtotal?: boolean

	promotion: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel

}


interface OrderAmountPromotionRuleUpdate extends ResourceUpdate {
	
	order_amount_cents?: number
	use_subtotal?: boolean

	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel

}


class OrderAmountPromotionRules extends ApiResource {

	static readonly TYPE: 'order_amount_promotion_rules' = 'order_amount_promotion_rules' as const
	// static readonly PATH = 'order_amount_promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderAmountPromotionRule>> {
		return this.resources.list<OrderAmountPromotionRule>({ type: OrderAmountPromotionRules.TYPE }, params, options)
	}

	async create(resource: OrderAmountPromotionRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		return this.resources.create<OrderAmountPromotionRuleCreate, OrderAmountPromotionRule>({ ...resource, type: OrderAmountPromotionRules.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		return this.resources.retrieve<OrderAmountPromotionRule>({ type: OrderAmountPromotionRules.TYPE, id }, params, options)
	}

	async update(resource: OrderAmountPromotionRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		return this.resources.update<OrderAmountPromotionRuleUpdate, OrderAmountPromotionRule>({ ...resource, type: OrderAmountPromotionRules.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: OrderAmountPromotionRules.TYPE, id }, options)
	}

	async versions(orderAmountPromotionRuleId: string | OrderAmountPromotionRule, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _orderAmountPromotionRuleId = (orderAmountPromotionRuleId as OrderAmountPromotionRule).id || orderAmountPromotionRuleId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `order_amount_promotion_rules/${_orderAmountPromotionRuleId}/versions`, params, options) as unknown as ListResponse<Version>
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
