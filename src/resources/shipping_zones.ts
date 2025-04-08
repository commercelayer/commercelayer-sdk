import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Attachment } from './attachments'
import type { Version } from './versions'


type ShippingZoneType = 'shipping_zones'
type ShippingZoneRel = ResourceRel & { type: ShippingZoneType }


export type ShippingZoneSort = Pick<ShippingZone, 'id' | 'name'> & ResourceSort
// export type ShippingZoneFilter = Pick<ShippingZone, 'id' | 'name'> & ResourceFilter


interface ShippingZone extends Resource {
	
	readonly type: ShippingZoneType

	/** 
	 * The shipping zone's internal name.
	 * @example ```"Europe (main countries)"```
	 */
	name: string
	/** 
	 * The regex that will be evaluated to match the shipping address country code, max size is 5000.
	 * @example ```"AT|BE|BG|CZ|DK|EE|DE|HU|LV|LT"```
	 */
	country_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping address country code, max size is 5000.
	 * @example ```"AT|BE|BG|CZ|DK|EE|DE"```
	 */
	not_country_code_regex?: string | null
	/** 
	 * The regex that will be evaluated to match the shipping address state code, max size is 5000.
	 * @example ```"A[KLRZ]|C[AOT]|D[CE]|FL"```
	 */
	state_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping address state code, max size is 5000.
	 * @example ```"A[KLRZ]|C[AOT]"```
	 */
	not_state_code_regex?: string | null
	/** 
	 * The regex that will be evaluated to match the shipping address zip code, max size is 5000.
	 * @example ```"(?i)(JE1|JE2|JE3|JE4|JE5)"```
	 */
	zip_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping zip country code, max size is 5000.
	 * @example ```"(?i)(JE1|JE2|JE3)"```
	 */
	not_zip_code_regex?: string | null

	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface ShippingZoneCreate extends ResourceCreate {
	
	/** 
	 * The shipping zone's internal name.
	 * @example ```"Europe (main countries)"```
	 */
	name: string
	/** 
	 * The regex that will be evaluated to match the shipping address country code, max size is 5000.
	 * @example ```"AT|BE|BG|CZ|DK|EE|DE|HU|LV|LT"```
	 */
	country_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping address country code, max size is 5000.
	 * @example ```"AT|BE|BG|CZ|DK|EE|DE"```
	 */
	not_country_code_regex?: string | null
	/** 
	 * The regex that will be evaluated to match the shipping address state code, max size is 5000.
	 * @example ```"A[KLRZ]|C[AOT]|D[CE]|FL"```
	 */
	state_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping address state code, max size is 5000.
	 * @example ```"A[KLRZ]|C[AOT]"```
	 */
	not_state_code_regex?: string | null
	/** 
	 * The regex that will be evaluated to match the shipping address zip code, max size is 5000.
	 * @example ```"(?i)(JE1|JE2|JE3|JE4|JE5)"```
	 */
	zip_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping zip country code, max size is 5000.
	 * @example ```"(?i)(JE1|JE2|JE3)"```
	 */
	not_zip_code_regex?: string | null
	
}


interface ShippingZoneUpdate extends ResourceUpdate {
	
	/** 
	 * The shipping zone's internal name.
	 * @example ```"Europe (main countries)"```
	 */
	name?: string | null
	/** 
	 * The regex that will be evaluated to match the shipping address country code, max size is 5000.
	 * @example ```"AT|BE|BG|CZ|DK|EE|DE|HU|LV|LT"```
	 */
	country_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping address country code, max size is 5000.
	 * @example ```"AT|BE|BG|CZ|DK|EE|DE"```
	 */
	not_country_code_regex?: string | null
	/** 
	 * The regex that will be evaluated to match the shipping address state code, max size is 5000.
	 * @example ```"A[KLRZ]|C[AOT]|D[CE]|FL"```
	 */
	state_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping address state code, max size is 5000.
	 * @example ```"A[KLRZ]|C[AOT]"```
	 */
	not_state_code_regex?: string | null
	/** 
	 * The regex that will be evaluated to match the shipping address zip code, max size is 5000.
	 * @example ```"(?i)(JE1|JE2|JE3|JE4|JE5)"```
	 */
	zip_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping zip country code, max size is 5000.
	 * @example ```"(?i)(JE1|JE2|JE3)"```
	 */
	not_zip_code_regex?: string | null
	
}


class ShippingZones extends ApiResource<ShippingZone> {

	static readonly TYPE: ShippingZoneType = 'shipping_zones' as const

	async create(resource: ShippingZoneCreate, params?: QueryParamsRetrieve<ShippingZone>, options?: ResourcesConfig): Promise<ShippingZone> {
		return this.resources.create<ShippingZoneCreate, ShippingZone>({ ...resource, type: ShippingZones.TYPE }, params, options)
	}

	async update(resource: ShippingZoneUpdate, params?: QueryParamsRetrieve<ShippingZone>, options?: ResourcesConfig): Promise<ShippingZone> {
		return this.resources.update<ShippingZoneUpdate, ShippingZone>({ ...resource, type: ShippingZones.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ShippingZones.TYPE } : id, options)
	}

	async attachments(shippingZoneId: string | ShippingZone, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shippingZoneId = (shippingZoneId as ShippingZone).id || shippingZoneId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipping_zones/${_shippingZoneId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(shippingZoneId: string | ShippingZone, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shippingZoneId = (shippingZoneId as ShippingZone).id || shippingZoneId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `shipping_zones/${_shippingZoneId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isShippingZone(resource: any): resource is ShippingZone {
		return resource.type && (resource.type === ShippingZones.TYPE)
	}


	relationship(id: string | ResourceId | null): ShippingZoneRel {
		return super.relationshipOneToOne<ShippingZoneRel>(id)
	}

	relationshipToMany(...ids: string[]): ShippingZoneRel[] {
		return super.relationshipOneToMany<ShippingZoneRel>(...ids)
	}


	type(): ShippingZoneType {
		return ShippingZones.TYPE
	}

}


const instance = new ShippingZones()
export default instance

export type { ShippingZones, ShippingZone, ShippingZoneCreate, ShippingZoneUpdate, ShippingZoneType }
