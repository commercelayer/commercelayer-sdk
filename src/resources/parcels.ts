import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, /* ResourceFilterable */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Shipment, ShipmentType } from './shipments'
import type { Package, PackageType } from './packages'
import type { ParcelLineItem } from './parcel_line_items'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'


type ParcelType = 'parcels'
type ParcelRel = ResourceRel & { type: ParcelType }
type ShipmentRel = ResourceRel & { type: ShipmentType }
type PackageRel = ResourceRel & { type: PackageType }


export type ParcelSortable = Pick<Parcel, 'id' | 'weight' | 'unit_of_weight' | 'tracking_status' | 'tracking_status_updated_at' | 'carrier_weight_oz'> & ResourceSortable
// export type ParcelFilterable = Pick<Parcel, 'id' | 'weight' | 'unit_of_weight' | 'contents_explanation' | 'shipping_label_url' | 'shipping_label_file_type' | 'shipping_label_size' | 'shipping_label_resolution' | 'tracking_number' | 'tracking_status' | 'tracking_status_detail' | 'tracking_status_updated_at' | 'carrier_weight_oz' | 'incoterm' | 'delivery_confirmation'> & ResourceFilterable


interface Parcel extends Resource {
	
	readonly type: ParcelType

	number?: string | null
	weight: number
	unit_of_weight: string
	eel_pfc?: string | null
	contents_type?: string | null
	contents_explanation?: string | null
	customs_certify?: boolean | null
	customs_signer?: string | null
	non_delivery_option?: string | null
	restriction_type?: string | null
	restriction_comments?: string | null
	customs_info_required?: boolean | null
	shipping_label_url?: string | null
	shipping_label_file_type?: string | null
	shipping_label_size?: string | null
	shipping_label_resolution?: string | null
	tracking_number?: string | null
	tracking_status?: string | null
	tracking_status_detail?: string | null
	tracking_status_updated_at?: string | null
	tracking_details?: Record<string, any> | null
	carrier_weight_oz?: string | null
	signed_by?: string | null
	incoterm?: string | null
	delivery_confirmation?: string | null

	shipment?: Shipment | null
	package?: Package | null
	parcel_line_items?: ParcelLineItem[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null

}


interface ParcelCreate extends ResourceCreate {
	
	weight: number
	unit_of_weight: string
	eel_pfc?: string | null
	contents_type?: string | null
	contents_explanation?: string | null
	customs_certify?: boolean | null
	customs_signer?: string | null
	non_delivery_option?: string | null
	restriction_type?: string | null
	restriction_comments?: string | null
	customs_info_required?: boolean | null
	shipping_label_url?: string | null
	shipping_label_file_type?: string | null
	shipping_label_size?: string | null
	shipping_label_resolution?: string | null
	tracking_number?: string | null
	tracking_status?: string | null
	tracking_status_detail?: string | null
	tracking_status_updated_at?: string | null
	tracking_details?: Record<string, any> | null
	carrier_weight_oz?: string | null
	signed_by?: string | null
	incoterm?: string | null
	delivery_confirmation?: string | null

	shipment: ShipmentRel
	package: PackageRel

}


interface ParcelUpdate extends ResourceUpdate {
	
	weight?: number | null
	unit_of_weight?: string | null
	eel_pfc?: string | null
	contents_type?: string | null
	contents_explanation?: string | null
	customs_certify?: boolean | null
	customs_signer?: string | null
	non_delivery_option?: string | null
	restriction_type?: string | null
	restriction_comments?: string | null
	customs_info_required?: boolean | null
	shipping_label_url?: string | null
	shipping_label_file_type?: string | null
	shipping_label_size?: string | null
	shipping_label_resolution?: string | null
	tracking_number?: string | null
	tracking_status?: string | null
	tracking_status_detail?: string | null
	tracking_status_updated_at?: string | null
	tracking_details?: Record<string, any> | null
	carrier_weight_oz?: string | null
	signed_by?: string | null
	incoterm?: string | null
	delivery_confirmation?: string | null

	shipment?: ShipmentRel | null
	package?: PackageRel | null

}


class Parcels extends ApiResource<Parcel> {

	static readonly TYPE: ParcelType = 'parcels' as const

	async create(resource: ParcelCreate, params?: QueryParamsRetrieve<Parcel>, options?: ResourcesConfig): Promise<Parcel> {
		return this.resources.create<ParcelCreate, Parcel>({ ...resource, type: Parcels.TYPE }, params, options)
	}

	async update(resource: ParcelUpdate, params?: QueryParamsRetrieve<Parcel>, options?: ResourcesConfig): Promise<Parcel> {
		return this.resources.update<ParcelUpdate, Parcel>({ ...resource, type: Parcels.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Parcels.TYPE } : id, options)
	}

	async shipment(parcelId: string | Parcel, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		const _parcelId = (parcelId as Parcel).id || parcelId as string
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `parcels/${_parcelId}/shipment`, params, options) as unknown as Shipment
	}

	async package(parcelId: string | Parcel, params?: QueryParamsRetrieve<Package>, options?: ResourcesConfig): Promise<Package> {
		const _parcelId = (parcelId as Parcel).id || parcelId as string
		return this.resources.fetch<Package>({ type: 'packages' }, `parcels/${_parcelId}/package`, params, options) as unknown as Package
	}

	async parcel_line_items(parcelId: string | Parcel, params?: QueryParamsList<ParcelLineItem>, options?: ResourcesConfig): Promise<ListResponse<ParcelLineItem>> {
		const _parcelId = (parcelId as Parcel).id || parcelId as string
		return this.resources.fetch<ParcelLineItem>({ type: 'parcel_line_items' }, `parcels/${_parcelId}/parcel_line_items`, params, options) as unknown as ListResponse<ParcelLineItem>
	}

	async attachments(parcelId: string | Parcel, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _parcelId = (parcelId as Parcel).id || parcelId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `parcels/${_parcelId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(parcelId: string | Parcel, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _parcelId = (parcelId as Parcel).id || parcelId as string
		return this.resources.fetch<Event>({ type: 'events' }, `parcels/${_parcelId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(parcelId: string | Parcel, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _parcelId = (parcelId as Parcel).id || parcelId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `parcels/${_parcelId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isParcel(resource: any): resource is Parcel {
		return resource.type && (resource.type === Parcels.TYPE)
	}


	relationship(id: string | ResourceId | null): ParcelRel {
		return super.relationshipOneToOne<ParcelRel>(id)
	}

	relationshipToMany(...ids: string[]): ParcelRel[] {
		return super.relationshipOneToMany<ParcelRel>(...ids)
	}


	type(): ParcelType {
		return Parcels.TYPE
	}

}


export default Parcels

export type { Parcel, ParcelCreate, ParcelUpdate, ParcelType }

/*
export const ParcelsClient = (init: ResourceAdapter | ResourcesInitConfig): Parcels => {
	return new Parcels((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
