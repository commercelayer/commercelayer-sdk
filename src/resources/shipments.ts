import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { ShippingCategory, ShippingCategoryType } from './shipping_categories'
import type { InventoryStockLocation, InventoryStockLocationType } from './inventory_stock_locations'
import type { StockLocation } from './stock_locations'
import type { Address, AddressType } from './addresses'
import type { ShippingMethod, ShippingMethodType } from './shipping_methods'
import type { DeliveryLeadTime } from './delivery_lead_times'
import type { Pickup } from './pickups'
import type { StockLineItem } from './stock_line_items'
import type { StockTransfer } from './stock_transfers'
import type { LineItem } from './line_items'
import type { CarrierAccount } from './carrier_accounts'
import type { Parcel } from './parcels'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'
import type { EventStore } from './event_stores'


type ShipmentType = 'shipments'
type ShipmentRel = ResourceRel & { type: ShipmentType }
type OrderRel = ResourceRel & { type: OrderType }
type ShippingCategoryRel = ResourceRel & { type: ShippingCategoryType }
type InventoryStockLocationRel = ResourceRel & { type: InventoryStockLocationType }
type AddressRel = ResourceRel & { type: AddressType }
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }
type TagRel = ResourceRel & { type: TagType }


export type ShipmentSort = Pick<Shipment, 'id' | 'number' | 'status' | 'cost_amount_cents' | 'get_rates_started_at' | 'get_rates_completed_at' | 'purchase_started_at' | 'purchase_completed_at' | 'purchase_failed_at' | 'on_hold_at' | 'picking_at' | 'packing_at' | 'ready_to_ship_at' | 'shipped_at'> & ResourceSort
// export type ShipmentFilter = Pick<Shipment, 'id' | 'number' | 'status' | 'cost_amount_cents' | 'get_rates_started_at' | 'get_rates_completed_at' | 'purchase_started_at' | 'purchase_completed_at' | 'purchase_failed_at' | 'on_hold_at' | 'picking_at' | 'packing_at' | 'ready_to_ship_at' | 'shipped_at'> & ResourceFilter


interface Shipment extends Resource {
	
	readonly type: ShipmentType

