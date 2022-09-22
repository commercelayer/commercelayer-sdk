import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Address } from './addresses'
import type { Attachment } from './attachments'


type BingGeocoderRel = ResourceRel & { type: typeof BingGeocoders.TYPE }


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

	static readonly TYPE: 'bing_geocoders' = 'bing_geocoders' as const
	// static readonly PATH = 'bing_geocoders'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BingGeocoder>> {
		return this.resources.list<BingGeocoder>({ type: BingGeocoders.TYPE }, params, options)
	}

	async create(resource: BingGeocoderCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BingGeocoder> {
		return this.resources.create<BingGeocoderCreate, BingGeocoder>({ ...resource, type: BingGeocoders.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BingGeocoder> {
		return this.resources.retrieve<BingGeocoder>({ type: BingGeocoders.TYPE, id }, params, options)
	}

	async update(resource: BingGeocoderUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BingGeocoder> {
		return this.resources.update<BingGeocoderUpdate, BingGeocoder>({ ...resource, type: BingGeocoders.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: BingGeocoders.TYPE, id }, options)
	}

	async addresses(bingGeocoderId: string | BingGeocoder, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		const _bingGeocoderId = (bingGeocoderId as BingGeocoder).id || bingGeocoderId
		return this.resources.fetch<Address>({ type: 'addresses' }, `bing_geocoders/${_bingGeocoderId}/addresses`, params, options) as unknown as ListResponse<Address>
	}

	async attachments(bingGeocoderId: string | BingGeocoder, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _bingGeocoderId = (bingGeocoderId as BingGeocoder).id || bingGeocoderId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `bing_geocoders/${_bingGeocoderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isBingGeocoder(resource: any): resource is BingGeocoder {
		return resource.type && (resource.type === BingGeocoders.TYPE)
	}


	relationship(id: string | ResourceId | null): BingGeocoderRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: BingGeocoders.TYPE } : { id: id.id, type: BingGeocoders.TYPE }
	}


	type(): string {
		return BingGeocoders.TYPE
	}

}


export default BingGeocoders

export { BingGeocoder, BingGeocoderCreate, BingGeocoderUpdate }
