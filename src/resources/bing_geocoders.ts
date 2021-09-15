/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Address } from './addresses'
import { Attachment } from './attachments'


type BingGeocoderRel = ResourceId & { type: typeof BingGeocoders.TYPE }


interface BingGeocoder extends Resource {
	
	name?: string

	addresses?: Address[]
	attachments?: Attachment[]

}


interface BingGeocoderCreate extends ResourceCreate {
	
	name: string
	key: string
	
}


interface BingGeocoderUpdate extends ResourceUpdate {
	
	name?: string
	key?: string
	
}


class BingGeocoders extends ApiResource {

	static readonly TYPE: 'bing_geocoders' = 'bing_geocoders'
	// static readonly PATH = 'bing_geocoders'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BingGeocoder>> {
		return this.resources.list({ type: BingGeocoders.TYPE }, params, options)
	}

	async create(resource: BingGeocoderCreate, options?: ResourcesConfig): Promise<BingGeocoder> {
		return this.resources.create(Object.assign(resource, { type: BingGeocoders.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BingGeocoder> {
		return this.resources.retrieve<BingGeocoder>({ type: BingGeocoders.TYPE, id }, params, options)
	}

	async update(resource: BingGeocoderUpdate, options?: ResourcesConfig): Promise<BingGeocoder> {
		return this.resources.update({ ...resource, type: BingGeocoders.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: BingGeocoders.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isBingGeocoder(resource: any): resource is BingGeocoder {
		return resource.type && (resource.type === BingGeocoders.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(BingGeocoders.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(BingGeocoders.TYPE)
	}
	*/

	relationship(id: string | ResourceId): BingGeocoderRel {
		return (typeof id === 'string') ? { id, type: BingGeocoders.TYPE } : {id: id.id, type: BingGeocoders.TYPE }
	}

}


export default BingGeocoders

export { BingGeocoder, BingGeocoderCreate, BingGeocoderUpdate }
