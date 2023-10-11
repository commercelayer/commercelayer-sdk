import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
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

	async create(resource: ParcelCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Parcel> {
		return this.resources.create<ParcelCreate, Parcel>({ ...resource, type: Parcels.TYPE }, params, options)
	}

	async update(resource: ParcelUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Parcel> {
		return this.resources.update<ParcelUpdate, Parcel>({ ...resource, type: Parcels.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Parcels.TYPE } : id, options)
	}

	async shipment(parcelId: string | Parcel, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		const _parcelId = (parcelId as Parcel).id || parcelId as string
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `parcels/${_parcelId}/shipment`, params, options) as unknown as Shipment
	}

	async package(parcelId: string | Parcel, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Package> {
		const _parcelId = (parcelId as Parcel).id || parcelId as string
		return this.resources.fetch<Package>({ type: 'packages' }, `parcels/${_parcelId}/package`, params, options) as unknown as Package
	}

	async parcel_line_items(parcelId: string | Parcel, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ParcelLineItem>> {
		const _parcelId = (parcelId as Parcel).id || parcelId as string
		return this.resources.fetch<ParcelLineItem>({ type: 'parcel_line_items' }, `parcels/${_parcelId}/parcel_line_items`, params, options) as unknown as ListResponse<ParcelLineItem>
	}

	async attachments(parcelId: string | Parcel, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _parcelId = (parcelId as Parcel).id || parcelId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `parcels/${_parcelId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(parcelId: string | Parcel, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _parcelId = (parcelId as Parcel).id || parcelId as string
		return this.resources.fetch<Event>({ type: 'events' }, `parcels/${_parcelId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(parcelId: string | Parcel, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _parcelId = (parcelId as Parcel).id || parcelId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `parcels/${_parcelId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isParcel(resource: any): resource is Parcel {
		return resource.type && (resource.type === Parcels.TYPE)
	}


	relationship(id: string | ResourceId | null): ParcelRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Parcels.TYPE } : { id: id.id, type: Parcels.TYPE }
	}


	type(): ParcelType {
		return Parcels.TYPE
	}


	parse(payload: any): Parcel | Parcel[] {
		return super.parse(payload)
	}

}


export default Parcels

export type { Parcel, ParcelCreate, ParcelUpdate, ParcelType }
