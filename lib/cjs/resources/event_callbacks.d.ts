import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Webhook } from './webhooks';
declare type EventCallbackRel = ResourceId & {
    type: typeof EventCallbacks.TYPE;
};
interface EventCallback extends Resource {
    callback_url?: string;
    payload?: object;
    response_code?: string;
    response_message?: string;
    webhook?: Webhook;
}
declare class EventCallbacks extends ApiResource {
    static readonly TYPE: 'event_callbacks';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<EventCallback>>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<EventCallback>;
    isEventCallback(resource: any): resource is EventCallback;
    relationship(id: string | ResourceId): EventCallbackRel;
    type(): string;
}
export default EventCallbacks;
export { EventCallback };
