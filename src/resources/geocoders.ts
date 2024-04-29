import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsList } from '../query'

import type { Address } from './addresses'
import type { Attachment } from './attachments'


type GeocoderType = 'geocoders'
type GeocoderRel = ResourceRel & { type: GeocoderType }


export type GeocoderSort = Pick<Geocoder, 'id' | 'name'> & ResourceSort
// export type GeocoderFilter = Pick<Geocoder, 'id' | 'name'> & ResourceFilter


interface Geocoder extends Resource {
	
	readonly type: GeocoderType

	/** 
	 * The geocoder's internal name.
	 * @example ```"Default geocoder"```
	 */
	name: string

	addresses?: Address[] | null
	attachments?: Attachment[] | null

}


class Geocoders extends ApiResource<Geocoder> {

	static readonly TYPE: GeocoderType = 'geocoders' as const

	async addresses(geocoderId: string | Geocoder, params?: QueryParamsList<Address>, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		const _geocoderId = (geocoderId as Geocoder).id || geocoderId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `geocoders/${_geocoderId}/addresses`, params, options) as unknown as ListResponse<Address>
	}

	async attachments(geocoderId: string | Geocoder, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _geocoderId = (geocoderId as Geocoder).id || geocoderId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `geocoders/${_geocoderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isGeocoder(resource: any): resource is Geocoder {
		return resource.type && (resource.type === Geocoders.TYPE)
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


export default Geocoders

export type { Geocoder, GeocoderType }
