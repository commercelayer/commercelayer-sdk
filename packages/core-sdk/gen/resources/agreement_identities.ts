import type { QueryParamsList, QueryParamsRetrieve } from '@runtime/query'
import type {
  ListResponse,
  Resource,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
  ResourceUpdate,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'

import type { Agreement } from './agreements'
import type { Customer } from './customers'
import type { EventStore } from './event_stores'

type AgreementIdentityType = 'agreement_identities'
type AgreementIdentityRel = ResourceRel & { type: AgreementIdentityType }

export type AgreementIdentitySort = Pick<AgreementIdentity, 'id' | 'member_id' | 'disabled_at'> & ResourceSort
// export type AgreementIdentityFilter = Pick<AgreementIdentity, 'id' | 'member_id' | 'inbound_messages_enabled' | 'disabled_at'> & ResourceFilter

/**
 * The Agreement identity object is returned as part of the response body of each successful list, retrieve or update API call to the /api/agreement_identities endpoint.
 *
 * @deprecated Last available in API version 2017-08.
 * @link https://docs.commercelayer.io/core-api-reference/agreement_identities/object
 */
interface AgreementIdentity extends Resource {
  readonly type: AgreementIdentityType

  /**
   * The buyer-org membership hashid (cross-tenant reference — no DB FK constraint).
   * @example ```"xYZaBcDeF1"```
   */
  member_id: string
  /**
   * Enables email-to-order for this identity. Inbound messages are skipped unless this is true.
   * @example ```true```
   */
  inbound_messages_enabled?: boolean | null
  /**
   * Time at which this resource was disabled.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  disabled_at?: string | null

  agreement?: Agreement | null
  customer?: Customer | null
  event_stores?: EventStore[] | null
}

interface AgreementIdentityUpdate extends ResourceUpdate {
  /**
   * Enables email-to-order for this identity. Inbound messages are skipped unless this is true.
   * @example ```true```
   */
  inbound_messages_enabled?: boolean | null
  /**
   * Send this attribute if you want to mark this resource as disabled.
   * @example ```true```
   */
  _disable?: boolean | null
  /**
   * Send this attribute if you want to mark this resource as enabled.
   * @example ```true```
   */
  _enable?: boolean | null
}

/** @deprecated Last available in API version 2017-08. */
class AgreementIdentities extends ApiResource<AgreementIdentity> {
  static readonly TYPE: AgreementIdentityType = 'agreement_identities' as const

  async update(
    resource: AgreementIdentityUpdate,
    params?: QueryParamsRetrieve<AgreementIdentity>,
    options?: ResourcesConfig,
  ): Promise<AgreementIdentity> {
    return this.resources.update<AgreementIdentityUpdate, AgreementIdentity>(
      { ...resource, type: AgreementIdentities.TYPE },
      params,
      options,
    )
  }

  async agreement(
    agreementIdentityId: string | AgreementIdentity,
    params?: QueryParamsRetrieve<Agreement>,
    options?: ResourcesConfig,
  ): Promise<Agreement> {
    const _agreementIdentityId = (agreementIdentityId as AgreementIdentity).id || (agreementIdentityId as string)
    return this.resources.fetch<Agreement>(
      { type: 'agreements' },
      `agreement_identities/${_agreementIdentityId}/agreement`,
      params,
      options,
    ) as unknown as Agreement
  }

  async customer(
    agreementIdentityId: string | AgreementIdentity,
    params?: QueryParamsRetrieve<Customer>,
    options?: ResourcesConfig,
  ): Promise<Customer> {
    const _agreementIdentityId = (agreementIdentityId as AgreementIdentity).id || (agreementIdentityId as string)
    return this.resources.fetch<Customer>(
      { type: 'customers' },
      `agreement_identities/${_agreementIdentityId}/customer`,
      params,
      options,
    ) as unknown as Customer
  }

  async event_stores(
    agreementIdentityId: string | AgreementIdentity,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _agreementIdentityId = (agreementIdentityId as AgreementIdentity).id || (agreementIdentityId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `agreement_identities/${_agreementIdentityId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _disable(
    id: string | AgreementIdentity,
    params?: QueryParamsRetrieve<AgreementIdentity>,
    options?: ResourcesConfig,
  ): Promise<AgreementIdentity> {
    return this.resources.update<AgreementIdentityUpdate, AgreementIdentity>(
      { id: typeof id === 'string' ? id : id.id, type: AgreementIdentities.TYPE, _disable: true },
      params,
      options,
    )
  }

  async _enable(
    id: string | AgreementIdentity,
    params?: QueryParamsRetrieve<AgreementIdentity>,
    options?: ResourcesConfig,
  ): Promise<AgreementIdentity> {
    return this.resources.update<AgreementIdentityUpdate, AgreementIdentity>(
      { id: typeof id === 'string' ? id : id.id, type: AgreementIdentities.TYPE, _enable: true },
      params,
      options,
    )
  }

  isAgreementIdentity(resource: any): resource is AgreementIdentity {
    return resource.type && resource.type === AgreementIdentities.TYPE
  }

  relationship(id: string | ResourceId | null): AgreementIdentityRel {
    return super.relationshipOneToOne<AgreementIdentityRel>(id)
  }

  relationshipToMany(...ids: string[]): AgreementIdentityRel[] {
    return super.relationshipOneToMany<AgreementIdentityRel>(...ids)
  }

  type(): AgreementIdentityType {
    return AgreementIdentities.TYPE
  }
}

const instance = new AgreementIdentities()
export default instance

export type { AgreementIdentities, AgreementIdentity, AgreementIdentityType, AgreementIdentityUpdate }
