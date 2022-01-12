import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
declare type BillingInfoValidationRuleRel = ResourceId & {
    type: typeof BillingInfoValidationRules.TYPE;
};
declare type MarketRel = ResourceId & {
    type: 'markets';
};
interface BillingInfoValidationRule extends Resource {
    market?: Market;
}
interface BillingInfoValidationRuleCreate extends ResourceCreate {
    market: MarketRel;
}
interface BillingInfoValidationRuleUpdate extends ResourceUpdate {
    market?: MarketRel;
}
declare class BillingInfoValidationRules extends ApiResource {
    static readonly TYPE: 'billing_info_validation_rules';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BillingInfoValidationRule>>;
    create(resource: BillingInfoValidationRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BillingInfoValidationRule>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BillingInfoValidationRule>;
    update(resource: BillingInfoValidationRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BillingInfoValidationRule>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isBillingInfoValidationRule(resource: any): resource is BillingInfoValidationRule;
    relationship(id: string | ResourceId): BillingInfoValidationRuleRel;
    type(): string;
}
export default BillingInfoValidationRules;
export { BillingInfoValidationRule, BillingInfoValidationRuleCreate, BillingInfoValidationRuleUpdate };
