import type { QueryParamsList, QueryParamsRetrieve } from '@runtime/query'
import type {
  ListResponse,
  Resource,
  ResourceCreate,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
  ResourceUpdate,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'
import type { Address, AddressType } from './addresses'
import type { AgreementIdentity } from './agreement_identities'
import type { Market, MarketType } from './markets'
import type { Organization, OrganizationType } from './organizations'

type AgreementType = 'agreements'
type AgreementRel = ResourceRel & { type: AgreementType }
type OrganizationRel = ResourceRel & { type: OrganizationType }
type MarketRel = ResourceRel & { type: MarketType }
type AddressRel = ResourceRel & { type: AddressType }

export type AgreementSort = Pick<
  Agreement,
  | 'id'
  | 'code'
  | 'name'
  | 'status'
  | 'buyer_organization_id'
  | 'recipient_email'
  | 'market_id'
  | 'starts_at'
  | 'expires_at'
  | 'activated_at'
  | 'deactivated_at'
  | 'expired_at'
  | 'cancelled_at'
  | 'mode'
> &
  ResourceSort
// export type AgreementFilter = Pick<Agreement, 'id' | 'code' | 'name' | 'status' | 'recipient_email' | 'starts_at' | 'expires_at' | 'activated_at' | 'deactivated_at' | 'expired_at' | 'cancelled_at' | 'mode'> & ResourceFilter

/**
 * The Agreement object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/agreements endpoint.
 *
 * @link https://docs.commercelayer.io/provisioning-api-reference/agreements/object
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
   * The agreement status. One of `pending` (default), `active`, `inactive`, `expired`, or `cancelled`.
   * @example ```"pending"```
   */
  status: 'pending' | 'active' | 'inactive' | 'expired' | 'cancelled'
  /**
   * The buyer organization ID (hashid). Read-only — set only when the invited buyer accepts the agreement, either by registering with the recipient_email or via the accept_agreement endpoint.
   * @example ```"xYZaBcDeF1"```
   */
  buyer_organization_id?: string | null
  /**
   * The email address of the buyer to invite. An invitation is sent on create when this is set and the buyer organization is not yet bound. Also used to bind and auto-activate when that user registers or accepts.
   * @example ```"buyer@example.com"```
   */
  recipient_email?: string | null
  /**
   * The market this agreement applies to (hashid). Can also be set via the market relationship. Market is a Core resource.
   * @example ```"xYZaBcDeF1"```
   */
  market_id?: string | null
  /**
   * The default billing address for orders placed under this agreement (hashid). Can also be set via the billing_address relationship. Address is a Core resource.
   * @example ```"xYZaBcDeF1"```
   */
  billing_address_id?: string | null
  /**
   * The default shipping address for orders placed under this agreement (hashid). Can also be set via the shipping_address relationship. Address is a Core resource.
   * @example ```"xYZaBcDeF1"```
   */
  shipping_address_id?: string | null
  /**
   * The date/time from which this agreement is valid. Leave blank for no lower bound.
   * @example ```"2025-01-01T00:00:00.000Z"```
   */
  starts_at?: string | null
  /**
   * The date/time after which this agreement is no longer valid. When reached, status becomes expired automatically. Must be after starts_at when both are set. Distinct from expired_at.
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
  /**
   * Indicates the environment the resource belongs to (one of `test` or `live`). Read-only — copied from the market.
   * @example ```"test"```
   */
  mode?: string | null

  organization?: Organization | null
  market?: Market | null
  billing_address?: Address | null
  shipping_address?: Address | null
  buyer_organization?: Organization | null
  agreement_identities?: AgreementIdentity[] | null
}

interface AgreementCreate extends ResourceCreate {
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
   * The email address of the buyer to invite. An invitation is sent on create when this is set and the buyer organization is not yet bound. Also used to bind and auto-activate when that user registers or accepts.
   * @example ```"buyer@example.com"```
   */
  recipient_email?: string | null
  /**
   * The market this agreement applies to (hashid). Can also be set via the market relationship. Market is a Core resource.
   * @example ```"xYZaBcDeF1"```
   */
  market_id?: string | null
  /**
   * The default billing address for orders placed under this agreement (hashid). Can also be set via the billing_address relationship. Address is a Core resource.
   * @example ```"xYZaBcDeF1"```
   */
  billing_address_id?: string | null
  /**
   * The default shipping address for orders placed under this agreement (hashid). Can also be set via the shipping_address relationship. Address is a Core resource.
   * @example ```"xYZaBcDeF1"```
   */
  shipping_address_id?: string | null
  /**
   * The date/time from which this agreement is valid. Leave blank for no lower bound.
   * @example ```"2025-01-01T00:00:00.000Z"```
   */
  starts_at?: string | null
  /**
   * The date/time after which this agreement is no longer valid. When reached, status becomes expired automatically. Must be after starts_at when both are set. Distinct from expired_at.
   * @example ```"2026-01-01T00:00:00.000Z"```
   */
  expires_at?: string | null

  organization: OrganizationRel
  market: MarketRel
  billing_address?: AddressRel | null
  shipping_address?: AddressRel | null
}

