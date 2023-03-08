import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Address } from './addresses'
import type { Attachment } from './attachments'


type GoogleGeocoderType = 'google_geocoders'
type GoogleGeocoderRel = ResourceRel & { type: GoogleGeocoderType }


interface GoogleGeocoder extends Resource {
	
	readonly type: GoogleGeocoderType

	name?: string

	addresses?: Address[]
	attachments?: Attachment[]

}


interface GoogleGeocoderCreate extends ResourceCreate {
	
	name: string
	api_key: string
	
}


interface GoogleGeocoderUpdate extends ResourceUpdate {
	
	name?: string
	api_key?: string
	
}


class GoogleGeocoders extends ApiResource<GoogleGeocoder> {

	static readonly TYPE: GoogleGeocoderType = 'google_geocoders' as const
	// static readonly PATH = 'google_geocoders'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<GoogleGeocoder>> {
		return this.resources.list<GoogleGeocoder>({ type: GoogleGeocoders.TYPE }, params, options)
	}

	async create(resource: GoogleGeocoderCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.create<GoogleGeocoderCreate, GoogleGeocoder>({ ...resource, type: GoogleGeocoders.TYPE }, params, options)
	}

	async update(resource: GoogleGeocoderUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.update<GoogleGeocoderUpdate, GoogleGeocoder>({ ...resource, type: GoogleGeocoders.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: GoogleGeocoders.TYPE } : id, options)
	}

	async addresses(googleGeocoderId: string | GoogleGeocoder, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		const _googleGeocoderId = (googleGeocoderId as GoogleGeocoder).id || googleGeocoderId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `google_geocoders/${_googleGeocoderId}/addresses`, params, options) as unknown as ListResponse<Address>
	}

	async attachments(googleGeocoderId: string | GoogleGeocoder, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _googleGeocoderId = (googleGeocoderId as GoogleGeocoder).id || googleGeocoderId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `google_geocoders/${_googleGeocoderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isGoogleGeocoder(resource: any): resource is GoogleGeocoder {
		return resource.type && (resource.type === GoogleGeocoders.TYPE)
	}


	relationship(id: string | ResourceId | null): GoogleGeocoderRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: GoogleGeocoders.TYPE } : { id: id.id, type: GoogleGeocoders.TYPE }
	}


	type(): GoogleGeocoderType {
		return GoogleGeocoders.TYPE
	}

}


export default GoogleGeocoders

export type { GoogleGeocoder, GoogleGeocoderCreate, GoogleGeocoderUpdate, GoogleGeocoderType }
