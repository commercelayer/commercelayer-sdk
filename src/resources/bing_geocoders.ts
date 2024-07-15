import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { Address } from './addresses'
import type { Attachment } from './attachments'


type BingGeocoderType = 'bing_geocoders'
type BingGeocoderRel = ResourceRel & { type: BingGeocoderType }


interface BingGeocoder extends Resource {
	
	readonly type: BingGeocoderType

	name: string

	markets?: Market[] | null
	addresses?: Address[] | null
	attachments?: Attachment[] | null

}


interface BingGeocoderCreate extends ResourceCreate {
	
	name: string
	key: string
	
}


interface BingGeocoderUpdate extends ResourceUpdate {
	
	name?: string | null
	key?: string | null
	
}


class BingGeocoders extends ApiResource<BingGeocoder> {

	static readonly TYPE: BingGeocoderType = 'bing_geocoders' as const

	async create(resource: BingGeocoderCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BingGeocoder> {
		return this.resources.create<BingGeocoderCreate, BingGeocoder>({ ...resource, type: BingGeocoders.TYPE }, params, options)
	}

	async update(resource: BingGeocoderUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BingGeocoder> {
		return this.resources.update<BingGeocoderUpdate, BingGeocoder>({ ...resource, type: BingGeocoders.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: BingGeocoders.TYPE } : id, options)
	}

	async markets(bingGeocoderId: string | BingGeocoder, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _bingGeocoderId = (bingGeocoderId as BingGeocoder).id || bingGeocoderId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `bing_geocoders/${_bingGeocoderId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async addresses(bingGeocoderId: string | BingGeocoder, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		const _bingGeocoderId = (bingGeocoderId as BingGeocoder).id || bingGeocoderId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `bing_geocoders/${_bingGeocoderId}/addresses`, params, options) as unknown as ListResponse<Address>
	}

	async attachments(bingGeocoderId: string | BingGeocoder, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _bingGeocoderId = (bingGeocoderId as BingGeocoder).id || bingGeocoderId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `bing_geocoders/${_bingGeocoderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isBingGeocoder(resource: any): resource is BingGeocoder {
		return resource.type && (resource.type === BingGeocoders.TYPE)
	}


	relationship(id: string | ResourceId | null): BingGeocoderRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: BingGeocoders.TYPE } : { id: id.id, type: BingGeocoders.TYPE }
	}


	type(): BingGeocoderType {
		return BingGeocoders.TYPE
	}

}


export default BingGeocoders

export type { BingGeocoder, BingGeocoderCreate, BingGeocoderUpdate, BingGeocoderType }
