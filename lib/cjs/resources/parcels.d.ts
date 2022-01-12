import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Shipment } from './shipments';
import { Package } from './packages';
import { ParcelLineItem } from './parcel_line_items';
import { Attachment } from './attachments';
declare type ParcelRel = ResourceId & {
    type: typeof Parcels.TYPE;
};
declare type ShipmentRel = ResourceId & {
    type: 'shipments';
};
declare type PackageRel = ResourceId & {
    type: 'packages';
};
interface Parcel extends Resource {
    number?: string;
    weight?: number;
    unit_of_weight?: string;
    eel_pfc?: string;
    contents_type?: string;
    contents_explanation?: string;
    customs_certify?: boolean;
    customs_signer?: string;
    non_delivery_option?: string;
    restriction_type?: string;
    restriction_comments?: string;
    customs_info_required?: boolean;
    shipping_label_url?: string;
    shipping_label_file_type?: string;
    shipping_label_size?: string;
    shipping_label_resolution?: string;
    tracking_number?: string;
    tracking_status?: string;
    tracking_status_detail?: string;
    tracking_status_updated_at?: string;
    tracking_details?: string;
    carrier_weight_oz?: string;
    signed_by?: string;
    incoterm?: string;
    shipment?: Shipment;
    package?: Package;
    parcel_line_items?: ParcelLineItem[];
    attachments?: Attachment[];
}
interface ParcelCreate extends ResourceCreate {
    weight?: number;
    unit_of_weight?: string;
    eel_pfc?: string;
    contents_type?: string;
    contents_explanation?: string;
    customs_certify?: boolean;
    customs_signer?: string;
    non_delivery_option?: string;
    restriction_type?: string;
    restriction_comments?: string;
    customs_info_required?: boolean;
    tracking_number?: string;
    tracking_status?: string;
    tracking_status_detail?: string;
    tracking_status_updated_at?: string;
    tracking_details?: string;
    carrier_weight_oz?: string;
    signed_by?: string;
    incoterm?: string;
    shipment: ShipmentRel;
    package: PackageRel;
}
interface ParcelUpdate extends ResourceUpdate {
    weight?: number;
    unit_of_weight?: string;
    eel_pfc?: string;
    contents_type?: string;
    contents_explanation?: string;
    customs_certify?: boolean;
    customs_signer?: string;
    non_delivery_option?: string;
    restriction_type?: string;
    restriction_comments?: string;
    customs_info_required?: boolean;
    tracking_number?: string;
    tracking_status?: string;
    tracking_status_detail?: string;
    tracking_status_updated_at?: string;
    tracking_details?: string;
    carrier_weight_oz?: string;
    signed_by?: string;
    incoterm?: string;
    shipment?: ShipmentRel;
    package?: PackageRel;
}
declare class Parcels extends ApiResource {
    static readonly TYPE: 'parcels';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Parcel>>;
    create(resource: ParcelCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Parcel>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Parcel>;
    update(resource: ParcelUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Parcel>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isParcel(resource: any): resource is Parcel;
    relationship(id: string | ResourceId): ParcelRel;
    type(): string;
}
export default Parcels;
export { Parcel, ParcelCreate, ParcelUpdate };
