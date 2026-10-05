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
import type { Sku } from './skus'
import type { StockItem } from './stock_items'
import type { StockReservation } from './stock_reservations'

type ReservedStockType = 'reserved_stocks'
type ReservedStockRel = ResourceRel & { type: ReservedStockType }

export type ReservedStockSort = Pick<ReservedStock, 'id' | 'quantity'> & ResourceSort
// export type ReservedStockFilter = Pick<ReservedStock, 'id' | 'quantity'> & ResourceFilter

/**
 * The Reserved stock object is returned as part of the response body of each successful list or retrieve API call to the /api/reserved_stocks endpoint.
 *
 * @link https://docs.commercelayer.io/core-api-reference/reserved_stocks/object
 */
interface ReservedStock extends Resource {
  readonly type: ReservedStockType

  /**
   * The stock item reserved quantity.
   * @example ```100```
   */
  quantity: number

  stock_item?: StockItem | null
  sku?: Sku | null
  stock_reservations?: StockReservation[] | null
  event_stores?: EventStore[] | null
}

class ReservedStocks extends ApiResource<ReservedStock> {
  static readonly TYPE: ReservedStockType = 'reserved_stocks' as const

  async stock_item(
    reservedStockId: string | ReservedStock,
    params?: QueryParamsRetrieve<StockItem>,
    options?: ResourcesConfig,
  ): Promise<StockItem> {
    const _reservedStockId = (reservedStockId as ReservedStock).id || (reservedStockId as string)
    return this.resources.fetch<StockItem>(
      { type: 'stock_items' },
      `reserved_stocks/${_reservedStockId}/stock_item`,
      params,
      options,
    ) as unknown as StockItem
  }

  async sku(
    reservedStockId: string | ReservedStock,
    params?: QueryParamsRetrieve<Sku>,
    options?: ResourcesConfig,
  ): Promise<Sku> {
    const _reservedStockId = (reservedStockId as ReservedStock).id || (reservedStockId as string)
    return this.resources.fetch<Sku>(
      { type: 'skus' },
      `reserved_stocks/${_reservedStockId}/sku`,
      params,
      options,
    ) as unknown as Sku
  }

  async stock_reservations(
    reservedStockId: string | ReservedStock,
    params?: QueryParamsList<StockReservation>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<StockReservation>> {
    const _reservedStockId = (reservedStockId as ReservedStock).id || (reservedStockId as string)
    return this.resources.fetch<StockReservation>(
      { type: 'stock_reservations' },
      `reserved_stocks/${_reservedStockId}/stock_reservations`,
      params,
      options,
    ) as unknown as ListResponse<StockReservation>
  }

  async event_stores(
    reservedStockId: string | ReservedStock,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _reservedStockId = (reservedStockId as ReservedStock).id || (reservedStockId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `reserved_stocks/${_reservedStockId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isReservedStock(resource: any): resource is ReservedStock {
    return resource.type && resource.type === ReservedStocks.TYPE
  }

  relationship(id: string | ResourceId | null): ReservedStockRel {
    return super.relationshipOneToOne<ReservedStockRel>(id)
  }

  relationshipToMany(...ids: string[]): ReservedStockRel[] {
    return super.relationshipOneToMany<ReservedStockRel>(...ids)
  }

  type(): ReservedStockType {
    return ReservedStocks.TYPE
  }
}

const instance = new ReservedStocks()
export default instance

export type { ReservedStock, ReservedStocks, ReservedStockType }
