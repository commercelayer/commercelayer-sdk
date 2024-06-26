import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Address } from './addresses'
import type { Attachment } from './attachments'


type GoogleGeocoderType = 'google_geocoders'
type GoogleGeocoderRel = ResourceRel & { type: GoogleGeocoderType }


export type GoogleGeocoderSort = Pick<GoogleGeocoder, 'id' | 'name'> & ResourceSort
// export type GoogleGeocoderFilter = Pick<GoogleGeocoder, 'id' | 'name'> & ResourceFilter


interface GoogleGeocoder extends Resource {
	
	readonly type: GoogleGeocoderType

	/** 
	 * The geocoder's internal name.
	 * @example ```"Default geocoder"```
	 */
	name: string

	addresses?: Address[] | null
	attachments?: Attachment[] | null

}


interface GoogleGeocoderCreate extends ResourceCreate {
	
	/** 
	 * The geocoder's internal name.
	 * @example ```"Default geocoder"```
	 */
	name: string
	/** 
	 * The Google Map API key.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	api_key: string
	
}


interface GoogleGeocoderUpdate extends ResourceUpdate {
	
	/** 
	 * The geocoder's internal name.
	 * @example ```"Default geocoder"```
	 */
	name?: string | null
	/** 
	 * The Google Map API key.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	api_key?: string | null
	
}


class GoogleGeocoders extends ApiResource<GoogleGeocoder> {

	static readonly TYPE: GoogleGeocoderType = 'google_geocoders' as const

	async create(resource: GoogleGeocoderCreate, params?: QueryParamsRetrieve<GoogleGeocoder>, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.create<GoogleGeocoderCreate, GoogleGeocoder>({ ...resource, type: GoogleGeocoders.TYPE }, params, options)
	}

	async update(resource: GoogleGeocoderUpdate, params?: QueryParamsRetrieve<GoogleGeocoder>, options?: ResourcesConfig): Promise<GoogleGeocoder> {
		return this.resources.update<GoogleGeocoderUpdate, GoogleGeocoder>({ ...resource, type: GoogleGeocoders.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: GoogleGeocoders.TYPE } : id, options)
	}

	async addresses(googleGeocoderId: string | GoogleGeocoder, params?: QueryParamsList<Address>, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		const _googleGeocoderId = (googleGeocoderId as GoogleGeocoder).id || googleGeocoderId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `google_geocoders/${_googleGeocoderId}/addresses`, params, options) as unknown as ListResponse<Address>
	}

	async attachments(googleGeocoderId: string | GoogleGeocoder, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _googleGeocoderId = (googleGeocoderId as GoogleGeocoder).id || googleGeocoderId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `google_geocoders/${_googleGeocoderId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isGoogleGeocoder(resource: any): resource is GoogleGeocoder {
		return resource.type && (resource.type === GoogleGeocoders.TYPE)
	}


	relationship(id: string | ResourceId | null): GoogleGeocoderRel {
		return super.relationshipOneToOne<GoogleGeocoderRel>(id)
	}

	relationshipToMany(...ids: string[]): GoogleGeocoderRel[] {
		return super.relationshipOneToMany<GoogleGeocoderRel>(...ids)
	}


	type(): GoogleGeocoderType {
		return GoogleGeocoders.TYPE
	}

}


export default GoogleGeocoders

export type { GoogleGeocoder, GoogleGeocoderCreate, GoogleGeocoderUpdate, GoogleGeocoderType }
