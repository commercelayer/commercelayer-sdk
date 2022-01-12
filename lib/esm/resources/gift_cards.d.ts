import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
import { GiftCardRecipient } from './gift_card_recipients';
import { Attachment } from './attachments';
declare type GiftCardRel = ResourceId & {
    type: typeof GiftCards.TYPE;
};
declare type MarketRel = ResourceId & {
    type: 'markets';
};
declare type GiftCardRecipientRel = ResourceId & {
    type: 'gift_card_recipients';
};
interface GiftCard extends Resource {
    status?: string;
    code?: string;
    currency_code?: string;
    initial_balance_cents?: number;
    initial_balance_float?: number;
    formatted_initial_balance?: string;
    balance_cents?: number;
    balance_float?: number;
    formatted_balance?: string;
    balance_max_cents?: string;
    balance_max_float?: number;
    formatted_balance_max?: string;
    balance_log?: object[];
    single_use?: boolean;
    rechargeable?: boolean;
    image_url?: string;
    expires_at?: string;
    recipient_email?: string;
    market?: Market;
    gift_card_recipient?: GiftCardRecipient;
    attachments?: Attachment[];
}
interface GiftCardCreate extends ResourceCreate {
    code?: string;
    currency_code: string;
    balance_cents: number;
    balance_max_cents?: string;
    single_use?: boolean;
    rechargeable?: boolean;
    image_url?: string;
    expires_at?: string;
    recipient_email?: string;
    market?: MarketRel;
    gift_card_recipient?: GiftCardRecipientRel;
}
interface GiftCardUpdate extends ResourceUpdate {
    currency_code?: string;
    balance_cents?: number;
    balance_max_cents?: string;
    single_use?: boolean;
    rechargeable?: boolean;
    image_url?: string;
    expires_at?: string;
    recipient_email?: string;
    _purchase?: boolean;
    _activate?: boolean;
    _deactivate?: boolean;
    _balance_change_cents?: number;
    market?: MarketRel;
    gift_card_recipient?: GiftCardRecipientRel;
}
declare class GiftCards extends ApiResource {
    static readonly TYPE: 'gift_cards';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<GiftCard>>;
    create(resource: GiftCardCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCard>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCard>;
    update(resource: GiftCardUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCard>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isGiftCard(resource: any): resource is GiftCard;
    relationship(id: string | ResourceId): GiftCardRel;
    type(): string;
}
export default GiftCards;
export { GiftCard, GiftCardCreate, GiftCardUpdate };
