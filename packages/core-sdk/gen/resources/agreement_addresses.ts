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
import type { Agreement, AgreementType } from './agreements'
import type { EventStore } from './event_stores'

type AgreementAddressType = 'agreement_addresses'
type AgreementAddressRel = ResourceRel & { type: AgreementAddressType }
type AgreementRel = ResourceRel & { type: AgreementType }
type AddressRel = ResourceRel & { type: AddressType }

export type AgreementAddressSort = Pick<AgreementAddress, 'id' | 'name'> & ResourceSort
// export type AgreementAddressFilter = Pick<AgreementAddress, 'id' | 'name'> & ResourceFilter

/**
 * The Agreement address object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/agreement_addresses endpoint.
 *
 * @deprecated Deprecated in API version 2026-05.
 * @link https://docs.commercelayer.io/core-api-reference/agreement_addresses/object
 */
interface AgreementAddress extends Resource {
  readonly type: AgreementAddressType

  /**
   * The buyer's own name or code for this destination (e.g. a plant or warehouse), matched against the delivery place written on inbound orders.
   * @example ```"North warehouse"```
   */
  name?: string | null

  agreement?: Agreement | null
  address?: Address | null
  event_stores?: EventStore[] | null
}

interface AgreementAddressCreate extends ResourceCreate {
  /**
   * The buyer's own name or code for this destination (e.g. a plant or warehouse), matched against the delivery place written on inbound orders.
   * @example ```"North warehouse"```
   */
  name?: string | null

  agreement: AgreementRel
  address: AddressRel
}

interface AgreementAddressUpdate extends ResourceUpdate {
  /**
   * The buyer's own name or code for this destination (e.g. a plant or warehouse), matched against the delivery place written on inbound orders.
   * @example ```"North warehouse"```
   */
  name?: string | null

  address?: AddressRel | null
}

/** @deprecated Deprecated in API version 2026-05. */
class AgreementAddresses extends ApiResource<AgreementAddress> {
  static readonly TYPE: AgreementAddressType = 'agreement_addresses' as const

  async create(
    resource: AgreementAddressCreate,
    params?: QueryParamsRetrieve<AgreementAddress>,
    options?: ResourcesConfig,
  ): Promise<AgreementAddress> {
    return this.resources.create<AgreementAddressCreate, AgreementAddress>(
      { ...resource, type: AgreementAddresses.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: AgreementAddressUpdate,
    params?: QueryParamsRetrieve<AgreementAddress>,
    options?: ResourcesConfig,
  ): Promise<AgreementAddress> {
    return this.resources.update<AgreementAddressUpdate, AgreementAddress>(
      { ...resource, type: AgreementAddresses.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: AgreementAddresses.TYPE } : id, options)
  }

  async agreement(
    agreementAddressId: string | AgreementAddress,
    params?: QueryParamsRetrieve<Agreement>,
    options?: ResourcesConfig,
  ): Promise<Agreement> {
    const _agreementAddressId = (agreementAddressId as AgreementAddress).id || (agreementAddressId as string)
    return this.resources.fetch<Agreement>(
      { type: 'agreements' },
      `agreement_addresses/${_agreementAddressId}/agreement`,
      params,
      options,
    ) as unknown as Agreement
  }

  async address(
    agreementAddressId: string | AgreementAddress,
    params?: QueryParamsRetrieve<Address>,
    options?: ResourcesConfig,
  ): Promise<Address> {
    const _agreementAddressId = (agreementAddressId as AgreementAddress).id || (agreementAddressId as string)
    return this.resources.fetch<Address>(
      { type: 'addresses' },
      `agreement_addresses/${_agreementAddressId}/address`,
      params,
      options,
    ) as unknown as Address
  }

  async event_stores(
    agreementAddressId: string | AgreementAddress,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _agreementAddressId = (agreementAddressId as AgreementAddress).id || (agreementAddressId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `agreement_addresses/${_agreementAddressId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isAgreementAddress(resource: any): resource is AgreementAddress {
    return resource.type && resource.type === AgreementAddresses.TYPE
  }

  relationship(id: string | ResourceId | null): AgreementAddressRel {
    return super.relationshipOneToOne<AgreementAddressRel>(id)
  }

  relationshipToMany(...ids: string[]): AgreementAddressRel[] {
    return super.relationshipOneToMany<AgreementAddressRel>(...ids)
  }

  type(): AgreementAddressType {
    return AgreementAddresses.TYPE
  }
}

const instance = new AgreementAddresses()
export default instance

export type {
  AgreementAddress,
  AgreementAddressCreate,
  AgreementAddresses,
  AgreementAddressType,
  AgreementAddressUpdate,
}
