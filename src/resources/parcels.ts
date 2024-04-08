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

	/** 
	 * Unique identifier for the parcel.
	 * @example ```"#1234/S/001/P/001"```
	 */
	number?: Nullable<string>
	/** 
	 * The parcel weight, used to automatically calculate the tax rates from the available carrier accounts..
	 * @example ```"1000"```
	 */
	weight: number
	/** 
	 * Can be one of 'gr', 'lb', or 'oz'.
	 * @example ```"gr"```
	 */
	unit_of_weight: string
	/** 
	 * When shipping outside the US, you need to provide either an Exemption and Exclusion Legend (EEL) code or a Proof of Filing Citation (PFC). Which you need is based on the value of the goods being shipped. Value can be one of "EEL" o "PFC"..
	 * @example ```"EEL"```
	 */
	eel_pfc?: Nullable<string>
	/** 
	 * The type of item you are sending. Can be one of 'merchandise', 'gift', 'documents', 'returned_goods', 'sample', or 'other'..
	 * @example ```"merchandise"```
	 */
	contents_type?: Nullable<string>
	/** 
	 * If you specify 'other' in the 'contents_type' attribute, you must supply a brief description in this attribute..
	 */
	contents_explanation?: Nullable<string>
	/** 
	 * Indicates if the provided information is accurate.
	 */
	customs_certify?: Nullable<boolean>
	/** 
	 * This is the name of the person who is certifying that the information provided on the customs form is accurate. Use a name of the person in your organization who is responsible for this..
	 * @example ```"John Doe"```
	 */
	customs_signer?: Nullable<string>
	/** 
	 * In case the shipment cannot be delivered, this option tells the carrier what you want to happen to the parcel. You can pass either 'return', or 'abandon'. The value defaults to 'return'. If you pass 'abandon', you will not receive the parcel back if it cannot be delivered..
	 * @example ```"return"```
	 */
	non_delivery_option?: Nullable<string>
	/** 
	 * Describes if your parcel requires any special treatment or quarantine when entering the country. Can be one of 'none', 'other', 'quarantine', or 'sanitary_phytosanitary_inspection'..
	 * @example ```"none"```
	 */
	restriction_type?: Nullable<string>
	/** 
	 * If you specify 'other' in the restriction type, you must supply a brief description of what is required..
	 */
	restriction_comments?: Nullable<string>
	/** 
	 * Indicates if the parcel requires customs info to get the shipping rates..
	 */
	customs_info_required?: Nullable<boolean>
	/** 
	 * The shipping label url, ready to be downloaded and printed..
	 * @example ```"https://bucket.s3-us-west-2.amazonaws.com/files/postage_label/20180101/123.pdf"```
	 */
	shipping_label_url?: Nullable<string>
	/** 
	 * The shipping label file type. One of 'application/pdf', 'application/zpl', 'application/epl2', or 'image/png'..
	 * @example ```"application/pdf"```
	 */
	shipping_label_file_type?: Nullable<string>
	/** 
	 * The shipping label size..
	 * @example ```"4x7"```
	 */
	shipping_label_size?: Nullable<string>
	/** 
	 * The shipping label resolution..
	 * @example ```"200"```
	 */
	shipping_label_resolution?: Nullable<string>
	/** 
	 * The tracking number associated to this parcel..
	 * @example ```"1Z4V2A000000000000"```
	 */
	tracking_number?: Nullable<string>
	/** 
	 * The tracking status for this parcel, automatically updated in real time by the shipping carrier..
	 * @example ```"delivered"```
	 */
	tracking_status?: Nullable<string>
	/** 
	 * Additional information about the tracking status, automatically updated in real time by the shipping carrier..
	 * @example ```"arrived_at_destination"```
	 */
	tracking_status_detail?: Nullable<string>
	/** 
	 * Time at which the parcel's tracking status was last updated..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	tracking_status_updated_at?: Nullable<string>
	/** 
	 * The parcel's full tracking history, automatically updated in real time by the shipping carrier..
	 * @example ```"[object Object]"```
	 */
	tracking_details?: Nullable<Record<string, any>>
	/** 
	 * The weight of the parcel as measured by the carrier in ounces (if available).
	 * @example ```"42.32"```
	 */
	carrier_weight_oz?: Nullable<string>
	/** 
	 * The name of the person who signed for the parcel (if available).
	 * @example ```"John Smith"```
	 */
	signed_by?: Nullable<string>
	/** 
	 * The type of Incoterm (if available)..
	 * @example ```"EXW"```
	 */
	incoterm?: Nullable<string>
	/** 
	 * The type of delivery confirmation option upon delivery..
	 * @example ```"SIGNATURE"```
	 */
	delivery_confirmation?: Nullable<string>

	shipment?: Nullable<Shipment>
	package?: Nullable<Package>
	parcel_line_items?: Nullable<ParcelLineItem[]>
	attachments?: Nullable<Attachment[]>
	events?: Nullable<Event[]>
	versions?: Nullable<Version[]>

}


