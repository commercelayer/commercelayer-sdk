import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
import { PromotionRule } from './promotion_rules';
import { OrderAmountPromotionRule } from './order_amount_promotion_rules';
import { SkuListPromotionRule } from './sku_list_promotion_rules';
import { CouponCodesPromotionRule } from './coupon_codes_promotion_rules';
import { Attachment } from './attachments';
declare type FixedAmountPromotionRel = ResourceId & {
    type: typeof FixedAmountPromotions.TYPE;
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
interface FixedAmountPromotion extends Resource {
    name?: string;
    starts_at?: string;
    expires_at?: string;
    total_usage_limit?: number;
    total_usage_count?: number;
    active?: boolean;
    fixed_amount_cents?: number;
    fixed_amount_float?: number;
    formatted_fixed_amount?: string;
    market?: Market;
    promotion_rules?: PromotionRule[];
    order_amount_promotion_rule?: OrderAmountPromotionRule;
    sku_list_promotion_rule?: SkuListPromotionRule;
    coupon_codes_promotion_rule?: CouponCodesPromotionRule;
    attachments?: Attachment[];
}
interface FixedAmountPromotionCreate extends ResourceCreate {
    name: string;
    starts_at: string;
    expires_at: string;
    total_usage_limit: number;
    fixed_amount_cents: number;
    market?: MarketRel;
    promotion_rules?: PromotionRuleRel[];
    order_amount_promotion_rule?: OrderAmountPromotionRuleRel;
    sku_list_promotion_rule?: SkuListPromotionRuleRel;
    coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel;
}
interface FixedAmountPromotionUpdate extends ResourceUpdate {
    name?: string;
    starts_at?: string;
    expires_at?: string;
    total_usage_limit?: number;
    fixed_amount_cents?: number;
    market?: MarketRel;
    promotion_rules?: PromotionRuleRel[];
    order_amount_promotion_rule?: OrderAmountPromotionRuleRel;
    sku_list_promotion_rule?: SkuListPromotionRuleRel;
    coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel;
}
declare class FixedAmountPromotions extends ApiResource {
    static readonly TYPE: 'fixed_amount_promotions';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<FixedAmountPromotion>>;
    create(resource: FixedAmountPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedAmountPromotion>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedAmountPromotion>;
    update(resource: FixedAmountPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedAmountPromotion>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isFixedAmountPromotion(resource: any): resource is FixedAmountPromotion;
    relationship(id: string | ResourceId): FixedAmountPromotionRel;
    type(): string;
}
export default FixedAmountPromotions;
export { FixedAmountPromotion, FixedAmountPromotionCreate, FixedAmountPromotionUpdate };
