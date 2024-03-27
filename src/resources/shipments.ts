import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType, OrderSortable } from './orders'
import type { ShippingCategory, ShippingCategoryType, ShippingCategorySortable } from './shipping_categories'
import type { InventoryStockLocation, InventoryStockLocationType, InventoryStockLocationSortable } from './inventory_stock_locations'
import type { StockLocation, StockLocationSortable } from './stock_locations'
import type { Address, AddressType, AddressSortable } from './addresses'
import type { ShippingMethod, ShippingMethodType, ShippingMethodSortable } from './shipping_methods'
import type { DeliveryLeadTime, DeliveryLeadTimeSortable } from './delivery_lead_times'
import type { StockLineItem, StockLineItemSortable } from './stock_line_items'
import type { StockTransfer, StockTransferSortable } from './stock_transfers'
import type { LineItem, LineItemSortable } from './line_items'
import type { CarrierAccount, CarrierAccountSortable } from './carrier_accounts'
import type { Parcel, ParcelSortable } from './parcels'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Event, EventSortable } from './events'
import type { Tag, TagType, TagSortable } from './tags'
import type { Version, VersionSortable } from './versions'


type ShipmentType = 'shipments'
type ShipmentRel = ResourceRel & { type: ShipmentType }
type OrderRel = ResourceRel & { type: OrderType }
type ShippingCategoryRel = ResourceRel & { type: ShippingCategoryType }
type InventoryStockLocationRel = ResourceRel & { type: InventoryStockLocationType }
type AddressRel = ResourceRel & { type: AddressType }
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }
type TagRel = ResourceRel & { type: TagType }


export type ShipmentSortable = Pick<Shipment, 'id' | 'number' | 'status' | 'cost_amount_cents' | 'get_rates_started_at' | 'get_rates_completed_at' | 'purchase_started_at' | 'purchase_completed_at' | 'purchase_failed_at' | 'on_hold_at' | 'picking_at' | 'packing_at' | 'ready_to_ship_at' | 'shipped_at'> & ResourceSortable
export type ShipmentFilterable = Pick<Shipment, 'id' | 'number' | 'status' | 'cost_amount_cents' | 'get_rates_started_at' | 'get_rates_completed_at' | 'purchase_started_at' | 'purchase_completed_at' | 'purchase_failed_at' | 'on_hold_at' | 'picking_at' | 'packing_at' | 'ready_to_ship_at' | 'shipped_at'> & ResourceFilterable


interface Shipment extends Resource {
	
	readonly type: ShipmentType

	number?: string | null
	status: 'draft' | 'upcoming' | 'cancelled' | 'on_hold' | 'picking' | 'packing' | 'ready_to_ship' | 'shipped'
	currency_code?: string | null
	cost_amount_cents?: number | null
	cost_amount_float?: number | null
	formatted_cost_amount?: string | null
	skus_count?: number | null
	selected_rate_id?: string | null
	rates?: Array<Record<string, any>> | null
	purchase_error_code?: string | null
	purchase_error_message?: string | null
	get_rates_errors?: Array<Record<string, any>> | null
	get_rates_started_at?: string | null
	get_rates_completed_at?: string | null
	purchase_started_at?: string | null
	purchase_completed_at?: string | null
	purchase_failed_at?: string | null
	on_hold_at?: string | null
	picking_at?: string | null
	packing_at?: string | null
	ready_to_ship_at?: string | null
	shipped_at?: string | null

	order?: Order | null
	shipping_category?: ShippingCategory | null
	inventory_stock_location?: InventoryStockLocation | null
	stock_location?: StockLocation | null
	origin_address?: Address | null
	shipping_address?: Address | null
	shipping_method?: ShippingMethod | null
	delivery_lead_time?: DeliveryLeadTime | null
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
	
	_upcoming?: boolean | null
	_on_hold?: boolean | null
	_picking?: boolean | null
	_packing?: boolean | null
	_ready_to_ship?: boolean | null
	_ship?: boolean | null
	_reserve_stock?: boolean | null
	_release_stock?: boolean | null
	_decrement_stock?: boolean | null
	_get_rates?: boolean | null
	selected_rate_id?: string | null
	_purchase?: boolean | null

	shipping_category?: ShippingCategoryRel | null
	inventory_stock_location?: InventoryStockLocationRel | null
	shipping_address?: AddressRel | null
	shipping_method?: ShippingMethodRel | null
	tags?: TagRel[] | null

}


class Shipments extends ApiResource<Shipment, ShipmentSortable> {

	static readonly TYPE: ShipmentType = 'shipments' as const

	async create(resource: ShipmentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.create<ShipmentCreate, Shipment>({ ...resource, type: Shipments.TYPE }, params, options)
	}

