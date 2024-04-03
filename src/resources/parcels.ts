import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
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


export type ParcelSort = Pick<Parcel, 'id' | 'weight' | 'unit_of_weight' | 'tracking_status' | 'tracking_status_updated_at' | 'carrier_weight_oz'> & ResourceSort
// export type ParcelFilter = Pick<Parcel, 'id' | 'weight' | 'unit_of_weight' | 'contents_explanation' | 'shipping_label_url' | 'shipping_label_file_type' | 'shipping_label_size' | 'shipping_label_resolution' | 'tracking_number' | 'tracking_status' | 'tracking_status_detail' | 'tracking_status_updated_at' | 'carrier_weight_oz' | 'incoterm' | 'delivery_confirmation'> & ResourceFilter


interface Parcel extends Resource {
	
	readonly type: ParcelType

	number?: Nullable<string>
	weight: number
	unit_of_weight: string
	eel_pfc?: Nullable<string>
	contents_type?: Nullable<string>
	contents_explanation?: Nullable<string>
	customs_certify?: Nullable<boolean>
	customs_signer?: Nullable<string>
	non_delivery_option?: Nullable<string>
	restriction_type?: Nullable<string>
	restriction_comments?: Nullable<string>
	customs_info_required?: Nullable<boolean>
	shipping_label_url?: Nullable<string>
	shipping_label_file_type?: Nullable<string>
	shipping_label_size?: Nullable<string>
	shipping_label_resolution?: Nullable<string>
	tracking_number?: Nullable<string>
	tracking_status?: Nullable<string>
	tracking_status_detail?: Nullable<string>
	tracking_status_updated_at?: Nullable<string>
	tracking_details?: Nullable<Record<string, any>>
	carrier_weight_oz?: Nullable<string>
	signed_by?: Nullable<string>
	incoterm?: Nullable<string>
	delivery_confirmation?: Nullable<string>

	shipment?: Nullable<Shipment>
	package?: Nullable<Package>
	parcel_line_items?: Nullable<ParcelLineItem[]>
	attachments?: Nullable<Attachment[]>
	events?: Nullable<Event[]>
	versions?: Nullable<Version[]>

}


interface ParcelCreate extends ResourceCreate {
	
	weight: number
	unit_of_weight: string
	eel_pfc?: Nullable<string>
	contents_type?: Nullable<string>
	contents_explanation?: Nullable<string>
	customs_certify?: Nullable<boolean>
	customs_signer?: Nullable<string>
	non_delivery_option?: Nullable<string>
	restriction_type?: Nullable<string>
	restriction_comments?: Nullable<string>
	customs_info_required?: Nullable<boolean>
	shipping_label_url?: Nullable<string>
	shipping_label_file_type?: Nullable<string>
	shipping_label_size?: Nullable<string>
	shipping_label_resolution?: Nullable<string>
	tracking_number?: Nullable<string>
	tracking_status?: Nullable<string>
	tracking_status_detail?: Nullable<string>
	tracking_status_updated_at?: Nullable<string>
	tracking_details?: Nullable<Record<string, any>>
	carrier_weight_oz?: Nullable<string>
	signed_by?: Nullable<string>
	incoterm?: Nullable<string>
	delivery_confirmation?: Nullable<string>

	shipment: ShipmentRel
	package: PackageRel

}


interface ParcelUpdate extends ResourceUpdate {
	
	weight?: Nullable<number>
	unit_of_weight?: Nullable<string>
	eel_pfc?: Nullable<string>
	contents_type?: Nullable<string>
	contents_explanation?: Nullable<string>
	customs_certify?: Nullable<boolean>
	customs_signer?: Nullable<string>
	non_delivery_option?: Nullable<string>
	restriction_type?: Nullable<string>
	restriction_comments?: Nullable<string>
	customs_info_required?: Nullable<boolean>
	shipping_label_url?: Nullable<string>
	shipping_label_file_type?: Nullable<string>
	shipping_label_size?: Nullable<string>
	shipping_label_resolution?: Nullable<string>
	tracking_number?: Nullable<string>
	tracking_status?: Nullable<string>
	tracking_status_detail?: Nullable<string>
	tracking_status_updated_at?: Nullable<string>
	tracking_details?: Nullable<Record<string, any>>
	carrier_weight_oz?: Nullable<string>
	signed_by?: Nullable<string>
	incoterm?: Nullable<string>
	delivery_confirmation?: Nullable<string>

	shipment?: Nullable<ShipmentRel>
	package?: Nullable<PackageRel>

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
