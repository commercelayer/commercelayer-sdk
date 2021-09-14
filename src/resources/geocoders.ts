/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList } from '../query'

import { Address } from './addresses'
import { Attachment } from './attachments'


type GeocoderRel = ResourceId & { type: typeof Geocoders.TYPE }


interface Geocoder extends Resource {
	
	name?: string

	addresses?: Address[]
	attachments?: Attachment[]

}


class Geocoders extends ApiResource {

	static readonly TYPE: 'geocoders' = 'geocoders'
	// static readonly PATH = 'geocoders'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Geocoder>> {
		return this.resources.list({ type: Geocoders.TYPE }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isGeocoder(resource: any): resource is Geocoder {
		return resource.type && (resource.type === Geocoders.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Geocoders.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Geocoders.TYPE)
	}
	*/

	relationship(id: string | ResourceId): GeocoderRel {
		return (typeof id === 'string') ? { id, type: Geocoders.TYPE } : {id: id.id, type: Geocoders.TYPE }
	}

}


export default Geocoders

export { Geocoder }
