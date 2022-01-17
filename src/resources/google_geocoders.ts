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
		return this.resources.list({ type: GoogleGeocoders.TYPE }, params, options)
	}

	async create(resource: GoogleGeocoderCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.create({ ...resource, type: GoogleGeocoders.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.retrieve<GoogleGeocoder>({ type: GoogleGeocoders.TYPE, id }, params, options)
	}

	async update(resource: GoogleGeocoderUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.update({ ...resource, type: GoogleGeocoders.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: GoogleGeocoders.TYPE, id }, options)
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
