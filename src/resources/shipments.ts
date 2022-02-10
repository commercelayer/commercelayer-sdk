import { ApiResource, Resource, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { ShippingCategory } from './shipping_categories'
import { StockLocation } from './stock_locations'
import { Address } from './addresses'
import { ShippingMethod } from './shipping_methods'
import { DeliveryLeadTime } from './delivery_lead_times'
import { StockLineItem } from './stock_line_items'
import { StockTransfer } from './stock_transfers'
import { CarrierAccount } from './carrier_accounts'
import { Parcel } from './parcels'
import { Attachment } from './attachments'


type ShipmentRel = ResourceRel & { type: typeof Shipments.TYPE }
type ShippingMethodRel = ResourceRel & { type: 'shipping_methods' }


interface Shipment extends Resource {
	
	number?: string
	status?: string
	currency_code?: string
	cost_amount_cents?: number
	cost_amount_float?: number
	formatted_cost_amount?: string
	skus_count?: number
	selected_rate_id?: string
	rates?: object[]
	purchase_error_code?: string
	purchase_error_message?: string
	get_rates_started_at?: string
	get_rates_completed_at?: string
	purchase_started_at?: string
	purchase_completed_at?: string
	purchase_failed_at?: string

	order?: Order
	shipping_category?: ShippingCategory
	stock_location?: StockLocation
	origin_address?: Address
	shipping_address?: Address
	shipping_method?: ShippingMethod
	delivery_lead_time?: DeliveryLeadTime
	/**
	* @deprecated This field should not be used as it may be removed in the future without notice
	*/
	shipment_line_items?: object[]
	stock_line_items?: StockLineItem[]
	stock_transfers?: StockTransfer[]
	available_shipping_methods?: ShippingMethod[]
	carrier_accounts?: CarrierAccount[]
	parcels?: Parcel[]
	attachments?: Attachment[]

}


interface ShipmentUpdate extends ResourceUpdate {
	
	_on_hold?: boolean
	_picking?: boolean
	_packing?: boolean
	_ready_to_ship?: boolean
	_ship?: boolean
	_get_rates?: boolean
	selected_rate_id?: string
	_purchase?: boolean

	shipping_method?: ShippingMethodRel

}


class Shipments extends ApiResource {

	static readonly TYPE: 'shipments' = 'shipments'
	// static readonly PATH = 'shipments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Shipment>> {
		return this.resources.list<Shipment>({ type: Shipments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.retrieve<Shipment>({ type: Shipments.TYPE, id }, params, options)
	}

	async update(resource: ShipmentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update({ ...resource, type: Shipments.TYPE }, params, options)
	}

	async order(shipmentId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		return this.resources.fetch<Order>({ type: 'orders' }, `shipments/${shipmentId}/order`, params, options) as unknown as Order
	}

	async shipping_category(shipmentId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory> {
		return this.resources.fetch<ShippingCategory>({ type: 'shipping_categories' }, `shipments/${shipmentId}/shipping_category`, params, options) as unknown as ShippingCategory
	}

	async stock_location(shipmentId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `shipments/${shipmentId}/stock_location`, params, options) as unknown as StockLocation
	}

	async origin_address(shipmentId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		return this.resources.fetch<Address>({ type: 'addresses' }, `shipments/${shipmentId}/origin_address`, params, options) as unknown as Address
	}

	async shipping_address(shipmentId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		return this.resources.fetch<Address>({ type: 'addresses' }, `shipments/${shipmentId}/shipping_address`, params, options) as unknown as Address
	}

	async shipping_method(shipmentId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `shipments/${shipmentId}/shipping_method`, params, options) as unknown as ShippingMethod
	}

	async delivery_lead_time(shipmentId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<DeliveryLeadTime> {
		return this.resources.fetch<DeliveryLeadTime>({ type: 'delivery_lead_times' }, `shipments/${shipmentId}/delivery_lead_time`, params, options) as unknown as DeliveryLeadTime
	}

	async stock_line_items(shipmentId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		return this.resources.fetch<StockLineItem>({ type: 'stock_line_items' }, `shipments/${shipmentId}/stock_line_items`, params, options) as unknown as ListResponse<StockLineItem>
	}

	async stock_transfers(shipmentId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		return this.resources.fetch<StockTransfer>({ type: 'stock_transfers' }, `shipments/${shipmentId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
	}

	async available_shipping_methods(shipmentId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingMethod>> {
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `shipments/${shipmentId}/available_shipping_methods`, params, options) as unknown as ListResponse<ShippingMethod>
	}

	async carrier_accounts(shipmentId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CarrierAccount>> {
		return this.resources.fetch<CarrierAccount>({ type: 'carrier_accounts' }, `shipments/${shipmentId}/carrier_accounts`, params, options) as unknown as ListResponse<CarrierAccount>
	}

	async parcels(shipmentId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Parcel>> {
		return this.resources.fetch<Parcel>({ type: 'parcels' }, `shipments/${shipmentId}/parcels`, params, options) as unknown as ListResponse<Parcel>
	}

	async attachments(shipmentId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipments/${shipmentId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isShipment(resource: any): resource is Shipment {
		return resource.type && (resource.type === Shipments.TYPE)
	}


	relationship(id: string | ResourceId | null): ShipmentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Shipments.TYPE } : { id: id.id, type: Shipments.TYPE }
	}


	type(): string {
		return Shipments.TYPE
	}

}


export default Shipments

export { Shipment, ShipmentUpdate }
