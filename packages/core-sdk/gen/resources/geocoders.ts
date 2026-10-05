import type { QueryParamsList } from '@runtime/query'
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
import type { Attachment } from './attachments'
import type { BingGeocoder } from './bing_geocoders'
import type { EventStore } from './event_stores'
import type { GoogleGeocoder } from './google_geocoders'
import type { Market } from './markets'

type GeocoderType = 'geocoders' | 'bing_geocoders' | 'google_geocoders'
type GeocoderRel = ResourceRel & { type: GeocoderType }

export type GeocoderSort = Pick<GeocoderBase, 'id' | 'name'> & ResourceSort
// export type GeocoderFilter = Pick<Geocoder, 'id' | 'name'> & ResourceFilter

/**
 * The Geocoder object is returned as part of the response body of each successful list or retrieve API call to the /api/geocoders endpoint.
 *
 * @link https://docs.commercelayer.io/core-api-reference/geocoders/object
 */
type Geocoder = BingGeocoder | GoogleGeocoder

interface GeocoderBase extends Resource {
  readonly type: GeocoderType

  /**
   * The geocoder's internal name.
   * @example ```"Default geocoder"```
   */
  name: string

  markets?: Market[] | null
  addresses?: Address[] | null
  attachments?: Attachment[] | null
  event_stores?: EventStore[] | null
}

class Geocoders extends ApiResource<Geocoder> {
  static readonly TYPE: GeocoderType = 'geocoders' as const

  async markets(
    geocoderId: string | Geocoder,
    params?: QueryParamsList<Market>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Market>> {
    const _geocoderId = (geocoderId as Geocoder).id || (geocoderId as string)
    return this.resources.fetch<Market>(
      { type: 'markets' },
      `geocoders/${_geocoderId}/markets`,
      params,
      options,
    ) as unknown as ListResponse<Market>
  }

  async addresses(
    geocoderId: string | Geocoder,
    params?: QueryParamsList<Address>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Address>> {
    const _geocoderId = (geocoderId as Geocoder).id || (geocoderId as string)
    return this.resources.fetch<Address>(
      { type: 'addresses' },
      `geocoders/${_geocoderId}/addresses`,
      params,
      options,
    ) as unknown as ListResponse<Address>
  }

  async attachments(
    geocoderId: string | Geocoder,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _geocoderId = (geocoderId as Geocoder).id || (geocoderId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `geocoders/${_geocoderId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async event_stores(
    geocoderId: string | Geocoder,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _geocoderId = (geocoderId as Geocoder).id || (geocoderId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `geocoders/${_geocoderId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isGeocoder(resource: any): resource is Geocoder {
    return (
      !!resource.type &&
      (resource.type === Geocoders.TYPE || ['bing_geocoders', 'google_geocoders'].includes(resource.type))
    )
  }

  relationship(id: string | ResourceId | null): GeocoderRel {
    return super.relationshipOneToOne<GeocoderRel>(id)
  }

  relationshipToMany(...ids: string[]): GeocoderRel[] {
    return super.relationshipOneToMany<GeocoderRel>(...ids)
  }

  type(): GeocoderType {
    return Geocoders.TYPE
  }
}

const instance = new Geocoders()
export default instance

export type { Geocoder, Geocoders, GeocoderType }
