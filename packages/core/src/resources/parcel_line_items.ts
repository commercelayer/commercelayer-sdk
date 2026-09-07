import type { QueryParamsList, QueryParamsRetrieve } from '../query'
import type {
  ListResponse,
  Resource,
  ResourceCreate,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
  ResourceUpdate,
} from '../resource'
import { ApiResource } from '../resource'
import type { EventStore } from './event_stores'
import type { Parcel, ParcelType } from './parcels'
import type { ShipmentLineItem, ShipmentLineItemType } from './shipment_line_items'
import type { StockLineItem, StockLineItemType } from './stock_line_items'

type ParcelLineItemType = 'parcel_line_items'
type ParcelLineItemRel = ResourceRel & { type: ParcelLineItemType }
type ParcelRel = ResourceRel & { type: ParcelType }
type StockLineItemRel = ResourceRel & { type: StockLineItemType }
type ShipmentLineItemRel = ResourceRel & { type: ShipmentLineItemType }

export type ParcelLineItemSort = Pick<ParcelLineItem, 'id' | 'quantity'> & ResourceSort
// export type ParcelLineItemFilter = Pick<ParcelLineItem, 'id' | 'quantity'> & ResourceFilter

/**
 * The Parcel line item object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/parcel_line_items endpoint.
 *
 * @link https://docs.commercelayer.io/core-api-reference/parcel_line_items/object
 */
interface ParcelLineItem extends Resource {
  readonly type: ParcelLineItemType

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
   * The parcel line item quantity.
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

  parcel?: Parcel | null
  stock_line_item?: StockLineItem | null
  /**
   * @deprecated
   */
  shipment_line_item?: ShipmentLineItem | null
  event_stores?: EventStore[] | null
}

interface ParcelLineItemCreate extends ResourceCreate {
  /**
   * The parcel line item quantity.
   * @example ```4```
   */
  quantity: number

  parcel: ParcelRel
  stock_line_item: StockLineItemRel
  /**
   * @deprecated
   */
  shipment_line_item?: ShipmentLineItemRel | null
}

type ParcelLineItemUpdate = ResourceUpdate

class ParcelLineItems extends ApiResource<ParcelLineItem> {
  static readonly TYPE: ParcelLineItemType = 'parcel_line_items' as const

  async create(
    resource: ParcelLineItemCreate,
    params?: QueryParamsRetrieve<ParcelLineItem>,
    options?: ResourcesConfig,
  ): Promise<ParcelLineItem> {
    return this.resources.create<ParcelLineItemCreate, ParcelLineItem>(
      { ...resource, type: ParcelLineItems.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: ParcelLineItemUpdate,
    params?: QueryParamsRetrieve<ParcelLineItem>,
    options?: ResourcesConfig,
  ): Promise<ParcelLineItem> {
    return this.resources.update<ParcelLineItemUpdate, ParcelLineItem>(
      { ...resource, type: ParcelLineItems.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: ParcelLineItems.TYPE } : id, options)
  }

  async parcel(
    parcelLineItemId: string | ParcelLineItem,
    params?: QueryParamsRetrieve<Parcel>,
    options?: ResourcesConfig,
  ): Promise<Parcel> {
    const _parcelLineItemId = (parcelLineItemId as ParcelLineItem).id || (parcelLineItemId as string)
    return this.resources.fetch<Parcel>(
      { type: 'parcels' },
      `parcel_line_items/${_parcelLineItemId}/parcel`,
      params,
      options,
    ) as unknown as Parcel
  }

  async stock_line_item(
    parcelLineItemId: string | ParcelLineItem,
    params?: QueryParamsRetrieve<StockLineItem>,
    options?: ResourcesConfig,
  ): Promise<StockLineItem> {
    const _parcelLineItemId = (parcelLineItemId as ParcelLineItem).id || (parcelLineItemId as string)
    return this.resources.fetch<StockLineItem>(
      { type: 'stock_line_items' },
      `parcel_line_items/${_parcelLineItemId}/stock_line_item`,
      params,
      options,
    ) as unknown as StockLineItem
  }

  /**
   * @deprecated
   */
  async shipment_line_item(
    parcelLineItemId: string | ParcelLineItem,
    params?: QueryParamsRetrieve<ShipmentLineItem>,
    options?: ResourcesConfig,
  ): Promise<ShipmentLineItem> {
    const _parcelLineItemId = (parcelLineItemId as ParcelLineItem).id || (parcelLineItemId as string)
    return this.resources.fetch<ShipmentLineItem>(
      { type: 'shipment_line_items' },
      `parcel_line_items/${_parcelLineItemId}/shipment_line_item`,
      params,
      options,
    ) as unknown as ShipmentLineItem
  }

  async event_stores(
    parcelLineItemId: string | ParcelLineItem,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _parcelLineItemId = (parcelLineItemId as ParcelLineItem).id || (parcelLineItemId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `parcel_line_items/${_parcelLineItemId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isParcelLineItem(resource: any): resource is ParcelLineItem {
    return resource.type && resource.type === ParcelLineItems.TYPE
  }

  relationship(id: string | ResourceId | null): ParcelLineItemRel {
    return super.relationshipOneToOne<ParcelLineItemRel>(id)
  }

  relationshipToMany(...ids: string[]): ParcelLineItemRel[] {
    return super.relationshipOneToMany<ParcelLineItemRel>(...ids)
  }

  type(): ParcelLineItemType {
    return ParcelLineItems.TYPE
  }
}

const instance = new ParcelLineItems()
export default instance

export type { ParcelLineItem, ParcelLineItemCreate, ParcelLineItems, ParcelLineItemType, ParcelLineItemUpdate }
