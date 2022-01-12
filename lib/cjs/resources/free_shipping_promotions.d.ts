import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
import { PromotionRule } from './promotion_rules';
import { OrderAmountPromotionRule } from './order_amount_promotion_rules';
import { SkuListPromotionRule } from './sku_list_promotion_rules';
import { CouponCodesPromotionRule } from './coupon_codes_promotion_rules';
import { Attachment } from './attachments';
declare type FreeShippingPromotionRel = ResourceId & {
    type: typeof FreeShippingPromotions.TYPE;
};
declare type MarketRel = ResourceId & {
    type: 'markets';
};
declare type PromotionRuleRel = ResourceId & {
    type: 'promotion_rules';
};
declare type OrderAmountPromotionRuleRel = ResourceId & {
    type: 'order_amount_promotion_rules';
};
declare type SkuListPromotionRuleRel = ResourceId & {
    type: 'sku_list_promotion_rules';
};
declare type CouponCodesPromotionRuleRel = ResourceId & {
    type: 'coupon_codes_promotion_rules';
};
interface FreeShippingPromotion extends Resource {
    name?: string;
    starts_at?: string;
    expires_at?: string;
    total_usage_limit?: number;
    total_usage_count?: number;
    active?: boolean;
    market?: Market;
    promotion_rules?: PromotionRule[];
    order_amount_promotion_rule?: OrderAmountPromotionRule;
    sku_list_promotion_rule?: SkuListPromotionRule;
    coupon_codes_promotion_rule?: CouponCodesPromotionRule;
    attachments?: Attachment[];
}
interface FreeShippingPromotionCreate extends ResourceCreate {
    name: string;
    starts_at: string;
    expires_at: string;
    total_usage_limit: number;
    market?: MarketRel;
    promotion_rules?: PromotionRuleRel[];
    order_amount_promotion_rule?: OrderAmountPromotionRuleRel;
    sku_list_promotion_rule?: SkuListPromotionRuleRel;
    coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel;
}
interface FreeShippingPromotionUpdate extends ResourceUpdate {
    name?: string;
    starts_at?: string;
    expires_at?: string;
    total_usage_limit?: number;
    market?: MarketRel;
    promotion_rules?: PromotionRuleRel[];
    order_amount_promotion_rule?: OrderAmountPromotionRuleRel;
    sku_list_promotion_rule?: SkuListPromotionRuleRel;
    coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel;
}
declare class FreeShippingPromotions extends ApiResource {
    static readonly TYPE: 'free_shipping_promotions';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<FreeShippingPromotion>>;
    create(resource: FreeShippingPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion>;
    update(resource: FreeShippingPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isFreeShippingPromotion(resource: any): resource is FreeShippingPromotion;
    relationship(id: string | ResourceId): FreeShippingPromotionRel;
    type(): string;
}
export default FreeShippingPromotions;
export { FreeShippingPromotion, FreeShippingPromotionCreate, FreeShippingPromotionUpdate };
