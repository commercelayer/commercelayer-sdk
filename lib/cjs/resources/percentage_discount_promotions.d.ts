import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
import { PromotionRule } from './promotion_rules';
import { OrderAmountPromotionRule } from './order_amount_promotion_rules';
import { SkuListPromotionRule } from './sku_list_promotion_rules';
import { CouponCodesPromotionRule } from './coupon_codes_promotion_rules';
import { Attachment } from './attachments';
import { SkuList } from './sku_lists';
import { Sku } from './skus';
declare type PercentageDiscountPromotionRel = ResourceId & {
    type: typeof PercentageDiscountPromotions.TYPE;
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
declare type SkuListRel = ResourceId & {
    type: 'sku_lists';
};
interface PercentageDiscountPromotion extends Resource {
    name?: string;
    starts_at?: string;
    expires_at?: string;
    total_usage_limit?: number;
    total_usage_count?: number;
    active?: boolean;
    percentage?: number;
    market?: Market;
    promotion_rules?: PromotionRule[];
    order_amount_promotion_rule?: OrderAmountPromotionRule;
    sku_list_promotion_rule?: SkuListPromotionRule;
    coupon_codes_promotion_rule?: CouponCodesPromotionRule;
    attachments?: Attachment[];
    sku_list?: SkuList;
    skus?: Sku[];
}
interface PercentageDiscountPromotionCreate extends ResourceCreate {
    name: string;
    starts_at: string;
    expires_at: string;
    total_usage_limit: number;
    percentage: number;
    market?: MarketRel;
    promotion_rules?: PromotionRuleRel[];
    order_amount_promotion_rule?: OrderAmountPromotionRuleRel;
    sku_list_promotion_rule?: SkuListPromotionRuleRel;
    coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel;
    sku_list?: SkuListRel;
}
interface PercentageDiscountPromotionUpdate extends ResourceUpdate {
    name?: string;
    starts_at?: string;
    expires_at?: string;
    total_usage_limit?: number;
    percentage?: number;
    market?: MarketRel;
    promotion_rules?: PromotionRuleRel[];
    order_amount_promotion_rule?: OrderAmountPromotionRuleRel;
    sku_list_promotion_rule?: SkuListPromotionRuleRel;
    coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel;
    sku_list?: SkuListRel;
}
declare class PercentageDiscountPromotions extends ApiResource {
    static readonly TYPE: 'percentage_discount_promotions';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PercentageDiscountPromotion>>;
    create(resource: PercentageDiscountPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PercentageDiscountPromotion>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PercentageDiscountPromotion>;
    update(resource: PercentageDiscountPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PercentageDiscountPromotion>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isPercentageDiscountPromotion(resource: any): resource is PercentageDiscountPromotion;
    relationship(id: string | ResourceId): PercentageDiscountPromotionRel;
    type(): string;
}
export default PercentageDiscountPromotions;
export { PercentageDiscountPromotion, PercentageDiscountPromotionCreate, PercentageDiscountPromotionUpdate };
