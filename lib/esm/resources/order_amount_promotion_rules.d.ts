import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { PercentageDiscountPromotion } from './percentage_discount_promotions';
import { FreeShippingPromotion } from './free_shipping_promotions';
import { FixedAmountPromotion } from './fixed_amount_promotions';
import { FreeGiftPromotion } from './free_gift_promotions';
import { FixedPricePromotion } from './fixed_price_promotions';
import { ExternalPromotion } from './external_promotions';
declare type OrderAmountPromotionRuleRel = ResourceId & {
    type: typeof OrderAmountPromotionRules.TYPE;
};
declare type PercentageDiscountPromotionRel = ResourceId & {
    type: 'percentage_discount_promotions';
};
declare type FreeShippingPromotionRel = ResourceId & {
    type: 'free_shipping_promotions';
};
declare type FixedAmountPromotionRel = ResourceId & {
    type: 'fixed_amount_promotions';
};
declare type FreeGiftPromotionRel = ResourceId & {
    type: 'free_gift_promotions';
};
declare type FixedPricePromotionRel = ResourceId & {
    type: 'fixed_price_promotions';
};
declare type ExternalPromotionRel = ResourceId & {
    type: 'external_promotions';
};
interface OrderAmountPromotionRule extends Resource {
    order_amount_cents?: number;
    order_amount_float?: number;
    formatted_order_amount?: string;
    promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FixedAmountPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion;
}
interface OrderAmountPromotionRuleCreate extends ResourceCreate {
    order_amount_cents?: number;
    promotion: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel;
}
interface OrderAmountPromotionRuleUpdate extends ResourceUpdate {
    order_amount_cents?: number;
    promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel;
}
declare class OrderAmountPromotionRules extends ApiResource {
    static readonly TYPE: 'order_amount_promotion_rules';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderAmountPromotionRule>>;
    create(resource: OrderAmountPromotionRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule>;
    update(resource: OrderAmountPromotionRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isOrderAmountPromotionRule(resource: any): resource is OrderAmountPromotionRule;
    relationship(id: string | ResourceId): OrderAmountPromotionRuleRel;
    type(): string;
}
export default OrderAmountPromotionRules;
export { OrderAmountPromotionRule, OrderAmountPromotionRuleCreate, OrderAmountPromotionRuleUpdate };
