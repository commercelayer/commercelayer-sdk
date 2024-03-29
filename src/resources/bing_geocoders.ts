import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Address } from './addresses'
import type { Attachment } from './attachments'


type BingGeocoderType = 'bing_geocoders'
type BingGeocoderRel = ResourceRel & { type: BingGeocoderType }


export type BingGeocoderSort = Pick<BingGeocoder, 'id' | 'name'> & ResourceSort
// export type BingGeocoderFilter = Pick<BingGeocoder, 'id' | 'name'> & ResourceFilter


interface BingGeocoder extends Resource {
	
	readonly type: BingGeocoderType

	name: string

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

	async create(resource: BingGeocoderCreate, params?: QueryParamsRetrieve<BingGeocoder>, options?: ResourcesConfig): Promise<BingGeocoder> {
		return this.resources.create<BingGeocoderCreate, BingGeocoder>({ ...resource, type: BingGeocoders.TYPE }, params, options)
	}

	async update(resource: BingGeocoderUpdate, params?: QueryParamsRetrieve<BingGeocoder>, options?: ResourcesConfig): Promise<BingGeocoder> {
		return this.resources.update<BingGeocoderUpdate, BingGeocoder>({ ...resource, type: BingGeocoders.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: BingGeocoders.TYPE } : id, options)
	}

	async addresses(bingGeocoderId: string | BingGeocoder, params?: QueryParamsList<Address>, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		const _bingGeocoderId = (bingGeocoderId as BingGeocoder).id || bingGeocoderId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `bing_geocoders/${_bingGeocoderId}/addresses`, params, options) as unknown as ListResponse<Address>
	}

	async attachments(bingGeocoderId: string | BingGeocoder, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _bingGeocoderId = (bingGeocoderId as BingGeocoder).id || bingGeocoderId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `bing_geocoders/${_bingGeocoderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isBingGeocoder(resource: any): resource is BingGeocoder {
		return resource.type && (resource.type === BingGeocoders.TYPE)
	}


	relationship(id: string | ResourceId | null): BingGeocoderRel {
		return super.relationshipOneToOne<BingGeocoderRel>(id)
	}

	relationshipToMany(...ids: string[]): BingGeocoderRel[] {
		return super.relationshipOneToMany<BingGeocoderRel>(...ids)
	}


	type(): BingGeocoderType {
		return BingGeocoders.TYPE
	}

}


export default BingGeocoders

export type { BingGeocoder, BingGeocoderCreate, BingGeocoderUpdate, BingGeocoderType }
