import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Shipment } from './shipments'
import type { Package } from './packages'
import type { ParcelLineItem } from './parcel_line_items'
import type { Attachment } from './attachments'


type ParcelRel = ResourceRel & { type: typeof Parcels.TYPE }
type ShipmentRel = ResourceRel & { type: 'shipments' }
type PackageRel = ResourceRel & { type: 'packages' }


interface Parcel extends Resource {
	
	number?: string
	weight?: number
	unit_of_weight?: string
	eel_pfc?: string
	contents_type?: string
	contents_explanation?: string
	customs_certify?: boolean
	customs_signer?: string
	non_delivery_option?: string
	restriction_type?: string
	restriction_comments?: string
	customs_info_required?: boolean
	shipping_label_url?: string
	shipping_label_file_type?: string
	shipping_label_size?: string
	shipping_label_resolution?: string
	tracking_number?: string
	tracking_status?: string
	tracking_status_detail?: string
	tracking_status_updated_at?: string
	tracking_details?: string
	carrier_weight_oz?: string
	signed_by?: string
	incoterm?: string

	shipment?: Shipment
	package?: Package
	parcel_line_items?: ParcelLineItem[]
	attachments?: Attachment[]

}


interface ParcelCreate extends ResourceCreate {
	
	weight?: number
	unit_of_weight?: string
	eel_pfc?: string
	contents_type?: string
	contents_explanation?: string
	customs_certify?: boolean
	customs_signer?: string
	non_delivery_option?: string
	restriction_type?: string
	restriction_comments?: string
	customs_info_required?: boolean
	tracking_number?: string
	tracking_status?: string
	tracking_status_detail?: string
	tracking_status_updated_at?: string
	tracking_details?: string
	carrier_weight_oz?: string
	signed_by?: string
	incoterm?: string

	shipment: ShipmentRel
	package: PackageRel

}


interface ParcelUpdate extends ResourceUpdate {
	
	weight?: number
	unit_of_weight?: string
	eel_pfc?: string
	contents_type?: string
	contents_explanation?: string
	customs_certify?: boolean
	customs_signer?: string
	non_delivery_option?: string
	restriction_type?: string
	restriction_comments?: string
	customs_info_required?: boolean
	tracking_number?: string
	tracking_status?: string
	tracking_status_detail?: string
	tracking_status_updated_at?: string
	tracking_details?: string
	carrier_weight_oz?: string
	signed_by?: string
	incoterm?: string

	shipment?: ShipmentRel
	package?: PackageRel

}


class Parcels extends ApiResource {

	static readonly TYPE: 'parcels' = 'parcels'
	// static readonly PATH = 'parcels'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Parcel>> {
		return this.resources.list<Parcel>({ type: Parcels.TYPE }, params, options)
	}

	async create(resource: ParcelCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Parcel> {
		return this.resources.create<ParcelCreate, Parcel>({ ...resource, type: Parcels.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Parcel> {
		return this.resources.retrieve<Parcel>({ type: Parcels.TYPE, id }, params, options)
	}

	async update(resource: ParcelUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Parcel> {
		return this.resources.update<ParcelUpdate, Parcel>({ ...resource, type: Parcels.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Parcels.TYPE, id }, options)
	}

	async shipment(parcelId: string | Parcel, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		const _parcelId = (parcelId as Parcel).id || parcelId
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `parcels/${_parcelId}/shipment`, params, options) as unknown as Shipment
	}

	async package(parcelId: string | Parcel, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Package> {
		const _parcelId = (parcelId as Parcel).id || parcelId
		return this.resources.fetch<Package>({ type: 'packages' }, `parcels/${_parcelId}/package`, params, options) as unknown as Package
	}

	async parcel_line_items(parcelId: string | Parcel, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ParcelLineItem>> {
		const _parcelId = (parcelId as Parcel).id || parcelId
		return this.resources.fetch<ParcelLineItem>({ type: 'parcel_line_items' }, `parcels/${_parcelId}/parcel_line_items`, params, options) as unknown as ListResponse<ParcelLineItem>
	}

	async attachments(parcelId: string | Parcel, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _parcelId = (parcelId as Parcel).id || parcelId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `parcels/${_parcelId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isParcel(resource: any): resource is Parcel {
		return resource.type && (resource.type === Parcels.TYPE)
	}


	relationship(id: string | ResourceId | null): ParcelRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Parcels.TYPE } : { id: id.id, type: Parcels.TYPE }
	}


	type(): string {
		return Parcels.TYPE
	}

}


export default Parcels

export { Parcel, ParcelCreate, ParcelUpdate }
