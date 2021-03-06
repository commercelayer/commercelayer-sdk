import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Address } from './addresses'
import type { Attachment } from './attachments'


type GeocoderRel = ResourceRel & { type: typeof Geocoders.TYPE }


interface Geocoder extends Resource {
	
	name?: string

	addresses?: Address[]
	attachments?: Attachment[]

}


class Geocoders extends ApiResource {

	static readonly TYPE: 'geocoders' = 'geocoders'
	// static readonly PATH = 'geocoders'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Geocoder>> {
		return this.resources.list<Geocoder>({ type: Geocoders.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Geocoder> {
		return this.resources.retrieve<Geocoder>({ type: Geocoders.TYPE, id }, params, options)
	}

	async addresses(geocoderId: string | Geocoder, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		const _geocoderId = (geocoderId as Geocoder).id || geocoderId
		return this.resources.fetch<Address>({ type: 'addresses' }, `geocoders/${_geocoderId}/addresses`, params, options) as unknown as ListResponse<Address>
	}

	async attachments(geocoderId: string | Geocoder, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _geocoderId = (geocoderId as Geocoder).id || geocoderId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `geocoders/${_geocoderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isGeocoder(resource: any): resource is Geocoder {
		return resource.type && (resource.type === Geocoders.TYPE)
	}


	relationship(id: string | ResourceId | null): GeocoderRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Geocoders.TYPE } : { id: id.id, type: Geocoders.TYPE }
	}


	type(): string {
		return Geocoders.TYPE
	}

}


export default Geocoders

export { Geocoder }