	async update(resource: ShipmentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ ...resource, type: Shipments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Shipments.TYPE } : id, options)
	}

	async order(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Order, OrderSortable>({ type: 'orders' }, `shipments/${_shipmentId}/order`, params, options) as unknown as Order
	}

	async shipping_category(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<ShippingCategory, ShippingCategorySortable>({ type: 'shipping_categories' }, `shipments/${_shipmentId}/shipping_category`, params, options) as unknown as ShippingCategory
	}

	async inventory_stock_location(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryStockLocation> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<InventoryStockLocation, InventoryStockLocationSortable>({ type: 'inventory_stock_locations' }, `shipments/${_shipmentId}/inventory_stock_location`, params, options) as unknown as InventoryStockLocation
	}

	async stock_location(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<StockLocation, StockLocationSortable>({ type: 'stock_locations' }, `shipments/${_shipmentId}/stock_location`, params, options) as unknown as StockLocation
	}

	async origin_address(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Address, AddressSortable>({ type: 'addresses' }, `shipments/${_shipmentId}/origin_address`, params, options) as unknown as Address
	}

	async shipping_address(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Address, AddressSortable>({ type: 'addresses' }, `shipments/${_shipmentId}/shipping_address`, params, options) as unknown as Address
	}

	async shipping_method(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<ShippingMethod, ShippingMethodSortable>({ type: 'shipping_methods' }, `shipments/${_shipmentId}/shipping_method`, params, options) as unknown as ShippingMethod
	}

	async delivery_lead_time(shipmentId: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<DeliveryLeadTime> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<DeliveryLeadTime, DeliveryLeadTimeSortable>({ type: 'delivery_lead_times' }, `shipments/${_shipmentId}/delivery_lead_time`, params, options) as unknown as DeliveryLeadTime
	}

	async stock_line_items(shipmentId: string | Shipment, params?: QueryParamsList<StockLineItemSortable>, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<StockLineItem, StockLineItemSortable>({ type: 'stock_line_items' }, `shipments/${_shipmentId}/stock_line_items`, params, options) as unknown as ListResponse<StockLineItem>
	}

	async stock_transfers(shipmentId: string | Shipment, params?: QueryParamsList<StockTransferSortable>, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<StockTransfer, StockTransferSortable>({ type: 'stock_transfers' }, `shipments/${_shipmentId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
	}

	async line_items(shipmentId: string | Shipment, params?: QueryParamsList<LineItemSortable>, options?: ResourcesConfig): Promise<ListResponse<LineItem>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<LineItem, LineItemSortable>({ type: 'line_items' }, `shipments/${_shipmentId}/line_items`, params, options) as unknown as ListResponse<LineItem>
	}

	async available_shipping_methods(shipmentId: string | Shipment, params?: QueryParamsList<ShippingMethodSortable>, options?: ResourcesConfig): Promise<ListResponse<ShippingMethod>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<ShippingMethod, ShippingMethodSortable>({ type: 'shipping_methods' }, `shipments/${_shipmentId}/available_shipping_methods`, params, options) as unknown as ListResponse<ShippingMethod>
	}

	async carrier_accounts(shipmentId: string | Shipment, params?: QueryParamsList<CarrierAccountSortable>, options?: ResourcesConfig): Promise<ListResponse<CarrierAccount>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<CarrierAccount, CarrierAccountSortable>({ type: 'carrier_accounts' }, `shipments/${_shipmentId}/carrier_accounts`, params, options) as unknown as ListResponse<CarrierAccount>
	}

	async parcels(shipmentId: string | Shipment, params?: QueryParamsList<ParcelSortable>, options?: ResourcesConfig): Promise<ListResponse<Parcel>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Parcel, ParcelSortable>({ type: 'parcels' }, `shipments/${_shipmentId}/parcels`, params, options) as unknown as ListResponse<Parcel>
	}

	async attachments(shipmentId: string | Shipment, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `shipments/${_shipmentId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(shipmentId: string | Shipment, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `shipments/${_shipmentId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(shipmentId: string | Shipment, params?: QueryParamsList<TagSortable>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Tag, TagSortable>({ type: 'tags' }, `shipments/${_shipmentId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(shipmentId: string | Shipment, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shipmentId = (shipmentId as Shipment).id || shipmentId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `shipments/${_shipmentId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _upcoming(id: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _upcoming: true }, params, options)
	}

	async _on_hold(id: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _on_hold: true }, params, options)
	}

	async _picking(id: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _picking: true }, params, options)
	}

	async _packing(id: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _packing: true }, params, options)
	}

	async _ready_to_ship(id: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _ready_to_ship: true }, params, options)
	}

	async _ship(id: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _ship: true }, params, options)
	}

	async _reserve_stock(id: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _reserve_stock: true }, params, options)
	}

	async _release_stock(id: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _release_stock: true }, params, options)
	}

	async _decrement_stock(id: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _decrement_stock: true }, params, options)
	}

	async _get_rates(id: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.update<ShipmentUpdate, Shipment>({ id: (typeof id === 'string')? id: id.id, type: Shipments.TYPE, _get_rates: true }, params, options)
	}

	async _purchase(id: string | Shipment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
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

/*
export const ShipmentsClient = (init: ResourceAdapter | ResourcesInitConfig): Shipments => {
	return new Shipments((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
