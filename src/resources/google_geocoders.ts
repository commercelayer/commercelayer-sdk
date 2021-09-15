/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Address } from './addresses'
import { Attachment } from './attachments'


type GoogleGeocoderRel = ResourceId & { type: typeof GoogleGeocoders.TYPE }


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

	async create(resource: GoogleGeocoderCreate, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.create(Object.assign(resource, { type: GoogleGeocoders.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.retrieve<GoogleGeocoder>({ type: GoogleGeocoders.TYPE, id }, params, options)
	}

	async update(resource: GoogleGeocoderUpdate, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.update({ ...resource, type: GoogleGeocoders.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: GoogleGeocoders.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isGoogleGeocoder(resource: any): resource is GoogleGeocoder {
		return resource.type && (resource.type === GoogleGeocoders.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(GoogleGeocoders.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(GoogleGeocoders.TYPE)
	}
	*/

	relationship(id: string | ResourceId): GoogleGeocoderRel {
		return (typeof id === 'string') ? { id, type: GoogleGeocoders.TYPE } : {id: id.id, type: GoogleGeocoders.TYPE }
	}

}


export default GoogleGeocoders

export { GoogleGeocoder, GoogleGeocoderCreate, GoogleGeocoderUpdate }
