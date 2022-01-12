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
declare type FixedPricePromotionRel = ResourceId & {
    type: typeof FixedPricePromotions.TYPE;
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
interface FixedPricePromotion extends Resource {
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
    sku_list?: SkuList;
    skus?: Sku[];
}
interface FixedPricePromotionCreate extends ResourceCreate {
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
    sku_list: SkuListRel;
}
interface FixedPricePromotionUpdate extends ResourceUpdate {
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
    sku_list?: SkuListRel;
}
declare class FixedPricePromotions extends ApiResource {
    static readonly TYPE: 'fixed_price_promotions';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<FixedPricePromotion>>;
    create(resource: FixedPricePromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion>;
    update(resource: FixedPricePromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isFixedPricePromotion(resource: any): resource is FixedPricePromotion;
    relationship(id: string | ResourceId): FixedPricePromotionRel;
    type(): string;
}
export default FixedPricePromotions;
export { FixedPricePromotion, FixedPricePromotionCreate, FixedPricePromotionUpdate };
