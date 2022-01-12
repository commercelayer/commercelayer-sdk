import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
import { Customer } from './customers';
import { Sku } from './skus';
declare type InStockSubscriptionRel = ResourceId & {
    type: typeof InStockSubscriptions.TYPE;
};
declare type MarketRel = ResourceId & {
    type: 'markets';
};
declare type CustomerRel = ResourceId & {
    type: 'customers';
};
declare type SkuRel = ResourceId & {
    type: 'skus';
};
interface InStockSubscription extends Resource {
    status?: string;
    customer_email?: string;
    sku_code?: string;
    stock_threshold?: number;
    market?: Market;
    customer?: Customer;
    sku?: Sku;
}
interface InStockSubscriptionCreate extends ResourceCreate {
    customer_email?: string;
    sku_code?: string;
    stock_threshold?: number;
    market: MarketRel;
    customer: CustomerRel;
    sku: SkuRel;
}
interface InStockSubscriptionUpdate extends ResourceUpdate {
    sku_code?: string;
    stock_threshold?: number;
    _activate?: boolean;
    _deactivate?: boolean;
    market?: MarketRel;
    customer?: CustomerRel;
    sku?: SkuRel;
}
declare class InStockSubscriptions extends ApiResource {
    static readonly TYPE: 'in_stock_subscriptions';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InStockSubscription>>;
    create(resource: InStockSubscriptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InStockSubscription>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InStockSubscription>;
    update(resource: InStockSubscriptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InStockSubscription>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isInStockSubscription(resource: any): resource is InStockSubscription;
    relationship(id: string | ResourceId): InStockSubscriptionRel;
    type(): string;
}
export default InStockSubscriptions;
export { InStockSubscription, InStockSubscriptionCreate, InStockSubscriptionUpdate };
