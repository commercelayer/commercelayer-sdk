import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { PercentageDiscountPromotion } from './percentage_discount_promotions';
import { FreeShippingPromotion } from './free_shipping_promotions';
import { FixedAmountPromotion } from './fixed_amount_promotions';
import { FreeGiftPromotion } from './free_gift_promotions';
import { FixedPricePromotion } from './fixed_price_promotions';
import { ExternalPromotion } from './external_promotions';
import { Coupon } from './coupons';
declare type CouponCodesPromotionRuleRel = ResourceId & {
    type: typeof CouponCodesPromotionRules.TYPE;
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
declare type CouponRel = ResourceId & {
    type: 'coupons';
};
interface CouponCodesPromotionRule extends Resource {
    promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FixedAmountPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion;
    coupons?: Coupon[];
}
interface CouponCodesPromotionRuleCreate extends ResourceCreate {
    promotion: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel;
    coupons?: CouponRel[];
}
interface CouponCodesPromotionRuleUpdate extends ResourceUpdate {
    promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel;
    coupons?: CouponRel[];
}
declare class CouponCodesPromotionRules extends ApiResource {
    static readonly TYPE: 'coupon_codes_promotion_rules';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CouponCodesPromotionRule>>;
    create(resource: CouponCodesPromotionRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule>;
    update(resource: CouponCodesPromotionRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isCouponCodesPromotionRule(resource: any): resource is CouponCodesPromotionRule;
    relationship(id: string | ResourceId): CouponCodesPromotionRuleRel;
    type(): string;
}
export default CouponCodesPromotionRules;
export { CouponCodesPromotionRule, CouponCodesPromotionRuleCreate, CouponCodesPromotionRuleUpdate };
