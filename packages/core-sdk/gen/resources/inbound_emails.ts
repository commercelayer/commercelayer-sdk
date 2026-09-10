import type { QueryParamsList, QueryParamsRetrieve } from '@runtime/query'
import type {
  ListResponse,
  Resource,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'
import type { Agent } from './agents'
import type { Agreement } from './agreements'
import type { Customer } from './customers'
import type { EventStore } from './event_stores'
import type { Event } from './events'
import type { Order } from './orders'
import type { Organization } from './organizations'

type InboundEmailType = 'inbound_emails'
type InboundEmailRel = ResourceRel & { type: InboundEmailType }

export type InboundEmailSort = Pick<InboundEmail, 'id' | 'status' | 'subject' | 'from_address'> & ResourceSort
// export type InboundEmailFilter = Pick<InboundEmail, 'id' | 'status' | 'error_code' | 'subject' | 'from_address'> & ResourceFilter

/**
 * The Inbound email object is returned as part of the response body of each successful list or retrieve API call to the /api/inbound_emails endpoint.
 *
 * @deprecated Last available in API version 2017-08.
 * @link https://docs.commercelayer.io/core-api-reference/inbound_emails/object
 */
interface InboundEmail extends Resource {
  readonly type: InboundEmailType

  /**
   * The inbound message processing status. One of 'pending' (default), 'processing', 'completed', or 'failed'.
   * @example ```"pending"```
   */
  status: 'pending' | 'processing' | 'completed' | 'failed'
  /**
   * A machine-readable code describing why processing failed, if any.
   * @example ```"unresolvable_sku"```
   */
  error_code?: string | null
  /**
   * A human-readable description of the processing failure, if any.
   * @example ```"SKU UNKNOWN is not purchasable in the agreement market."```
   */
  error_message?: string | null
  /**
   * Structured failure details containing a globally unique identifier, scope, stable code, severity, description, an optional runtime message, and an optional nested details object.
   * @example ```{"identifier":"mail_to_order_b2b.unresolvable_sku","scope":"mail_to_order_b2b","code":"unresolvable_sku","severity":"error","description":"No requested item could be matched to the catalogue."}```
   */
  diagnostic?: Record<string, any> | null
  /**
   * The email subject, when the inbound channel is email.
   * @example ```"PO-2026-041"```
   */
  subject?: string | null
  /**
   * The authenticated sender email address.
   * @example ```"buyer@example.com"```
   */
  from_address?: string | null
  /**
   * Requested lines, resolved SKUs with resolution and prices, unresolved lines left off the order, and validation status.
   * @example ```{"requested":{"po_reference":"PO-2026-041","order_notes":null,"items":[],"issues":[],"embedded_instructions":[]},"resolved":{"agreement_id":"XAyRWNUzyN","agreement_code":"EU-WHOLESALE","items":[],"unresolved":[]},"validation":{"status":"needs_review","warnings":[{"identifier":"mail_to_order_b2b.price_mismatch","scope":"mail_to_order_b2b","code":"price_mismatch","severity":"warning","description":"The buyer-stated unit price differs from the effective market unit price.","message":"TSHIRT-BLK-M requested 2800, market 2900","details":{"sku_code":"TSHIRT-BLK-M","requested_unit_amount_cents":2800,"market_unit_amount_cents":2900}}],"blockers":[],"history":{"recent_order_count":0}}}```
   */
  extraction?: Record<string, any> | null
  /**
   * A presigned URL to download the stored raw payload.
   * @example ```"https://storage.example.com/inbound/message.eml"```
   */
  raw_payload_url?: string | null

  customer?: Customer | null
  agreement?: Agreement | null
  order?: Order | null
  organization?: Organization | null
  agent?: Agent | null
  events?: Event[] | null
  event_stores?: EventStore[] | null
}

/** @deprecated Last available in API version 2017-08. */
class InboundEmails extends ApiResource<InboundEmail> {
  static readonly TYPE: InboundEmailType = 'inbound_emails' as const

  async customer(
    inboundEmailId: string | InboundEmail,
    params?: QueryParamsRetrieve<Customer>,
    options?: ResourcesConfig,
  ): Promise<Customer> {
    const _inboundEmailId = (inboundEmailId as InboundEmail).id || (inboundEmailId as string)
    return this.resources.fetch<Customer>(
      { type: 'customers' },
      `inbound_emails/${_inboundEmailId}/customer`,
      params,
      options,
    ) as unknown as Customer
  }

  async agreement(
    inboundEmailId: string | InboundEmail,
    params?: QueryParamsRetrieve<Agreement>,
    options?: ResourcesConfig,
  ): Promise<Agreement> {
    const _inboundEmailId = (inboundEmailId as InboundEmail).id || (inboundEmailId as string)
    return this.resources.fetch<Agreement>(
      { type: 'agreements' },
      `inbound_emails/${_inboundEmailId}/agreement`,
      params,
      options,
    ) as unknown as Agreement
  }

  async order(
    inboundEmailId: string | InboundEmail,
    params?: QueryParamsRetrieve<Order>,
    options?: ResourcesConfig,
  ): Promise<Order> {
    const _inboundEmailId = (inboundEmailId as InboundEmail).id || (inboundEmailId as string)
    return this.resources.fetch<Order>(
      { type: 'orders' },
      `inbound_emails/${_inboundEmailId}/order`,
      params,
      options,
    ) as unknown as Order
  }

  async organization(
    inboundEmailId: string | InboundEmail,
    params?: QueryParamsRetrieve<Organization>,
    options?: ResourcesConfig,
  ): Promise<Organization> {
    const _inboundEmailId = (inboundEmailId as InboundEmail).id || (inboundEmailId as string)
    return this.resources.fetch<Organization>(
      { type: 'organizations' },
      `inbound_emails/${_inboundEmailId}/organization`,
      params,
      options,
    ) as unknown as Organization
  }

  async agent(
    inboundEmailId: string | InboundEmail,
    params?: QueryParamsRetrieve<Agent>,
    options?: ResourcesConfig,
  ): Promise<Agent> {
    const _inboundEmailId = (inboundEmailId as InboundEmail).id || (inboundEmailId as string)
    return this.resources.fetch<Agent>(
      { type: 'agents' },
      `inbound_emails/${_inboundEmailId}/agent`,
      params,
      options,
    ) as unknown as Agent
  }

  async events(
    inboundEmailId: string | InboundEmail,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _inboundEmailId = (inboundEmailId as InboundEmail).id || (inboundEmailId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `inbound_emails/${_inboundEmailId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    inboundEmailId: string | InboundEmail,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _inboundEmailId = (inboundEmailId as InboundEmail).id || (inboundEmailId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `inbound_emails/${_inboundEmailId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isInboundEmail(resource: any): resource is InboundEmail {
    return resource.type && resource.type === InboundEmails.TYPE
  }

  relationship(id: string | ResourceId | null): InboundEmailRel {
    return super.relationshipOneToOne<InboundEmailRel>(id)
  }

  relationshipToMany(...ids: string[]): InboundEmailRel[] {
    return super.relationshipOneToMany<InboundEmailRel>(...ids)
  }

  type(): InboundEmailType {
    return InboundEmails.TYPE
  }
}

const instance = new InboundEmails()
export default instance

export type { InboundEmail, InboundEmails, InboundEmailType }
