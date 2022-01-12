import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { EventCallback } from './event_callbacks';
declare type WebhookRel = ResourceId & {
    type: typeof Webhooks.TYPE;
};
interface Webhook extends Resource {
    name?: string;
    topic?: string;
    callback_url?: string;
    include_resources?: string[];
    circuit_state?: string;
    circuit_failure_count?: number;
    last_event_callbacks?: EventCallback[];
}
interface WebhookCreate extends ResourceCreate {
    name?: string;
    topic: string;
    callback_url: string;
    include_resources?: string[];
}
interface WebhookUpdate extends ResourceUpdate {
    name?: string;
    topic?: string;
    callback_url?: string;
    include_resources?: string[];
    _reset_circuit?: boolean;
}
declare class Webhooks extends ApiResource {
    static readonly TYPE: 'webhooks';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Webhook>>;
    create(resource: WebhookCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Webhook>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Webhook>;
    update(resource: WebhookUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Webhook>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isWebhook(resource: any): resource is Webhook;
    relationship(id: string | ResourceId): WebhookRel;
    type(): string;
}
export default Webhooks;
export { Webhook, WebhookCreate, WebhookUpdate };
