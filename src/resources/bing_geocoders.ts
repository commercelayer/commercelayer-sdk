import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { Address } from './addresses'
import type { Attachment } from './attachments'
import type { EventStore } from './event_stores'


type BingGeocoderType = 'bing_geocoders'
type BingGeocoderRel = ResourceRel & { type: BingGeocoderType }


export type BingGeocoderSort = Pick<BingGeocoder, 'id' | 'name'> & ResourceSort
// export type BingGeocoderFilter = Pick<BingGeocoder, 'id' | 'name'> & ResourceFilter


interface BingGeocoder extends Resource {
	
	readonly type: BingGeocoderType

	/** 
	 * The geocoder's internal name.
	 * @example ```"Default geocoder"```
	 */
	name: string

	markets?: Market[] | null
	addresses?: Address[] | null
	attachments?: Attachment[] | null
	event_stores?: EventStore[] | null

}


interface BingGeocoderCreate extends ResourceCreate {
	
	/** 
	 * The geocoder's internal name.
	 * @example ```"Default geocoder"```
	 */
	name: string
	/** 
	 * The Bing Virtualearth key.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	key: string
	
}


interface BingGeocoderUpdate extends ResourceUpdate {
	
	/** 
	 * The geocoder's internal name.
	 * @example ```"Default geocoder"```
	 */
	name?: string | null
	/** 
	 * The Bing Virtualearth key.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
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

	async markets(bingGeocoderId: string | BingGeocoder, params?: QueryParamsList<Market>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _bingGeocoderId = (bingGeocoderId as BingGeocoder).id || bingGeocoderId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `bing_geocoders/${_bingGeocoderId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async addresses(bingGeocoderId: string | BingGeocoder, params?: QueryParamsList<Address>, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		const _bingGeocoderId = (bingGeocoderId as BingGeocoder).id || bingGeocoderId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `bing_geocoders/${_bingGeocoderId}/addresses`, params, options) as unknown as ListResponse<Address>
	}

	async attachments(bingGeocoderId: string | BingGeocoder, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _bingGeocoderId = (bingGeocoderId as BingGeocoder).id || bingGeocoderId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `bing_geocoders/${_bingGeocoderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async event_stores(bingGeocoderId: string | BingGeocoder, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _bingGeocoderId = (bingGeocoderId as BingGeocoder).id || bingGeocoderId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `bing_geocoders/${_bingGeocoderId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
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
