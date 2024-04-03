import type { Nullable } from '../types'
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
import type { StockLineItem } from './stock_line_items'
import type { StockTransfer } from './stock_transfers'
import type { LineItem } from './line_items'
import type { CarrierAccount } from './carrier_accounts'
import type { Parcel } from './parcels'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'


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

	number?: Nullable<string>
	status: 'draft' | 'upcoming' | 'cancelled' | 'on_hold' | 'picking' | 'packing' | 'ready_to_ship' | 'shipped'
	currency_code?: Nullable<string>
	cost_amount_cents?: Nullable<number>
	cost_amount_float?: Nullable<number>
	formatted_cost_amount?: Nullable<string>
	skus_count?: Nullable<number>
	selected_rate_id?: Nullable<string>
	rates?: Nullable<Array<Record<string, any>>>
	purchase_error_code?: Nullable<string>
	purchase_error_message?: Nullable<string>
	get_rates_errors?: Nullable<Array<Record<string, any>>>
	get_rates_started_at?: Nullable<string>
	get_rates_completed_at?: Nullable<string>
	purchase_started_at?: Nullable<string>
	purchase_completed_at?: Nullable<string>
	purchase_failed_at?: Nullable<string>
	on_hold_at?: Nullable<string>
	picking_at?: Nullable<string>
	packing_at?: Nullable<string>
	ready_to_ship_at?: Nullable<string>
	shipped_at?: Nullable<string>

	order?: Nullable<Order>
	shipping_category?: Nullable<ShippingCategory>
	inventory_stock_location?: Nullable<InventoryStockLocation>
	stock_location?: Nullable<StockLocation>
	origin_address?: Nullable<Address>
	shipping_address?: Nullable<Address>
	shipping_method?: Nullable<ShippingMethod>
	delivery_lead_time?: Nullable<DeliveryLeadTime>
	stock_line_items?: Nullable<StockLineItem[]>
	stock_transfers?: Nullable<StockTransfer[]>
	line_items?: Nullable<LineItem[]>
	available_shipping_methods?: Nullable<ShippingMethod[]>
	carrier_accounts?: Nullable<CarrierAccount[]>
	parcels?: Nullable<Parcel[]>
	attachments?: Nullable<Attachment[]>
	events?: Nullable<Event[]>
	tags?: Nullable<Tag[]>
	versions?: Nullable<Version[]>

}


interface ShipmentCreate extends ResourceCreate {
	
	order: OrderRel
	shipping_category?: Nullable<ShippingCategoryRel>
	inventory_stock_location: InventoryStockLocationRel
	shipping_address?: Nullable<AddressRel>
	shipping_method?: Nullable<ShippingMethodRel>
	tags?: Nullable<TagRel[]>

}


interface ShipmentUpdate extends ResourceUpdate {
	
	_upcoming?: Nullable<boolean>
	_on_hold?: Nullable<boolean>
	_picking?: Nullable<boolean>
	_packing?: Nullable<boolean>
	_ready_to_ship?: Nullable<boolean>
	_ship?: Nullable<boolean>
	_reserve_stock?: Nullable<boolean>
	_release_stock?: Nullable<boolean>
	_decrement_stock?: Nullable<boolean>
	_get_rates?: Nullable<boolean>
	selected_rate_id?: Nullable<string>
	_purchase?: Nullable<boolean>

	shipping_category?: Nullable<ShippingCategoryRel>
	inventory_stock_location?: Nullable<InventoryStockLocationRel>
	shipping_address?: Nullable<AddressRel>
	shipping_method?: Nullable<ShippingMethodRel>
	tags?: Nullable<TagRel[]>

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

	async _upcoming(id: string | Shipment, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _upcoming: true }, params, options)
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
