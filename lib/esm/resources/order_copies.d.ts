import { ApiResource, Resource, ResourceCreate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
import { OrderSubscription } from './order_subscriptions';
declare type OrderCopyRel = ResourceId & {
    type: typeof OrderCopies.TYPE;
};
declare type OrderRel = ResourceId & {
    type: 'orders';
};
interface OrderCopy extends Resource {
    status?: string;
    started_at?: string;
    completed_at?: string;
    failed_at?: string;
    place_target_order?: boolean;
    cancel_source_order?: boolean;
    reuse_wallet?: boolean;
    errors_log?: object;
    errors_count?: number;
    source_order?: Order;
    target_order?: Order;
    order_subscription?: OrderSubscription;
}
interface OrderCopyCreate extends ResourceCreate {
    place_target_order?: boolean;
    cancel_source_order?: boolean;
    reuse_wallet?: boolean;
    source_order: OrderRel;
}
declare class OrderCopies extends ApiResource {
    static readonly TYPE: 'order_copies';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderCopy>>;
    create(resource: OrderCopyCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderCopy>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderCopy>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isOrderCopy(resource: any): resource is OrderCopy;
    relationship(id: string | ResourceId): OrderCopyRel;
    type(): string;
}
export default OrderCopies;
export { OrderCopy, OrderCopyCreate };
