import { ApiResource, Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList } from '../query'

import type { Address } from './addresses'
import type { Attachment } from './attachments'


type GeocoderType = 'geocoders'
type GeocoderRel = ResourceRel & { type: GeocoderType }


interface Geocoder extends Resource {
	
	readonly type: GeocoderType

	name: string

	addresses?: Address[]
	attachments?: Attachment[]

}


class Geocoders extends ApiResource<Geocoder> {

	static readonly TYPE: GeocoderType = 'geocoders' as const
	// static readonly PATH = 'geocoders'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Geocoder>> {
		return this.resources.list<Geocoder>({ type: Geocoders.TYPE }, params, options)
	}

	async addresses(geocoderId: string | Geocoder, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		const _geocoderId = (geocoderId as Geocoder).id || geocoderId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `geocoders/${_geocoderId}/addresses`, params, options) as unknown as ListResponse<Address>
	}

	async attachments(geocoderId: string | Geocoder, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _geocoderId = (geocoderId as Geocoder).id || geocoderId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `geocoders/${_geocoderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isGeocoder(resource: any): resource is Geocoder {
		return resource.type && (resource.type === Geocoders.TYPE)
	}


	relationship(id: string | ResourceId | null): GeocoderRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Geocoders.TYPE } : { id: id.id, type: Geocoders.TYPE }
	}


	type(): GeocoderType {
		return Geocoders.TYPE
	}

}


export default Geocoders

export type { Geocoder, GeocoderType }