interface AgreementUpdate extends ResourceUpdate {
  /**
   * The agreement identifier, unique per organization and environment. Optional — set by the seller.
   * @example ```"PO-2025-EU"```
   */
  code?: string | null
  /**
   * The agreement display name.
   * @example ```"Acme Corp — EU wholesale"```
   */
  name?: string | null
  /**
   * The email address of the buyer to invite. An invitation is sent on create when this is set and the buyer organization is not yet bound. Also used to bind and auto-activate when that user registers or accepts.
   * @example ```"buyer@example.com"```
   */
  recipient_email?: string | null
  /**
   * The market this agreement applies to (hashid). Can also be set via the market relationship. Market is a Core resource.
   * @example ```"xYZaBcDeF1"```
   */
  market_id?: string | null
  /**
   * The default billing address for orders placed under this agreement (hashid). Can also be set via the billing_address relationship. Address is a Core resource.
   * @example ```"xYZaBcDeF1"```
   */
  billing_address_id?: string | null
  /**
   * The default shipping address for orders placed under this agreement (hashid). Can also be set via the shipping_address relationship. Address is a Core resource.
   * @example ```"xYZaBcDeF1"```
   */
  shipping_address_id?: string | null
  /**
   * The date/time from which this agreement is valid. Leave blank for no lower bound.
   * @example ```"2025-01-01T00:00:00.000Z"```
   */
  starts_at?: string | null
  /**
   * The date/time after which this agreement is no longer valid. When reached, status becomes expired automatically. Must be after starts_at when both are set. Distinct from expired_at.
   * @example ```"2026-01-01T00:00:00.000Z"```
   */
  expires_at?: string | null
  /**
   * Send this attribute if you want to activate a pending or inactive agreement.
   * @example ```true```
   */
  _activate?: boolean | null
  /**
   * Send this attribute if you want to deactivate an active agreement.
   * @example ```true```
   */
  _deactivate?: boolean | null
  /**
   * Send this attribute if you want to cancel the agreement.
   * @example ```true```
   */
  _cancel?: boolean | null
  /**
   * Send this attribute if you want to resend the invitation email. Allowed only while the agreement is pending and the buyer organization is not yet bound.
   * @example ```true```
   */
  _resend_invitation?: boolean | null

  market?: MarketRel | null
  billing_address?: AddressRel | null
  shipping_address?: AddressRel | null
}

class Agreements extends ApiResource<Agreement> {
  static readonly TYPE: AgreementType = 'agreements' as const

  async create(
    resource: AgreementCreate,
    params?: QueryParamsRetrieve<Agreement>,
    options?: ResourcesConfig,
  ): Promise<Agreement> {
    return this.resources.create<AgreementCreate, Agreement>({ ...resource, type: Agreements.TYPE }, params, options)
  }

  async update(
    resource: AgreementUpdate,
    params?: QueryParamsRetrieve<Agreement>,
    options?: ResourcesConfig,
  ): Promise<Agreement> {
    return this.resources.update<AgreementUpdate, Agreement>({ ...resource, type: Agreements.TYPE }, params, options)
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: Agreements.TYPE } : id, options)
  }

  async organization(
    agreementId: string | Agreement,
    params?: QueryParamsRetrieve<Organization>,
    options?: ResourcesConfig,
  ): Promise<Organization> {
    const _agreementId = (agreementId as Agreement).id || (agreementId as string)
    return this.resources.fetch<Organization>(
      { type: 'organizations' },
      `agreements/${_agreementId}/organization`,
      params,
      options,
    ) as unknown as Organization
  }

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

  async _activate(
    id: string | Agreement,
    params?: QueryParamsRetrieve<Agreement>,
    options?: ResourcesConfig,
  ): Promise<Agreement> {
    return this.resources.update<AgreementUpdate, Agreement>(
      { id: typeof id === 'string' ? id : id.id, type: Agreements.TYPE, _activate: true },
      params,
      options,
    )
  }

  async _deactivate(
    id: string | Agreement,
    params?: QueryParamsRetrieve<Agreement>,
    options?: ResourcesConfig,
  ): Promise<Agreement> {
    return this.resources.update<AgreementUpdate, Agreement>(
      { id: typeof id === 'string' ? id : id.id, type: Agreements.TYPE, _deactivate: true },
      params,
      options,
    )
  }

  async _cancel(
    id: string | Agreement,
    params?: QueryParamsRetrieve<Agreement>,
    options?: ResourcesConfig,
  ): Promise<Agreement> {
    return this.resources.update<AgreementUpdate, Agreement>(
      { id: typeof id === 'string' ? id : id.id, type: Agreements.TYPE, _cancel: true },
      params,
      options,
    )
  }

  async _resend_invitation(
    id: string | Agreement,
    params?: QueryParamsRetrieve<Agreement>,
    options?: ResourcesConfig,
  ): Promise<Agreement> {
    return this.resources.update<AgreementUpdate, Agreement>(
      { id: typeof id === 'string' ? id : id.id, type: Agreements.TYPE, _resend_invitation: true },
      params,
      options,
    )
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

export type { Agreement, AgreementCreate, Agreements, AgreementType, AgreementUpdate }
