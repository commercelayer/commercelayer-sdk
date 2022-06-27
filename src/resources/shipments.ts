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
import { Event } from './events'


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


class Shipments extends ApiResource {

	static readonly TYPE: 'shipments' = 'shipments'
	// static readonly PATH = 'shipments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Shipment>> {
		return this.resources.list({ type: Shipments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.retrieve<Shipment>({ type: Shipments.TYPE, id }, params, options)
	}

	async update(resource: ShipmentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update({ ...resource, type: Shipments.TYPE }, params, options)
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
