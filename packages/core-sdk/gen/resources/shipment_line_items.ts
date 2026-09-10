import type { QueryParamsList, QueryParamsRetrieve } from '@runtime/query'
import type {
  ListResponse,
  Resource,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'
import type { EventStore } from './event_stores'
import type { LineItem } from './line_items'
import type { Shipment } from './shipments'
import type { Sku } from './skus'
import type { StockItem } from './stock_items'
import type { StockReservation } from './stock_reservations'

type ShipmentLineItemType = 'shipment_line_items'
type ShipmentLineItemRel = ResourceRel & { type: ShipmentLineItemType }

export type ShipmentLineItemSort = Pick<ShipmentLineItem, 'id' | 'quantity'> & ResourceSort
// export type ShipmentLineItemFilter = Pick<ShipmentLineItem, 'id' | 'sku_code' | 'quantity'> & ResourceFilter

/**
 * The Shipment line item object is returned as part of the response body of each successful list or retrieve API call to the /api/shipment_line_items endpoint.
 *
 * @deprecated Last available in API version 2017-08.
 * @link https://docs.commercelayer.io/core-api-reference/shipment_line_items/object
 */
interface ShipmentLineItem extends Resource {
  readonly type: ShipmentLineItemType

  /**
   * The code of the associated SKU.
   * @example ```"TSHIRTMM000000FFFFFFXLXX"```
   */
  sku_code?: string | null
  /**
   * The code of the associated bundle.
   * @example ```"BUNDLEMM000000FFFFFFXLXX"```
   */
  bundle_code?: string | null
  /**
   * The line item quantity.
   * @example ```4```
   */
  quantity: number
  /**
   * The internal name of the associated line item.
   * @example ```"Men's Black T-shirt with White Logo (XL)"```
   */
  name?: string | null
  /**
   * The image_url of the associated line item.
   * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
   */
  image_url?: string | null

  shipment?: Shipment | null
  line_item?: LineItem | null
  stock_item?: StockItem | null
  sku?: Sku | null
  stock_reservation?: StockReservation | null
  event_stores?: EventStore[] | null
}

/** @deprecated Last available in API version 2017-08. */
class ShipmentLineItems extends ApiResource<ShipmentLineItem> {
  static readonly TYPE: ShipmentLineItemType = 'shipment_line_items' as const

  async shipment(
    shipmentLineItemId: string | ShipmentLineItem,
    params?: QueryParamsRetrieve<Shipment>,
    options?: ResourcesConfig,
  ): Promise<Shipment> {
    const _shipmentLineItemId = (shipmentLineItemId as ShipmentLineItem).id || (shipmentLineItemId as string)
    return this.resources.fetch<Shipment>(
      { type: 'shipments' },
      `shipment_line_items/${_shipmentLineItemId}/shipment`,
      params,
      options,
    ) as unknown as Shipment
  }

  async line_item(
    shipmentLineItemId: string | ShipmentLineItem,
    params?: QueryParamsRetrieve<LineItem>,
    options?: ResourcesConfig,
  ): Promise<LineItem> {
    const _shipmentLineItemId = (shipmentLineItemId as ShipmentLineItem).id || (shipmentLineItemId as string)
    return this.resources.fetch<LineItem>(
      { type: 'line_items' },
      `shipment_line_items/${_shipmentLineItemId}/line_item`,
      params,
      options,
    ) as unknown as LineItem
  }

  async stock_item(
    shipmentLineItemId: string | ShipmentLineItem,
    params?: QueryParamsRetrieve<StockItem>,
    options?: ResourcesConfig,
  ): Promise<StockItem> {
    const _shipmentLineItemId = (shipmentLineItemId as ShipmentLineItem).id || (shipmentLineItemId as string)
    return this.resources.fetch<StockItem>(
      { type: 'stock_items' },
      `shipment_line_items/${_shipmentLineItemId}/stock_item`,
      params,
      options,
    ) as unknown as StockItem
  }

  async sku(
    shipmentLineItemId: string | ShipmentLineItem,
    params?: QueryParamsRetrieve<Sku>,
    options?: ResourcesConfig,
  ): Promise<Sku> {
    const _shipmentLineItemId = (shipmentLineItemId as ShipmentLineItem).id || (shipmentLineItemId as string)
    return this.resources.fetch<Sku>(
      { type: 'skus' },
      `shipment_line_items/${_shipmentLineItemId}/sku`,
      params,
      options,
    ) as unknown as Sku
  }

  async stock_reservation(
    shipmentLineItemId: string | ShipmentLineItem,
    params?: QueryParamsRetrieve<StockReservation>,
    options?: ResourcesConfig,
  ): Promise<StockReservation> {
    const _shipmentLineItemId = (shipmentLineItemId as ShipmentLineItem).id || (shipmentLineItemId as string)
    return this.resources.fetch<StockReservation>(
      { type: 'stock_reservations' },
      `shipment_line_items/${_shipmentLineItemId}/stock_reservation`,
      params,
      options,
    ) as unknown as StockReservation
  }

  async event_stores(
    shipmentLineItemId: string | ShipmentLineItem,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _shipmentLineItemId = (shipmentLineItemId as ShipmentLineItem).id || (shipmentLineItemId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `shipment_line_items/${_shipmentLineItemId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isShipmentLineItem(resource: any): resource is ShipmentLineItem {
    return resource.type && resource.type === ShipmentLineItems.TYPE
  }

  relationship(id: string | ResourceId | null): ShipmentLineItemRel {
    return super.relationshipOneToOne<ShipmentLineItemRel>(id)
  }

  relationshipToMany(...ids: string[]): ShipmentLineItemRel[] {
    return super.relationshipOneToMany<ShipmentLineItemRel>(...ids)
  }

  type(): ShipmentLineItemType {
    return ShipmentLineItems.TYPE
  }
}

const instance = new ShipmentLineItems()
export default instance

export type { ShipmentLineItem, ShipmentLineItems, ShipmentLineItemType }
