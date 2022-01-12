import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { PercentageDiscountPromotion } from './percentage_discount_promotions';
import { FreeShippingPromotion } from './free_shipping_promotions';
import { FixedAmountPromotion } from './fixed_amount_promotions';
import { FreeGiftPromotion } from './free_gift_promotions';
import { FixedPricePromotion } from './fixed_price_promotions';
import { ExternalPromotion } from './external_promotions';
declare type PromotionRuleRel = ResourceId & {
    type: typeof PromotionRules.TYPE;
};
interface PromotionRule extends Resource {
    promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FixedAmountPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion;
}
declare class PromotionRules extends ApiResource {
    static readonly TYPE: 'promotion_rules';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PromotionRule>>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PromotionRule>;
    isPromotionRule(resource: any): resource is PromotionRule;
    relationship(id: string | ResourceId): PromotionRuleRel;
    type(): string;
}
export default PromotionRules;
export { PromotionRule };
