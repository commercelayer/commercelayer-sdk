import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Address, AddressSortable } from './addresses'
import type { Attachment, AttachmentSortable } from './attachments'


type GoogleGeocoderType = 'google_geocoders'
type GoogleGeocoderRel = ResourceRel & { type: GoogleGeocoderType }


export type GoogleGeocoderSortable = Pick<GoogleGeocoder, 'id' | 'name'> & ResourceSortable
export type GoogleGeocoderFilterable = Pick<GoogleGeocoder, 'id' | 'name'> & ResourceFilterable


interface GoogleGeocoder extends Resource {
	
	readonly type: GoogleGeocoderType

	name: string

	addresses?: Address[] | null
	attachments?: Attachment[] | null

}


interface GoogleGeocoderCreate extends ResourceCreate {
	
	name: string
	api_key: string
	
}


interface GoogleGeocoderUpdate extends ResourceUpdate {
	
	name?: string | null
	api_key?: string | null
	
}


class GoogleGeocoders extends ApiResource<GoogleGeocoder, GoogleGeocoderSortable> {

	static readonly TYPE: GoogleGeocoderType = 'google_geocoders' as const

	async create(resource: GoogleGeocoderCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.create<GoogleGeocoderCreate, GoogleGeocoder>({ ...resource, type: GoogleGeocoders.TYPE }, params, options)
	}

	async update(resource: GoogleGeocoderUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.update<GoogleGeocoderUpdate, GoogleGeocoder>({ ...resource, type: GoogleGeocoders.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: GoogleGeocoders.TYPE } : id, options)
	}

	async addresses(googleGeocoderId: string | GoogleGeocoder, params?: QueryParamsList<AddressSortable>, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		const _googleGeocoderId = (googleGeocoderId as GoogleGeocoder).id || googleGeocoderId as string
		return this.resources.fetch<Address, AddressSortable>({ type: 'addresses' }, `google_geocoders/${_googleGeocoderId}/addresses`, params, options) as unknown as ListResponse<Address>
	}

	async attachments(googleGeocoderId: string | GoogleGeocoder, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _googleGeocoderId = (googleGeocoderId as GoogleGeocoder).id || googleGeocoderId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `google_geocoders/${_googleGeocoderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isGoogleGeocoder(resource: any): resource is GoogleGeocoder {
		return resource.type && (resource.type === GoogleGeocoders.TYPE)
	}


	relationship(id: string | ResourceId | null): GoogleGeocoderRel {
		return super.relationshipOneToOne<GoogleGeocoderRel>(id)
	}

	relationshipToMany(...ids: string[]): GoogleGeocoderRel[] {
		return super.relationshipOneToMany<GoogleGeocoderRel>(...ids)
	}


	type(): GoogleGeocoderType {
		return GoogleGeocoders.TYPE
	}

}


export default GoogleGeocoders

export type { GoogleGeocoder, GoogleGeocoderCreate, GoogleGeocoderUpdate, GoogleGeocoderType }

/*
export const GoogleGeocodersClient = (init: ResourceAdapter | ResourcesInitConfig): GoogleGeocoders => {
	return new GoogleGeocoders((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
