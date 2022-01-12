import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
import { PromotionRule } from './promotion_rules';
import { OrderAmountPromotionRule } from './order_amount_promotion_rules';
import { SkuListPromotionRule } from './sku_list_promotion_rules';
import { CouponCodesPromotionRule } from './coupon_codes_promotion_rules';
import { Attachment } from './attachments';
declare type ExternalPromotionRel = ResourceId & {
    type: typeof ExternalPromotions.TYPE;
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
interface ExternalPromotion extends Resource {
    name?: string;
    starts_at?: string;
    expires_at?: string;
    total_usage_limit?: number;
    total_usage_count?: number;
    active?: boolean;
    promotion_url?: string;
    market?: Market;
    promotion_rules?: PromotionRule[];
    order_amount_promotion_rule?: OrderAmountPromotionRule;
    sku_list_promotion_rule?: SkuListPromotionRule;
    coupon_codes_promotion_rule?: CouponCodesPromotionRule;
    attachments?: Attachment[];
}
interface ExternalPromotionCreate extends ResourceCreate {
    name: string;
    starts_at: string;
    expires_at: string;
    total_usage_limit: number;
    promotion_url: string;
    market?: MarketRel;
    promotion_rules?: PromotionRuleRel[];
    order_amount_promotion_rule?: OrderAmountPromotionRuleRel;
    sku_list_promotion_rule?: SkuListPromotionRuleRel;
    coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel;
}
interface ExternalPromotionUpdate extends ResourceUpdate {
    name?: string;
    starts_at?: string;
    expires_at?: string;
    total_usage_limit?: number;
    promotion_url?: string;
    market?: MarketRel;
    promotion_rules?: PromotionRuleRel[];
    order_amount_promotion_rule?: OrderAmountPromotionRuleRel;
    sku_list_promotion_rule?: SkuListPromotionRuleRel;
    coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel;
}
declare class ExternalPromotions extends ApiResource {
    static readonly TYPE: 'external_promotions';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalPromotion>>;
    create(resource: ExternalPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPromotion>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPromotion>;
    update(resource: ExternalPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPromotion>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isExternalPromotion(resource: any): resource is ExternalPromotion;
    relationship(id: string | ResourceId): ExternalPromotionRel;
    type(): string;
}
export default ExternalPromotions;
export { ExternalPromotion, ExternalPromotionCreate, ExternalPromotionUpdate };
