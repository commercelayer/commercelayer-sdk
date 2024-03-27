import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Address, AddressSortable } from './addresses'
import type { Attachment, AttachmentSortable } from './attachments'


type BingGeocoderType = 'bing_geocoders'
type BingGeocoderRel = ResourceRel & { type: BingGeocoderType }


export type BingGeocoderSortable = Pick<BingGeocoder, 'id' | 'name'> & ResourceSortable
export type BingGeocoderFilterable = Pick<BingGeocoder, 'id' | 'name'> & ResourceFilterable


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


class BingGeocoders extends ApiResource<BingGeocoder, BingGeocoderSortable> {

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

	async addresses(bingGeocoderId: string | BingGeocoder, params?: QueryParamsList<AddressSortable>, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		const _bingGeocoderId = (bingGeocoderId as BingGeocoder).id || bingGeocoderId as string
		return this.resources.fetch<Address, AddressSortable>({ type: 'addresses' }, `bing_geocoders/${_bingGeocoderId}/addresses`, params, options) as unknown as ListResponse<Address>
	}

	async attachments(bingGeocoderId: string | BingGeocoder, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _bingGeocoderId = (bingGeocoderId as BingGeocoder).id || bingGeocoderId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `bing_geocoders/${_bingGeocoderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
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

/*
export const BingGeocodersClient = (init: ResourceAdapter | ResourcesInitConfig): BingGeocoders => {
	return new BingGeocoders((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
