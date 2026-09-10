import type { QueryParamsRetrieve } from '@runtime/query'
import type {
  Resource,
  ResourceCreate,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
  ResourceUpdate,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'
import type { Agreement, AgreementType } from './agreements'
import type { Organization } from './organizations'

type AgreementIdentityType = 'agreement_identities'
type AgreementIdentityRel = ResourceRel & { type: AgreementIdentityType }
type AgreementRel = ResourceRel & { type: AgreementType }

export type AgreementIdentitySort = Pick<AgreementIdentity, 'id' | 'member_id' | 'mode' | 'disabled_at'> & ResourceSort
// export type AgreementIdentityFilter = Pick<AgreementIdentity, 'id' | 'member_id' | 'mode' | 'disabled_at'> & ResourceFilter

/**
 * The Agreement identity object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/agreement_identities endpoint.
 *
 * @link https://docs.commercelayer.io/provisioning-api-reference/agreement_identities/object
 */
interface AgreementIdentity extends Resource {
  readonly type: AgreementIdentityType

  /**
   * The buyer-org membership hashid (cross-tenant reference — no DB FK constraint).
   * @example ```"xYZaBcDeF1"```
   */
  member_id: string
  /**
   * The seller-side customer authorized to buy under the agreement (hashid). Read-only — derived from the member's email on the seller organization. Customer is a Core resource, so this is an ID reference rather than a JSON:API relationship.
   * @example ```"xYZaBcDeF1"```
   */
  customer_id?: string | null
  /**
   * Indicates the environment the resource belongs to (one of `test` or `live`). Read-only — derived from the agreement.
   * @example ```"test"```
   */
  mode?: string | null
  /**
   * Time at which this resource was disabled.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  disabled_at?: string | null

  organization?: Organization | null
  agreement?: Agreement | null
}

interface AgreementIdentityCreate extends ResourceCreate {
  /**
   * The buyer-org membership hashid (cross-tenant reference — no DB FK constraint).
   * @example ```"xYZaBcDeF1"```
   */
  member_id: string
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

  agreement: AgreementRel
}

interface AgreementIdentityUpdate extends ResourceUpdate {
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

class AgreementIdentities extends ApiResource<AgreementIdentity> {
  static readonly TYPE: AgreementIdentityType = 'agreement_identities' as const

  async create(
    resource: AgreementIdentityCreate,
    params?: QueryParamsRetrieve<AgreementIdentity>,
    options?: ResourcesConfig,
  ): Promise<AgreementIdentity> {
    return this.resources.create<AgreementIdentityCreate, AgreementIdentity>(
      { ...resource, type: AgreementIdentities.TYPE },
      params,
      options,
    )
  }

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

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: AgreementIdentities.TYPE } : id, options)
  }

  async organization(
    agreementIdentityId: string | AgreementIdentity,
    params?: QueryParamsRetrieve<Organization>,
    options?: ResourcesConfig,
  ): Promise<Organization> {
    const _agreementIdentityId = (agreementIdentityId as AgreementIdentity).id || (agreementIdentityId as string)
    return this.resources.fetch<Organization>(
      { type: 'organizations' },
      `agreement_identities/${_agreementIdentityId}/organization`,
      params,
      options,
    ) as unknown as Organization
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

export type {
  AgreementIdentities,
  AgreementIdentity,
  AgreementIdentityCreate,
  AgreementIdentityType,
  AgreementIdentityUpdate,
}