interface ParcelCreate extends ResourceCreate {
	
	/** 
	 * The parcel weight, used to automatically calculate the tax rates from the available carrier accounts..
	 * @example ```"1000"```
	 */
	weight: number
	/** 
	 * Can be one of 'gr', 'lb', or 'oz'.
	 * @example ```"gr"```
	 */
	unit_of_weight: string
	/** 
	 * When shipping outside the US, you need to provide either an Exemption and Exclusion Legend (EEL) code or a Proof of Filing Citation (PFC). Which you need is based on the value of the goods being shipped. Value can be one of "EEL" o "PFC"..
	 * @example ```"EEL"```
	 */
	eel_pfc?: Nullable<string>
	/** 
	 * The type of item you are sending. Can be one of 'merchandise', 'gift', 'documents', 'returned_goods', 'sample', or 'other'..
	 * @example ```"merchandise"```
	 */
	contents_type?: Nullable<string>
	/** 
	 * If you specify 'other' in the 'contents_type' attribute, you must supply a brief description in this attribute..
	 */
	contents_explanation?: Nullable<string>
	/** 
	 * Indicates if the provided information is accurate.
	 */
	customs_certify?: Nullable<boolean>
	/** 
	 * This is the name of the person who is certifying that the information provided on the customs form is accurate. Use a name of the person in your organization who is responsible for this..
	 * @example ```"John Doe"```
	 */
	customs_signer?: Nullable<string>
	/** 
	 * In case the shipment cannot be delivered, this option tells the carrier what you want to happen to the parcel. You can pass either 'return', or 'abandon'. The value defaults to 'return'. If you pass 'abandon', you will not receive the parcel back if it cannot be delivered..
	 * @example ```"return"```
	 */
	non_delivery_option?: Nullable<string>
	/** 
	 * Describes if your parcel requires any special treatment or quarantine when entering the country. Can be one of 'none', 'other', 'quarantine', or 'sanitary_phytosanitary_inspection'..
	 * @example ```"none"```
	 */
	restriction_type?: Nullable<string>
	/** 
	 * If you specify 'other' in the restriction type, you must supply a brief description of what is required..
	 */
	restriction_comments?: Nullable<string>
	/** 
	 * Indicates if the parcel requires customs info to get the shipping rates..
	 */
	customs_info_required?: Nullable<boolean>
	/** 
	 * The shipping label url, ready to be downloaded and printed..
	 * @example ```"https://bucket.s3-us-west-2.amazonaws.com/files/postage_label/20180101/123.pdf"```
	 */
	shipping_label_url?: Nullable<string>
	/** 
	 * The shipping label file type. One of 'application/pdf', 'application/zpl', 'application/epl2', or 'image/png'..
	 * @example ```"application/pdf"```
	 */
	shipping_label_file_type?: Nullable<string>
	/** 
	 * The shipping label size..
	 * @example ```"4x7"```
	 */
	shipping_label_size?: Nullable<string>
	/** 
	 * The shipping label resolution..
	 * @example ```"200"```
	 */
	shipping_label_resolution?: Nullable<string>
	/** 
	 * The tracking number associated to this parcel..
	 * @example ```"1Z4V2A000000000000"```
	 */
	tracking_number?: Nullable<string>
	/** 
	 * The tracking status for this parcel, automatically updated in real time by the shipping carrier..
	 * @example ```"delivered"```
	 */
	tracking_status?: Nullable<string>
	/** 
	 * Additional information about the tracking status, automatically updated in real time by the shipping carrier..
	 * @example ```"arrived_at_destination"```
	 */
	tracking_status_detail?: Nullable<string>
	/** 
	 * Time at which the parcel's tracking status was last updated..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	tracking_status_updated_at?: Nullable<string>
	/** 
	 * The parcel's full tracking history, automatically updated in real time by the shipping carrier..
	 * @example ```"[object Object]"```
	 */
	tracking_details?: Nullable<Record<string, any>>
	/** 
	 * The weight of the parcel as measured by the carrier in ounces (if available).
	 * @example ```"42.32"```
	 */
	carrier_weight_oz?: Nullable<string>
	/** 
	 * The name of the person who signed for the parcel (if available).
	 * @example ```"John Smith"```
	 */
	signed_by?: Nullable<string>
	/** 
	 * The type of Incoterm (if available)..
	 * @example ```"EXW"```
	 */
	incoterm?: Nullable<string>
	/** 
	 * The type of delivery confirmation option upon delivery..
	 * @example ```"SIGNATURE"```
	 */
	delivery_confirmation?: Nullable<string>

