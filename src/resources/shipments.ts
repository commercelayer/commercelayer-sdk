import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { ShippingCategory } from './shipping_categories'
import type { InventoryStockLocation } from './inventory_stock_locations'
import type { StockLocation } from './stock_locations'
import type { Address } from './addresses'
import type { ShippingMethod } from './shipping_methods'
import type { DeliveryLeadTime } from './delivery_lead_times'
import type { StockLineItem } from './stock_line_items'
import type { StockTransfer } from './stock_transfers'
import type { LineItem } from './line_items'
import type { CarrierAccount } from './carrier_accounts'
import type { Parcel } from './parcels'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag } from './tags'
import type { Version } from './versions'


type ShipmentRel = ResourceRel & { type: typeof Shipments.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }
type ShippingCategoryRel = ResourceRel & { type: 'shipping_categories' }
type InventoryStockLocationRel = ResourceRel & { type: 'inventory_stock_locations' }
type AddressRel = ResourceRel & { type: 'addresses' }
type ShippingMethodRel = ResourceRel & { type: 'shipping_methods' }
type TagRel = ResourceRel & { type: 'tags' }


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
	on_hold_at?: string
	picking_at?: string
	packing_at?: string
	ready_to_ship_at?: string
	shipped_at?: string

	order?: Order
	shipping_category?: ShippingCategory
	inventory_stock_location?: InventoryStockLocation
	stock_location?: StockLocation
	origin_address?: Address
	shipping_address?: Address
	shipping_method?: ShippingMethod
	delivery_lead_time?: DeliveryLeadTime
	stock_line_items?: StockLineItem[]
	stock_transfers?: StockTransfer[]
	line_items?: LineItem[]
	available_shipping_methods?: ShippingMethod[]
	carrier_accounts?: CarrierAccount[]
	parcels?: Parcel[]
	attachments?: Attachment[]
	events?: Event[]
	tags?: Tag[]
	versions?: Version[]

}


interface ShipmentCreate extends ResourceCreate {
	
	order: OrderRel
	shipping_category?: ShippingCategoryRel
	inventory_stock_location: InventoryStockLocationRel
	shipping_address?: AddressRel
	shipping_method?: ShippingMethodRel
	tags?: TagRel[]

}


interface ShipmentUpdate extends ResourceUpdate {
	
	number?: string
	_upcoming?: boolean
	_cancel?: boolean
	_on_hold?: boolean
	_picking?: boolean
	_packing?: boolean
	_ready_to_ship?: boolean
	_ship?: boolean
	_deliver?: boolean
	_reserve_stock?: boolean
	_release_stock?: boolean
	_decrement_stock?: boolean
	_get_rates?: boolean
	selected_rate_id?: string
	_purchase?: boolean

	shipping_category?: ShippingCategoryRel
	inventory_stock_location?: InventoryStockLocationRel
	shipping_address?: AddressRel
	shipping_method?: ShippingMethodRel
	tags?: TagRel[]

}


class Shipments extends ApiResource {

	static readonly TYPE: 'shipments' = 'shipments' as const
	// static readonly PATH = 'shipments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Shipment>> {
		return this.resources.list<Shipment>({ type: Shipments.TYPE }, params, options)
	}

	async create(resource: ShipmentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.create<ShipmentCreate, Shipment>({ ...resource, type: Shipments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.retrieve<Shipment>({ type: Shipments.TYPE, id }, params, options)
	}

	async update(resource: ShipmentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ ...resource, type: Shipments.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Shipments.TYPE, id }, options)
	}

	async order(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `shipments/${_shipmentId}/order`, params, options) as unknown as Order
	}

	async shipping_category(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<ShippingCategory>({ type: 'shipping_categories' }, `shipments/${_shipmentId}/shipping_category`, params, options) as unknown as ShippingCategory
	}

	async inventory_stock_location(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryStockLocation> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<InventoryStockLocation>({ type: 'inventory_stock_locations' }, `shipments/${_shipmentId}/inventory_stock_location`, params, options) as unknown as InventoryStockLocation
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

	async line_items(shipmentId: string | Shipment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<LineItem>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `shipments/${_shipmentId}/line_items`, params, options) as unknown as ListResponse<LineItem>
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

	async tags(shipmentId: string | Shipment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `shipments/${_shipmentId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(shipmentId: string | Shipment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `shipments/${_shipmentId}/versions`, params, options) as unknown as ListResponse<Version>
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

export { Shipment, ShipmentCreate, ShipmentUpdate }