	/** 
	 * Unique identifier for the shipment. Cannot be passed by sales channels.
	 * @example ```"#1234/S/001"```
	 */
	number: string
	/** 
	 * The shipment status. One of 'draft' (default), 'upcoming', 'cancelled', 'on_hold', 'picking', 'packing', 'ready_to_ship', 'shipped', or 'delivered'.
	 * @example ```"draft"```
	 */
	status: 'draft' | 'upcoming' | 'cancelled' | 'on_hold' | 'picking' | 'packing' | 'ready_to_ship' | 'shipped' | 'delivered'
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard, automatically inherited from the associated order.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * The cost of this shipment from the selected carrier account, in cents.
	 * @example ```1000```
	 */
	cost_amount_cents?: number | null
	/** 
	 * The cost of this shipment from the selected carrier account, float.
	 * @example ```10```
	 */
	cost_amount_float?: number | null
	/** 
	 * The cost of this shipment from the selected carrier account, formatted.
	 * @example ```"€10,00"```
	 */
	formatted_cost_amount?: string | null
	/** 
	 * The total number of SKUs in the shipment's line items. This can be useful to display a preview of the shipment content.
	 * @example ```2```
	 */
	skus_count?: number | null
	/** 
	 * The selected purchase rate from the available shipping rates.
	 * @example ```"rate_f89e4663c3ed47ee94d37763f6d21d54"```
	 */
	selected_rate_id?: string | null
	/** 
	 * The available shipping rates.
	 * @example ```[{"id":"rate_f89e4663c3ed47ee94d37763f6d21d54","rate":"45.59","carrier":"DHLExpress","service":"MedicalExpress"}]```
	 */
	rates?: Array<Record<string, any>> | null
	/** 
	 * The shipping rate purchase error code, if any.
	 * @example ```"SHIPMENT.POSTAGE.FAILURE"```
	 */
	purchase_error_code?: string | null
	/** 
	 * The shipping rate purchase error message, if any.
	 * @example ```"Account not allowed for this service."```
	 */
	purchase_error_message?: string | null
	/** 
	 * Any errors collected when fetching shipping rates.
	 * @example ```[{"carrier":"DHLExpress","message":"to_address.postal_code: Shorter than minimum length 3","type":"rate_error"}]```
	 */
	get_rates_errors?: Array<Record<string, any>> | null
	/** 
	 * Time at which the getting of the shipping rates started.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	get_rates_started_at?: string | null
	/** 
	 * Time at which the getting of the shipping rates completed.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	get_rates_completed_at?: string | null
	/** 
	 * Time at which the purchasing of the shipping rate started.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	purchase_started_at?: string | null
	/** 
	 * Time at which the purchasing of the shipping rate completed.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	purchase_completed_at?: string | null
	/** 
	 * Time at which the purchasing of the shipping rate failed.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	purchase_failed_at?: string | null
	/** 
	 * Time at which the shipment was put on hold.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	on_hold_at?: string | null
	/** 
	 * Time at which the shipment was picking.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	picking_at?: string | null
	/** 
	 * Time at which the shipment was packing.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	packing_at?: string | null
	/** 
	 * Time at which the shipment was ready to ship.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	ready_to_ship_at?: string | null
	/** 
	 * Time at which the shipment was shipped.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	shipped_at?: string | null

	order?: Order | null
	shipping_category?: ShippingCategory | null
	inventory_stock_location?: InventoryStockLocation | null
	stock_location?: StockLocation | null
	origin_address?: Address | null
	shipping_address?: Address | null
	shipping_method?: ShippingMethod | null
	delivery_lead_time?: DeliveryLeadTime | null
	pickup?: Pickup | null
	stock_line_items?: StockLineItem[] | null
	stock_transfers?: StockTransfer[] | null
	line_items?: LineItem[] | null
	available_shipping_methods?: ShippingMethod[] | null
	carrier_accounts?: CarrierAccount[] | null
	parcels?: Parcel[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null

}


interface ShipmentCreate extends ResourceCreate {
	
	order: OrderRel
	shipping_category?: ShippingCategoryRel | null
	inventory_stock_location: InventoryStockLocationRel
	shipping_address?: AddressRel | null
	shipping_method?: ShippingMethodRel | null
	tags?: TagRel[] | null

}


interface ShipmentUpdate extends ResourceUpdate {
	
	/** 
	 * Unique identifier for the shipment. Cannot be passed by sales channels.
	 * @example ```"#1234/S/001"```
	 */
	number?: string | null
	/** 
	 * Send this attribute if you want to mark this shipment as upcoming. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_upcoming?: boolean | null
	/** 
	 * Send this attribute if you want to mark this shipment as cancelled (unless already shipped or delivered). Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_cancel?: boolean | null
	/** 
	 * Send this attribute if you want to put this shipment on hold.
	 * @example ```true```
	 */
	_on_hold?: boolean | null
	/** 
	 * Send this attribute if you want to start picking this shipment.
	 * @example ```true```
	 */
	_picking?: boolean | null
	/** 
	 * Send this attribute if you want to start packing this shipment.
	 * @example ```true```
	 */
	_packing?: boolean | null
	/** 
	 * Send this attribute if you want to mark this shipment as ready to ship.
	 * @example ```true```
	 */
	_ready_to_ship?: boolean | null
	/** 
	 * Send this attribute if you want to mark this shipment as shipped.
	 * @example ```true```
	 */
	_ship?: boolean | null
	/** 
	 * Send this attribute if you want to mark this shipment as delivered.
	 * @example ```true```
	 */
	_deliver?: boolean | null
	/** 
	 * Send this attribute if you want to automatically reserve the stock for each of the associated stock line item. Can be done only when fulfillment is in progress. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_reserve_stock?: boolean | null
	/** 
	 * Send this attribute if you want to automatically destroy the stock reservations for each of the associated stock line item. Can be done only when fulfillment is in progress. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_release_stock?: boolean | null
	/** 
	 * Send this attribute if you want to automatically decrement and release the stock for each of the associated stock line item. Can be done only when fulfillment is in progress. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_decrement_stock?: boolean | null
	/** 
	 * Send this attribute if you want get the shipping rates from the associated carrier accounts.
	 * @example ```true```
	 */
	_get_rates?: boolean | null
	/** 
	 * The selected purchase rate from the available shipping rates.
	 * @example ```"rate_f89e4663c3ed47ee94d37763f6d21d54"```
	 */
	selected_rate_id?: string | null
	/** 
	 * Send this attribute if you want to purchase this shipment with the selected rate.
	 * @example ```true```
	 */
	_purchase?: boolean | null
	/** 
	 * Comma separated list of tags to be added. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_add_tags?: string | null
	/** 
	 * Comma separated list of tags to be removed. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_remove_tags?: string | null

	shipping_category?: ShippingCategoryRel | null
	inventory_stock_location?: InventoryStockLocationRel | null
	shipping_address?: AddressRel | null
	shipping_method?: ShippingMethodRel | null
	tags?: TagRel[] | null

}


class Shipments extends ApiResource<Shipment> {

	static readonly TYPE: ShipmentType = 'shipments' as const

	async create(resource: ShipmentCreate, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.create<ShipmentCreate, Shipment>({ ...resource, type: Shipments.TYPE }, params, options)
	}

	async update(resource: ShipmentUpdate, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ ...resource, type: Shipments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Shipments.TYPE } : id, options)
	}

	async order(shipmentId: string | Shipment, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `shipments/${_shipmentId}/order`, params, options) as unknown as Order
	}

	async shipping_category(shipmentId: string | Shipment, params?: QueryParamsRetrieve<ShippingCategory>, options?: ResourcesConfig): Promise<ShippingCategory> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<ShippingCategory>({ type: 'shipping_categories' }, `shipments/${_shipmentId}/shipping_category`, params, options) as unknown as ShippingCategory
	}

	async inventory_stock_location(shipmentId: string | Shipment, params?: QueryParamsRetrieve<InventoryStockLocation>, options?: ResourcesConfig): Promise<InventoryStockLocation> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<InventoryStockLocation>({ type: 'inventory_stock_locations' }, `shipments/${_shipmentId}/inventory_stock_location`, params, options) as unknown as InventoryStockLocation
	}

	async stock_location(shipmentId: string | Shipment, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `shipments/${_shipmentId}/stock_location`, params, options) as unknown as StockLocation
	}

	async origin_address(shipmentId: string | Shipment, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `shipments/${_shipmentId}/origin_address`, params, options) as unknown as Address
	}

	async shipping_address(shipmentId: string | Shipment, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `shipments/${_shipmentId}/shipping_address`, params, options) as unknown as Address
	}

	async shipping_method(shipmentId: string | Shipment, params?: QueryParamsRetrieve<ShippingMethod>, options?: ResourcesConfig): Promise<ShippingMethod> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `shipments/${_shipmentId}/shipping_method`, params, options) as unknown as ShippingMethod
	}

	async delivery_lead_time(shipmentId: string | Shipment, params?: QueryParamsRetrieve<DeliveryLeadTime>, options?: ResourcesConfig): Promise<DeliveryLeadTime> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<DeliveryLeadTime>({ type: 'delivery_lead_times' }, `shipments/${_shipmentId}/delivery_lead_time`, params, options) as unknown as DeliveryLeadTime
	}

	async pickup(shipmentId: string | Shipment, params?: QueryParamsRetrieve<Pickup>, options?: ResourcesConfig): Promise<Pickup> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Pickup>({ type: 'pickups' }, `shipments/${_shipmentId}/pickup`, params, options) as unknown as Pickup
	}

	async stock_line_items(shipmentId: string | Shipment, params?: QueryParamsList<StockLineItem>, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<StockLineItem>({ type: 'stock_line_items' }, `shipments/${_shipmentId}/stock_line_items`, params, options) as unknown as ListResponse<StockLineItem>
	}

	async stock_transfers(shipmentId: string | Shipment, params?: QueryParamsList<StockTransfer>, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<StockTransfer>({ type: 'stock_transfers' }, `shipments/${_shipmentId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
	}

	async line_items(shipmentId: string | Shipment, params?: QueryParamsList<LineItem>, options?: ResourcesConfig): Promise<ListResponse<LineItem>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `shipments/${_shipmentId}/line_items`, params, options) as unknown as ListResponse<LineItem>
	}

	async available_shipping_methods(shipmentId: string | Shipment, params?: QueryParamsList<ShippingMethod>, options?: ResourcesConfig): Promise<ListResponse<ShippingMethod>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `shipments/${_shipmentId}/available_shipping_methods`, params, options) as unknown as ListResponse<ShippingMethod>
	}

	async carrier_accounts(shipmentId: string | Shipment, params?: QueryParamsList<CarrierAccount>, options?: ResourcesConfig): Promise<ListResponse<CarrierAccount>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<CarrierAccount>({ type: 'carrier_accounts' }, `shipments/${_shipmentId}/carrier_accounts`, params, options) as unknown as ListResponse<CarrierAccount>
	}

	async parcels(shipmentId: string | Shipment, params?: QueryParamsList<Parcel>, options?: ResourcesConfig): Promise<ListResponse<Parcel>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Parcel>({ type: 'parcels' }, `shipments/${_shipmentId}/parcels`, params, options) as unknown as ListResponse<Parcel>
	}

	async attachments(shipmentId: string | Shipment, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipments/${_shipmentId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(shipmentId: string | Shipment, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Event>({ type: 'events' }, `shipments/${_shipmentId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(shipmentId: string | Shipment, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `shipments/${_shipmentId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(shipmentId: string | Shipment, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `shipments/${_shipmentId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(shipmentId: string | Shipment, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `shipments/${_shipmentId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}

	async _upcoming(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _upcoming: true }, params, options)
	}

	async _cancel(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _cancel: true }, params, options)
	}

	async _on_hold(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _on_hold: true }, params, options)
	}

	async _picking(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _picking: true }, params, options)
	}

	async _packing(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _packing: true }, params, options)
	}

	async _ready_to_ship(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _ready_to_ship: true }, params, options)
	}

	async _ship(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _ship: true }, params, options)
	}

	async _deliver(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _deliver: true }, params, options)
	}

	async _reserve_stock(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _reserve_stock: true }, params, options)
	}

	async _release_stock(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _release_stock: true }, params, options)
	}

	async _decrement_stock(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _decrement_stock: true }, params, options)
	}

	async _get_rates(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _get_rates: true }, params, options)
	}

	async _purchase(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _purchase: true }, params, options)
	}

	async _add_tags(id: string | Shipment, triggerValue: string, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _add_tags: triggerValue }, params, options)
	}

	async _remove_tags(id: string | Shipment, triggerValue: string, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _remove_tags: triggerValue }, params, options)
	}


	isShipment(resource: any): resource is Shipment {
		return resource.type && (resource.type === Shipments.TYPE)
	}


	relationship(id: string | ResourceId | null): ShipmentRel {
		return super.relationshipOneToOne<ShipmentRel>(id)
	}

	relationshipToMany(...ids: string[]): ShipmentRel[] {
		return super.relationshipOneToMany<ShipmentRel>(...ids)
	}


	type(): ShipmentType {
		return Shipments.TYPE
	}

}


export default Shipments

export type { Shipment, ShipmentCreate, ShipmentUpdate, ShipmentType }
