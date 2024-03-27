import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsList } from '../query'

import type { Address, AddressSortable } from './addresses'
import type { Attachment, AttachmentSortable } from './attachments'


type GeocoderType = 'geocoders'
type GeocoderRel = ResourceRel & { type: GeocoderType }


export type GeocoderSortable = Pick<Geocoder, 'id' | 'name'> & ResourceSortable
export type GeocoderFilterable = Pick<Geocoder, 'id' | 'name'> & ResourceFilterable


interface Geocoder extends Resource {
	
	readonly type: GeocoderType

	name: string

	addresses?: Address[] | null
	attachments?: Attachment[] | null

}


class Geocoders extends ApiResource<Geocoder, GeocoderSortable> {

	static readonly TYPE: GeocoderType = 'geocoders' as const

	async addresses(geocoderId: string | Geocoder, params?: QueryParamsList<AddressSortable>, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		const _geocoderId = (geocoderId as Geocoder).id || geocoderId as string
		return this.resources.fetch<Address, AddressSortable>({ type: 'addresses' }, `geocoders/${_geocoderId}/addresses`, params, options) as unknown as ListResponse<Address>
	}

	async attachments(geocoderId: string | Geocoder, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _geocoderId = (geocoderId as Geocoder).id || geocoderId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `geocoders/${_geocoderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
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

/*
export const GeocodersClient = (init: ResourceAdapter | ResourcesInitConfig): Geocoders => {
	return new Geocoders((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