	shipment: ShipmentRel
	package: PackageRel

}


interface ParcelUpdate extends ResourceUpdate {
	
	/** 
	 * The parcel weight, used to automatically calculate the tax rates from the available carrier accounts..
	 * @example ```"1000"```
	 */
	weight?: Nullable<number>
	/** 
	 * Can be one of 'gr', 'lb', or 'oz'.
	 * @example ```"gr"```
	 */
	unit_of_weight?: Nullable<string>
	/** 
	 * When shipping outside the US, you need to provide either an Exemption and Exclusion Legend (EEL) code or a Proof of Filing Citation (PFC). Which you need is based on the value of the goods being shipped. Value can be one of "EEL" o "PFC"..
	 * @example ```"EEL"```
	 */
	eel_pfc?: Nullable<string>
	/** 
	 * The type of item you are sending. Can be one of 'merchandise', 'gift', 'documents', 'returned_goods', 'sample', or 'other'..
	 * @example ```"merchandise"```
	 */
	contents_type?: Nullable<string>
	/** 
	 * If you specify 'other' in the 'contents_type' attribute, you must supply a brief description in this attribute..
	 */
	contents_explanation?: Nullable<string>
	/** 
	 * Indicates if the provided information is accurate.
	 */
	customs_certify?: Nullable<boolean>
	/** 
	 * This is the name of the person who is certifying that the information provided on the customs form is accurate. Use a name of the person in your organization who is responsible for this..
	 * @example ```"John Doe"```
	 */
	customs_signer?: Nullable<string>
	/** 
	 * In case the shipment cannot be delivered, this option tells the carrier what you want to happen to the parcel. You can pass either 'return', or 'abandon'. The value defaults to 'return'. If you pass 'abandon', you will not receive the parcel back if it cannot be delivered..
	 * @example ```"return"```
	 */
	non_delivery_option?: Nullable<string>
	/** 
	 * Describes if your parcel requires any special treatment or quarantine when entering the country. Can be one of 'none', 'other', 'quarantine', or 'sanitary_phytosanitary_inspection'..
	 * @example ```"none"```
	 */
	restriction_type?: Nullable<string>
	/** 
	 * If you specify 'other' in the restriction type, you must supply a brief description of what is required..
	 */
	restriction_comments?: Nullable<string>
	/** 
	 * Indicates if the parcel requires customs info to get the shipping rates..
	 */
	customs_info_required?: Nullable<boolean>
	/** 
	 * The shipping label url, ready to be downloaded and printed..
	 * @example ```"https://bucket.s3-us-west-2.amazonaws.com/files/postage_label/20180101/123.pdf"```
	 */
	shipping_label_url?: Nullable<string>
	/** 
	 * The shipping label file type. One of 'application/pdf', 'application/zpl', 'application/epl2', or 'image/png'..
	 * @example ```"application/pdf"```
	 */
	shipping_label_file_type?: Nullable<string>
	/** 
	 * The shipping label size..
	 * @example ```"4x7"```
	 */
	shipping_label_size?: Nullable<string>
	/** 
	 * The shipping label resolution..
	 * @example ```"200"```
	 */
	shipping_label_resolution?: Nullable<string>
	/** 
	 * The tracking number associated to this parcel..
	 * @example ```"1Z4V2A000000000000"```
	 */
	tracking_number?: Nullable<string>
	/** 
	 * The tracking status for this parcel, automatically updated in real time by the shipping carrier..
	 * @example ```"delivered"```
	 */
	tracking_status?: Nullable<string>
	/** 
	 * Additional information about the tracking status, automatically updated in real time by the shipping carrier..
	 * @example ```"arrived_at_destination"```
	 */
	tracking_status_detail?: Nullable<string>
	/** 
	 * Time at which the parcel's tracking status was last updated..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	tracking_status_updated_at?: Nullable<string>
	/** 
	 * The parcel's full tracking history, automatically updated in real time by the shipping carrier..
	 * @example ```"[object Object]"```
	 */
	tracking_details?: Nullable<Record<string, any>>
	/** 
	 * The weight of the parcel as measured by the carrier in ounces (if available).
	 * @example ```"42.32"```
	 */
	carrier_weight_oz?: Nullable<string>
	/** 
	 * The name of the person who signed for the parcel (if available).
	 * @example ```"John Smith"```
	 */
	signed_by?: Nullable<string>
	/** 
	 * The type of Incoterm (if available)..
	 * @example ```"EXW"```
	 */
	incoterm?: Nullable<string>
	/** 
	 * The type of delivery confirmation option upon delivery..
	 * @example ```"SIGNATURE"```
	 */
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
