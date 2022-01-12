import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
import { Order } from './orders';
import { Customer } from './customers';
import { OrderCopy } from './order_copies';
declare type OrderSubscriptionRel = ResourceId & {
    type: typeof OrderSubscriptions.TYPE;
};
declare type MarketRel = ResourceId & {
    type: 'markets';
};
declare type OrderRel = ResourceId & {
    type: 'orders';
};
interface OrderSubscription extends Resource {
    number?: string;
    status?: string;
    frequency?: string;
    activate_by_source_order?: boolean;
    customer_email?: string;
    starts_at?: string;
    expires_at?: string;
    next_run_at?: string;
    occurrencies?: number;
    errors_count?: number;
    succeeded_on_last_run?: boolean;
    options?: object;
    market?: Market;
    source_order?: Order;
    customer?: Customer;
    order_copies?: OrderCopy[];
    orders?: Order[];
}
interface OrderSubscriptionCreate extends ResourceCreate {
    frequency: string;
    activate_by_source_order?: boolean;
    starts_at?: string;
    expires_at?: string;
    options?: object;
    market?: MarketRel;
    source_order: OrderRel;
}
interface OrderSubscriptionUpdate extends ResourceUpdate {
    expires_at?: string;
    _activate?: boolean;
    _deactivate?: boolean;
    _cancel?: boolean;
}
declare class OrderSubscriptions extends ApiResource {
    static readonly TYPE: 'order_subscriptions';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderSubscription>>;
    create(resource: OrderSubscriptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscription>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscription>;
    update(resource: OrderSubscriptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscription>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isOrderSubscription(resource: any): resource is OrderSubscription;
    relationship(id: string | ResourceId): OrderSubscriptionRel;
    type(): string;
}
export default OrderSubscriptions;
export { OrderSubscription, OrderSubscriptionCreate, OrderSubscriptionUpdate };
