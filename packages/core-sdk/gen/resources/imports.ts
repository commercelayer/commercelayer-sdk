import type { QueryParamsList, QueryParamsRetrieve } from '@runtime/query'
import type {
  ListResponse,
  Resource,
  ResourceCreate,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
  ResourceUpdate,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'
import type { EventStore } from './event_stores'
import type { Event } from './events'

type ImportType = 'imports'
type ImportRel = ResourceRel & { type: ImportType }

export type ImportSort = Pick<
  Import,
  | 'id'
  | 'resource_type'
  | 'format'
  | 'parent_resource_id'
  | 'status'
  | 'started_at'
  | 'completed_at'
  | 'interrupted_at'
  | 'inputs_size'
  | 'errors_count'
  | 'warnings_count'
  | 'destroyed_count'
  | 'processed_count'
  | 'attachment_url'
> &
  ResourceSort
// export type ImportFilter = Pick<Import, 'id' | 'resource_type' | 'format' | 'parent_resource_id' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'inputs_size' | 'errors_count' | 'warnings_count' | 'destroyed_count' | 'processed_count' | 'errors_log' | 'warnings_log' | 'attachment_url'> & ResourceFilter

/**
 * The Import object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/imports endpoint.
 *
 * @link https://docs.commercelayer.io/core-api-reference/imports/object
 */
interface Import extends Resource {
  readonly type: ImportType

  /**
   * The type of resource being imported. One of 'price_lists', 'line_items', 'addresses', 'tags', 'orders', 'tax_categories', 'skus', 'shipping_categories', 'bundles', 'sku_lists', 'sku_list_items', 'stock_items', 'stock_locations', 'coupons', 'customers', 'customer_addresses', 'customer_payment_sources', 'customer_subscriptions', 'gift_cards', 'line_item_options', 'stock_transfers', 'sku_options', 'prices', or 'price_tiers'.
   * @example ```"skus"```
   */
  resource_type:
    | 'price_lists'
    | 'line_items'
    | 'addresses'
    | 'tags'
    | 'orders'
    | 'tax_categories'
    | 'skus'
    | 'shipping_categories'
    | 'bundles'
    | 'sku_lists'
    | 'sku_list_items'
    | 'stock_items'
    | 'stock_locations'
    | 'coupons'
    | 'customers'
    | 'customer_addresses'
    | 'customer_payment_sources'
    | 'customer_subscriptions'
    | 'gift_cards'
    | 'line_item_options'
    | 'stock_transfers'
    | 'sku_options'
    | 'prices'
    | 'price_tiers'
  /**
   * The format of the import. One of 'csv', or 'json' (default).
   * @example ```"json"```
   */
  format?: 'csv' | 'json' | null
  /**
   * The ID of the parent resource to be associated with imported data.
   * @example ```"1234"```
   */
  parent_resource_id?: string | null
  /**
   * The import job status. One of 'pending' (default), 'in_progress', 'interrupted', or 'completed'.
   * @example ```"in_progress"```
   */
  status: 'pending' | 'in_progress' | 'interrupted' | 'completed'
  /**
   * Time at which the import was started.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  started_at?: string | null
  /**
   * Time at which the import was completed.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  completed_at?: string | null
  /**
   * Time at which the import was interrupted.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  interrupted_at?: string | null
  /**
   * Array of objects representing the resources that are being imported.
   * @example ```[{"code":"ABC","name":"Foo"},{"code":"DEF","name":"Bar"}]```
   */
  inputs: Array<Record<string, any>>
  /**
   * Indicates the size of the objects to be imported.
   * @example ```300```
   */
  inputs_size?: number | null
  /**
   * Indicates the number of import errors, if any.
   * @example ```30```
   */
  errors_count?: number | null
  /**
   * Indicates the number of import warnings, if any.
   * @example ```1```
   */
  warnings_count?: number | null
  /**
   * Indicates the number of records that have been destroyed, if any.
   * @deprecated Last available in API version 2017-08.
   * @example ```99```
   */
  destroyed_count?: number | null
  /**
   * Indicates the number of records that have been processed (created or updated).
   * @example ```270```
   */
  processed_count?: number | null
  /**
   * Contains the import errors, if any.
   * @example ```{"ABC":{"name":["has already been taken"]}}```
   */
  errors_log?: Record<string, any> | null
  /**
   * Contains the import warnings, if any.
   * @example ```{"ABC":["could not be deleted"]}```
   */
  warnings_log?: Record<string, any> | null
  /**
   * Indicates if the import should cleanup records that are not included in the inputs array.
   * @deprecated Last available in API version 2017-08.
   * @example ```true```
   */
  cleanup_records?: boolean | null
  /**
   * Disables the interruption of the import in case its errors exceeds the 10% threshold.
   * @example ```true```
   */
  skip_errors?: boolean | null
  /**
   * The URL the the raw inputs file, which will be generated at import start.
   * @example ```"http://cl_imports.s3.amazonaws.com/"```
   */
  attachment_url?: string | null

  events?: Event[] | null
  event_stores?: EventStore[] | null
}

interface ImportCreate extends ResourceCreate {
  /**
   * The type of resource being imported. One of 'price_lists', 'line_items', 'addresses', 'tags', 'orders', 'tax_categories', 'skus', 'shipping_categories', 'bundles', 'sku_lists', 'sku_list_items', 'stock_items', 'stock_locations', 'coupons', 'customers', 'customer_addresses', 'customer_payment_sources', 'customer_subscriptions', 'gift_cards', 'line_item_options', 'stock_transfers', 'sku_options', 'prices', or 'price_tiers'.
   * @example ```"skus"```
   */
  resource_type:
    | 'price_lists'
    | 'line_items'
    | 'addresses'
    | 'tags'
    | 'orders'
    | 'tax_categories'
    | 'skus'
    | 'shipping_categories'
    | 'bundles'
    | 'sku_lists'
    | 'sku_list_items'
    | 'stock_items'
    | 'stock_locations'
    | 'coupons'
    | 'customers'
    | 'customer_addresses'
    | 'customer_payment_sources'
    | 'customer_subscriptions'
    | 'gift_cards'
    | 'line_item_options'
    | 'stock_transfers'
    | 'sku_options'
    | 'prices'
    | 'price_tiers'
  /**
   * The format of the import. One of 'csv', or 'json' (default).
   * @example ```"json"```
   */
  format?: 'csv' | 'json' | null
  /**
   * The ID of the parent resource to be associated with imported data.
   * @example ```"1234"```
   */
  parent_resource_id?: string | null
  /**
   * Array of objects representing the resources that are being imported.
   * @example ```[{"code":"ABC","name":"Foo"},{"code":"DEF","name":"Bar"}]```
   */
  inputs: Array<Record<string, any>>
  /**
   * Indicates if the import should cleanup records that are not included in the inputs array.
   * @deprecated Last available in API version 2017-08.
   * @example ```true```
   */
  cleanup_records?: boolean | null
  /**
   * Disables the interruption of the import in case its errors exceeds the 10% threshold.
   * @example ```true```
   */
  skip_errors?: boolean | null
}

interface ImportUpdate extends ResourceUpdate {
  /**
   * Send this attribute if you want to mark status as 'interrupted'.
   * @example ```true```
   */
  _interrupt?: boolean | null
}

class Imports extends ApiResource<Import> {
  static readonly TYPE: ImportType = 'imports' as const

  async create(
    resource: ImportCreate,
    params?: QueryParamsRetrieve<Import>,
    options?: ResourcesConfig,
  ): Promise<Import> {
    return this.resources.create<ImportCreate, Import>({ ...resource, type: Imports.TYPE }, params, options)
  }

  async update(
    resource: ImportUpdate,
    params?: QueryParamsRetrieve<Import>,
    options?: ResourcesConfig,
  ): Promise<Import> {
    return this.resources.update<ImportUpdate, Import>({ ...resource, type: Imports.TYPE }, params, options)
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: Imports.TYPE } : id, options)
  }

  async events(
    importId: string | Import,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _importId = (importId as Import).id || (importId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `imports/${_importId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    importId: string | Import,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _importId = (importId as Import).id || (importId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `imports/${_importId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _interrupt(
    id: string | Import,
    params?: QueryParamsRetrieve<Import>,
    options?: ResourcesConfig,
  ): Promise<Import> {
    return this.resources.update<ImportUpdate, Import>(
      { id: typeof id === 'string' ? id : id.id, type: Imports.TYPE, _interrupt: true },
      params,
      options,
    )
  }

  isImport(resource: any): resource is Import {
    return resource.type && resource.type === Imports.TYPE
  }

  relationship(id: string | ResourceId | null): ImportRel {
    return super.relationshipOneToOne<ImportRel>(id)
  }

  relationshipToMany(...ids: string[]): ImportRel[] {
    return super.relationshipOneToMany<ImportRel>(...ids)
  }

  type(): ImportType {
    return Imports.TYPE
  }
}

const instance = new Imports()
export default instance

export type { Import, ImportCreate, Imports, ImportType, ImportUpdate }
