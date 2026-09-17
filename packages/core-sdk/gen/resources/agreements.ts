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
import type { Address } from './addresses'
import type { Agent } from './agents'
import type { AgreementIdentity } from './agreement_identities'
import type { Customer } from './customers'
import type { EventStore } from './event_stores'
import type { Market } from './markets'
import type { Order } from './orders'
import type { Organization } from './organizations'

type AgreementType = 'agreements'
type AgreementRel = ResourceRel & { type: AgreementType }

export type AgreementSort = Pick<
  Agreement,
  | 'id'
  | 'code'
  | 'name'
  | 'status'
  | 'buyer_organization_id'
  | 'starts_at'
  | 'expires_at'
  | 'activated_at'
  | 'deactivated_at'
  | 'expired_at'
  | 'cancelled_at'
> &
  ResourceSort
// export type AgreementFilter = Pick<Agreement, 'id' | 'code' | 'name' | 'status' | 'buyer_organization_id' | 'starts_at' | 'expires_at' | 'activated_at' | 'deactivated_at' | 'expired_at' | 'cancelled_at'> & ResourceFilter

/**
 * The Agreement object is returned as part of the response body of each successful list or retrieve API call to the /api/agreements endpoint.
 *
 * @deprecated Last available in API version 2017-08.
 * @link https://docs.commercelayer.io/core-api-reference/agreements/object
 */
interface Agreement extends Resource {
  readonly type: AgreementType

  /**
   * The agreement identifier, unique per organization and environment. Optional — set by the seller.
   * @example ```"PO-2025-EU"```
   */
  code?: string | null
  /**
   * The agreement display name.
   * @example ```"Acme Corp — EU wholesale"```
   */
  name: string
  /**
   * The agreement status. One of 'pending', 'active', 'inactive', 'expired', or 'cancelled'.
   * @example ```"pending"```
   */
  status?: 'pending' | 'active' | 'inactive' | 'expired' | 'cancelled' | null
  /**
   * The buyer organization ID (hashid in the API, integer FK in the DB).
   * @example ```"xYZaBcDeF1"```
   */
  buyer_organization_id?: string | null
  /**
   * The date/time from which this agreement is valid. Leave blank for no lower bound.
   * @example ```"2025-01-01T00:00:00.000Z"```
   */
  starts_at?: string | null
  /**
   * The date/time after which this agreement is no longer valid. Seller-configured schedule; must be after starts_at when both are set. Distinct from expired_at.
   * @example ```"2026-01-01T00:00:00.000Z"```
   */
  expires_at?: string | null
  /**
   * Time at which the agreement was last activated.
   * @example ```"2025-01-01T12:00:00.000Z"```
   */
  activated_at?: string | null
  /**
   * Time at which the agreement was last deactivated.
   * @example ```"2025-06-01T12:00:00.000Z"```
   */
  deactivated_at?: string | null
  /**
   * Time at which the agreement status was set to expired. Distinct from expires_at, which is the seller-configured validity end.
   * @example ```"2026-01-01T00:05:00.000Z"```
   */
  expired_at?: string | null
  /**
   * Time at which the agreement was cancelled.
   * @example ```"2025-09-15T08:00:00.000Z"```
   */
  cancelled_at?: string | null

  market?: Market | null
  buyer_organization?: Organization | null
  billing_address?: Address | null
  shipping_address?: Address | null
  agreement_identities?: AgreementIdentity[] | null
  customers?: Customer[] | null
  orders?: Order[] | null
  agents?: Agent[] | null
  event_stores?: EventStore[] | null
}

/** @deprecated Last available in API version 2017-08. */
class Agreements extends ApiResource<Agreement> {
  static readonly TYPE: AgreementType = 'agreements' as const

  async market(
    agreementId: string | Agreement,
    params?: QueryParamsRetrieve<Market>,
    options?: ResourcesConfig,
  ): Promise<Market> {
    const _agreementId = (agreementId as Agreement).id || (agreementId as string)
    return this.resources.fetch<Market>(
      { type: 'markets' },
      `agreements/${_agreementId}/market`,
      params,
      options,
    ) as unknown as Market
  }

  async buyer_organization(
    agreementId: string | Agreement,
    params?: QueryParamsRetrieve<Organization>,
    options?: ResourcesConfig,
  ): Promise<Organization> {
    const _agreementId = (agreementId as Agreement).id || (agreementId as string)
    return this.resources.fetch<Organization>(
      { type: 'organizations' },
      `agreements/${_agreementId}/buyer_organization`,
      params,
      options,
    ) as unknown as Organization
  }

  async billing_address(
    agreementId: string | Agreement,
    params?: QueryParamsRetrieve<Address>,
    options?: ResourcesConfig,
  ): Promise<Address> {
    const _agreementId = (agreementId as Agreement).id || (agreementId as string)
    return this.resources.fetch<Address>(
      { type: 'addresses' },
      `agreements/${_agreementId}/billing_address`,
      params,
      options,
    ) as unknown as Address
  }

  async shipping_address(
    agreementId: string | Agreement,
    params?: QueryParamsRetrieve<Address>,
    options?: ResourcesConfig,
  ): Promise<Address> {
    const _agreementId = (agreementId as Agreement).id || (agreementId as string)
    return this.resources.fetch<Address>(
      { type: 'addresses' },
      `agreements/${_agreementId}/shipping_address`,
      params,
      options,
    ) as unknown as Address
  }

  async agreement_identities(
    agreementId: string | Agreement,
    params?: QueryParamsList<AgreementIdentity>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<AgreementIdentity>> {
    const _agreementId = (agreementId as Agreement).id || (agreementId as string)
    return this.resources.fetch<AgreementIdentity>(
      { type: 'agreement_identities' },
      `agreements/${_agreementId}/agreement_identities`,
      params,
      options,
    ) as unknown as ListResponse<AgreementIdentity>
  }

  async customers(
    agreementId: string | Agreement,
    params?: QueryParamsList<Customer>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Customer>> {
    const _agreementId = (agreementId as Agreement).id || (agreementId as string)
    return this.resources.fetch<Customer>(
      { type: 'customers' },
      `agreements/${_agreementId}/customers`,
      params,
      options,
    ) as unknown as ListResponse<Customer>
  }

  async orders(
    agreementId: string | Agreement,
    params?: QueryParamsList<Order>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Order>> {
    const _agreementId = (agreementId as Agreement).id || (agreementId as string)
    return this.resources.fetch<Order>(
      { type: 'orders' },
      `agreements/${_agreementId}/orders`,
      params,
      options,
    ) as unknown as ListResponse<Order>
  }

  async agents(
    agreementId: string | Agreement,
    params?: QueryParamsList<Agent>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Agent>> {
    const _agreementId = (agreementId as Agreement).id || (agreementId as string)
    return this.resources.fetch<Agent>(
      { type: 'agents' },
      `agreements/${_agreementId}/agents`,
      params,
      options,
    ) as unknown as ListResponse<Agent>
  }

  async event_stores(
    agreementId: string | Agreement,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _agreementId = (agreementId as Agreement).id || (agreementId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `agreements/${_agreementId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isAgreement(resource: any): resource is Agreement {
    return resource.type && resource.type === Agreements.TYPE
  }

  relationship(id: string | ResourceId | null): AgreementRel {
    return super.relationshipOneToOne<AgreementRel>(id)
  }

  relationshipToMany(...ids: string[]): AgreementRel[] {
    return super.relationshipOneToMany<AgreementRel>(...ids)
  }

  type(): AgreementType {
    return Agreements.TYPE
  }
}

const instance = new Agreements()
export default instance

export type { Agreement, Agreements, AgreementType }
