import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
declare type OrderValidationRuleRel = ResourceId & {
    type: typeof OrderValidationRules.TYPE;
};
interface OrderValidationRule extends Resource {
    market?: Market;
}
declare class OrderValidationRules extends ApiResource {
    static readonly TYPE: 'order_validation_rules';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderValidationRule>>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderValidationRule>;
    isOrderValidationRule(resource: any): resource is OrderValidationRule;
    relationship(id: string | ResourceId): OrderValidationRuleRel;
    type(): string;
}
export default OrderValidationRules;
export { OrderValidationRule };
