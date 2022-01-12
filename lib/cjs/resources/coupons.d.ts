import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { CouponCodesPromotionRule } from './coupon_codes_promotion_rules';
declare type CouponRel = ResourceId & {
    type: typeof Coupons.TYPE;
};
declare type CouponCodesPromotionRuleRel = ResourceId & {
    type: 'coupon_codes_promotion_rules';
};
interface Coupon extends Resource {
    code?: string;
    customer_single_use?: boolean;
    usage_limit?: number;
    usage_count?: number;
    recipient_email?: string;
    promotion_rule?: CouponCodesPromotionRule;
}
interface CouponCreate extends ResourceCreate {
    code: string;
    customer_single_use?: boolean;
    usage_limit: number;
    recipient_email?: string;
    promotion_rule: CouponCodesPromotionRuleRel;
}
interface CouponUpdate extends ResourceUpdate {
    code?: string;
    customer_single_use?: boolean;
    usage_limit?: number;
    recipient_email?: string;
    promotion_rule?: CouponCodesPromotionRuleRel;
}
declare class Coupons extends ApiResource {
    static readonly TYPE: 'coupons';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>>;
    create(resource: CouponCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Coupon>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Coupon>;
    update(resource: CouponUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Coupon>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isCoupon(resource: any): resource is Coupon;
    relationship(id: string | ResourceId): CouponRel;
    type(): string;
}
export default Coupons;
export { Coupon, CouponCreate, CouponUpdate };
