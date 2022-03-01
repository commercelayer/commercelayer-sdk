import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Address } from './addresses'
import { Attachment } from './attachments'


type GoogleGeocoderRel = ResourceRel & { type: typeof GoogleGeocoders.TYPE }


interface GoogleGeocoder extends Resource {
	
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


class GoogleGeocoders extends ApiResource {

	static readonly TYPE: 'google_geocoders' = 'google_geocoders'
	// static readonly PATH = 'google_geocoders'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<GoogleGeocoder>> {
		return this.resources.list<GoogleGeocoder>({ type: GoogleGeocoders.TYPE }, params, options)
	}

	async create(resource: GoogleGeocoderCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.create<GoogleGeocoderCreate, GoogleGeocoder>({ ...resource, type: GoogleGeocoders.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.retrieve<GoogleGeocoder>({ type: GoogleGeocoders.TYPE, id }, params, options)
	}

	async update(resource: GoogleGeocoderUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.update<GoogleGeocoderUpdate, GoogleGeocoder>({ ...resource, type: GoogleGeocoders.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: GoogleGeocoders.TYPE, id }, options)
	}

	async addresses(googleGeocoderId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		return this.resources.fetch<Address>({ type: 'addresses' }, `google_geocoders/${googleGeocoderId}/addresses`, params, options) as unknown as ListResponse<Address>
	}

	async attachments(googleGeocoderId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `google_geocoders/${googleGeocoderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isGoogleGeocoder(resource: any): resource is GoogleGeocoder {
		return resource.type && (resource.type === GoogleGeocoders.TYPE)
	}


	relationship(id: string | ResourceId | null): GoogleGeocoderRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: GoogleGeocoders.TYPE } : { id: id.id, type: GoogleGeocoders.TYPE }
	}


	type(): string {
		return GoogleGeocoders.TYPE
	}

}


export default GoogleGeocoders

export { GoogleGeocoder, GoogleGeocoderCreate, GoogleGeocoderUpdate }
