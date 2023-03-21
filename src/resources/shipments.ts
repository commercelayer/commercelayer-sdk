import { ApiResource, Resource, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { ShippingCategory } from './shipping_categories'
import type { StockLocation } from './stock_locations'
import type { Address } from './addresses'
import type { ShippingMethod, ShippingMethodType } from './shipping_methods'
import type { DeliveryLeadTime } from './delivery_lead_times'
import type { StockLineItem } from './stock_line_items'
import type { StockTransfer } from './stock_transfers'
import type { CarrierAccount } from './carrier_accounts'
import type { Parcel } from './parcels'
import type { Attachment } from './attachments'
import type { Event } from './events'


type ShipmentType = 'shipments'
type ShipmentRel = ResourceRel & { type: ShipmentType }
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }


interface Shipment extends Resource {
	
	readonly type: ShipmentType

	number?: string
	status?: 'draft' | 'upcoming' | 'cancelled' | 'on_hold' | 'picking' | 'packing' | 'ready_to_ship' | 'shipped'
	currency_code?: string
	cost_amount_cents?: number
	cost_amount_float?: number
	formatted_cost_amount?: string
	skus_count?: number
	selected_rate_id?: string
	rates?: object[]
	purchase_error_code?: string
	purchase_error_message?: string
	get_rates_errors?: object[]
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
	events?: Event[]

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


class Shipments extends ApiResource<Shipment> {

	static readonly TYPE: ShipmentType = 'shipments' as const

	async update(resource: ShipmentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ ...resource, type: Shipments.TYPE }, params, options)
	}

	async order(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `shipments/${_shipmentId}/order`, params, options) as unknown as Order
	}

	async shipping_category(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<ShippingCategory>({ type: 'shipping_categories' }, `shipments/${_shipmentId}/shipping_category`, params, options) as unknown as ShippingCategory
	}

	async stock_location(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `shipments/${_shipmentId}/stock_location`, params, options) as unknown as StockLocation
	}

	async origin_address(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `shipments/${_shipmentId}/origin_address`, params, options) as unknown as Address
	}

	async shipping_address(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `shipments/${_shipmentId}/shipping_address`, params, options) as unknown as Address
	}

	async shipping_method(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `shipments/${_shipmentId}/shipping_method`, params, options) as unknown as ShippingMethod
	}

	async delivery_lead_time(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<DeliveryLeadTime> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<DeliveryLeadTime>({ type: 'delivery_lead_times' }, `shipments/${_shipmentId}/delivery_lead_time`, params, options) as unknown as DeliveryLeadTime
	}

	async stock_line_items(shipmentId: string | Shipment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<StockLineItem>({ type: 'stock_line_items' }, `shipments/${_shipmentId}/stock_line_items`, params, options) as unknown as ListResponse<StockLineItem>
	}

	async stock_transfers(shipmentId: string | Shipment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<StockTransfer>({ type: 'stock_transfers' }, `shipments/${_shipmentId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
	}

	async available_shipping_methods(shipmentId: string | Shipment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingMethod>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `shipments/${_shipmentId}/available_shipping_methods`, params, options) as unknown as ListResponse<ShippingMethod>
	}

	async carrier_accounts(shipmentId: string | Shipment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CarrierAccount>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<CarrierAccount>({ type: 'carrier_accounts' }, `shipments/${_shipmentId}/carrier_accounts`, params, options) as unknown as ListResponse<CarrierAccount>
	}

	async parcels(shipmentId: string | Shipment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Parcel>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Parcel>({ type: 'parcels' }, `shipments/${_shipmentId}/parcels`, params, options) as unknown as ListResponse<Parcel>
	}

	async attachments(shipmentId: string | Shipment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipments/${_shipmentId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(shipmentId: string | Shipment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Event>({ type: 'events' }, `shipments/${_shipmentId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isShipment(resource: any): resource is Shipment {
		return resource.type && (resource.type === Shipments.TYPE)
	}


	relationship(id: string | ResourceId | null): ShipmentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Shipments.TYPE } : { id: id.id, type: Shipments.TYPE }
	}


	type(): ShipmentType {
		return Shipments.TYPE
	}

}


export default Shipments

export type { Shipment, ShipmentUpdate, ShipmentType }
