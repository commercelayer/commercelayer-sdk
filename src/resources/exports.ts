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
import type { Event } from './events'

type ExportType = 'exports'
type ExportRel = ResourceRel & { type: ExportType }

export type ExportSort = Pick<
  Export,
  | 'id'
  | 'resource_type'
  | 'format'
  | 'status'
  | 'started_at'
  | 'completed_at'
  | 'interrupted_at'
  | 'records_count'
  | 'processed_count'
  | 'attachment_url'
> &
  ResourceSort
// export type ExportFilter = Pick<Export, 'id' | 'resource_type' | 'format' | 'status' | 'started_at' | 'completed_at' | 'interrupted_at' | 'records_count' | 'processed_count' | 'attachment_url' | 'errors_log'> & ResourceFilter

/**
 * The Export object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/exports endpoint.
 *
 * @link https://docs.commercelayer.io/core-api-reference/exports/object
 */
interface Export extends Resource {
  readonly type: ExportType

  /**
   * The type of resource being exported. One of 'applications', 'event_stores', 'organizations', 'addresses', 'geocoders', 'events', 'tags', 'adjustments', 'price_lists', 'payment_gateways', 'payment_methods', 'markets', 'customer_groups', 'line_items', 'discount_engine_items', 'promotions', 'adyen_payments', 'orders', 'transactions', 'order_factories', 'attachments', 'tax_calculators', 'tax_categories', 'skus', 'shipping_categories', 'axerve_payments', 'order_validation_rules', 'braintree_payments', 'bundles', 'sku_lists', 'sku_list_items', 'stock_items', 'stock_locations', 'promotion_rules', 'coupons', 'returns', 'carrier_accounts', 'checkout_com_payments', 'customers', 'customer_addresses', 'customer_payment_sources', 'customer_subscriptions', 'order_subscriptions', 'customer_password_resets', 'delivery_lead_times', 'shipping_methods', 'shipments', 'discount_engines', 'pickups', 'parcels', 'webhooks', 'event_callbacks', 'external_payments', 'gift_cards', 'in_stock_subscriptions', 'inventory_models', 'inventory_stock_locations', 'inventory_return_locations', 'klarna_payments', 'line_item_options', 'return_line_items', 'stock_line_items', 'stock_reservations', 'stock_transfers', 'notifications', 'sku_options', 'links', 'tax_rules', 'merchants', 'subscription_models', 'stores', 'price_list_schedulers', 'order_subscription_items', 'payment_options', 'resource_errors', 'paypal_payments', 'packages', 'parcel_line_items', 'prices', 'price_tiers', 'reserved_stocks', 'satispay_payments', 'shipping_method_tiers', 'shipping_zones', 'stripe_payments', or 'wire_transfers'.
   * @example ```"skus"```
   */
  resource_type:
    | 'applications'
    | 'event_stores'
    | 'organizations'
    | 'addresses'
    | 'geocoders'
    | 'events'
    | 'tags'
    | 'adjustments'
    | 'price_lists'
    | 'payment_gateways'
    | 'payment_methods'
    | 'markets'
    | 'customer_groups'
    | 'line_items'
    | 'discount_engine_items'
    | 'promotions'
    | 'adyen_payments'
    | 'orders'
    | 'transactions'
    | 'order_factories'
    | 'attachments'
    | 'tax_calculators'
    | 'tax_categories'
    | 'skus'
    | 'shipping_categories'
    | 'axerve_payments'
    | 'order_validation_rules'
    | 'braintree_payments'
    | 'bundles'
    | 'sku_lists'
    | 'sku_list_items'
    | 'stock_items'
    | 'stock_locations'
    | 'promotion_rules'
    | 'coupons'
    | 'returns'
    | 'carrier_accounts'
    | 'checkout_com_payments'
    | 'customers'
    | 'customer_addresses'
    | 'customer_payment_sources'
    | 'customer_subscriptions'
    | 'order_subscriptions'
    | 'customer_password_resets'
    | 'delivery_lead_times'
    | 'shipping_methods'
    | 'shipments'
    | 'discount_engines'
    | 'pickups'
    | 'parcels'
    | 'webhooks'
    | 'event_callbacks'
    | 'external_payments'
    | 'gift_cards'
    | 'in_stock_subscriptions'
    | 'inventory_models'
    | 'inventory_stock_locations'
    | 'inventory_return_locations'
    | 'klarna_payments'
    | 'line_item_options'
    | 'return_line_items'
    | 'stock_line_items'
    | 'stock_reservations'
    | 'stock_transfers'
    | 'notifications'
    | 'sku_options'
    | 'links'
    | 'tax_rules'
    | 'merchants'
    | 'subscription_models'
    | 'stores'
    | 'price_list_schedulers'
    | 'order_subscription_items'
    | 'payment_options'
    | 'resource_errors'
    | 'paypal_payments'
    | 'packages'
    | 'parcel_line_items'
    | 'prices'
    | 'price_tiers'
    | 'reserved_stocks'
    | 'satispay_payments'
    | 'shipping_method_tiers'
    | 'shipping_zones'
    | 'stripe_payments'
    | 'wire_transfers'
  /**
   * The format of the export. One of 'csv', or 'json' (default).
   * @example ```"json"```
   */
  format?: 'csv' | 'json' | null
  /**
   * The export job status. One of 'pending' (default), 'in_progress', 'interrupted', 'completed', or 'failed'.
   * @example ```"in_progress"```
   */
  status: 'pending' | 'in_progress' | 'interrupted' | 'completed' | 'failed'
  /**
   * List of related resources that should be included in the export (redundant when 'fields' are specified).
   * @example ```["prices.price_tiers"]```
   */
  includes?: string[] | null
  /**
   * List of fields to export for the main and related resources (automatically included). Pass the asterisk '*' to include all exportable fields for the main and related resources.
   * @example ```["code","name","prices.*","prices.price_tiers.price_amount_cents"]```
   */
  fields?: string[] | null
  /**
   * The filters used to select the records to be exported.
   * @example ```{"code_eq":"AAA"}```
   */
  filters?: Record<string, any> | null
  /**
   * Send this attribute if you want to skip exporting redundant attributes (IDs, timestamps, blanks, etc.), useful when combining export and import to duplicate your dataset.
   */
  dry_data?: boolean | null
  /**
   * Send this attribute to apply JWT scope–based sales channel filtering to the exported data.
   * @example ```true```
   */
  jwt_filters?: boolean | null
  /**
   * Time at which the export was started.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  started_at?: string | null
  /**
   * Time at which the export was completed.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  completed_at?: string | null
  /**
   * Estimated time at which the export should complete (dynamically refres^hed).
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  estimated_completion_at?: string | null
  /**
   * Time at which the export was interrupted.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  interrupted_at?: string | null
  /**
   * Indicates the number of records to be exported.
   * @example ```300```
   */
  records_count?: number | null
  /**
   * Indicates how many records have been processed in real time.
   * @example ```270```
   */
  processed_count?: number | null
  /**
   * The percentage of progress of the export.
   * @example ```30```
   */
  progress?: number | null
  /**
   * The URL to the output file, which will be generated upon export completion.
   * @example ```"http://cl_exports.s3.amazonaws.com/"```
   */
  attachment_url?: string | null
  /**
   * Contains the exports errors, if any.
   * @example ```{"RuntimeError":"query timeout"}```
   */
  errors_log?: Record<string, any> | null

  events?: Event[] | null
  event_stores?: EventStore[] | null
}

interface ExportCreate extends ResourceCreate {
  /**
   * The type of resource being exported. One of 'applications', 'event_stores', 'organizations', 'addresses', 'geocoders', 'events', 'tags', 'adjustments', 'price_lists', 'payment_gateways', 'payment_methods', 'markets', 'customer_groups', 'line_items', 'discount_engine_items', 'promotions', 'adyen_payments', 'orders', 'transactions', 'order_factories', 'attachments', 'tax_calculators', 'tax_categories', 'skus', 'shipping_categories', 'axerve_payments', 'order_validation_rules', 'braintree_payments', 'bundles', 'sku_lists', 'sku_list_items', 'stock_items', 'stock_locations', 'promotion_rules', 'coupons', 'returns', 'carrier_accounts', 'checkout_com_payments', 'customers', 'customer_addresses', 'customer_payment_sources', 'customer_subscriptions', 'order_subscriptions', 'customer_password_resets', 'delivery_lead_times', 'shipping_methods', 'shipments', 'discount_engines', 'pickups', 'parcels', 'webhooks', 'event_callbacks', 'external_payments', 'gift_cards', 'in_stock_subscriptions', 'inventory_models', 'inventory_stock_locations', 'inventory_return_locations', 'klarna_payments', 'line_item_options', 'return_line_items', 'stock_line_items', 'stock_reservations', 'stock_transfers', 'notifications', 'sku_options', 'links', 'tax_rules', 'merchants', 'subscription_models', 'stores', 'price_list_schedulers', 'order_subscription_items', 'payment_options', 'resource_errors', 'paypal_payments', 'packages', 'parcel_line_items', 'prices', 'price_tiers', 'reserved_stocks', 'satispay_payments', 'shipping_method_tiers', 'shipping_zones', 'stripe_payments', or 'wire_transfers'.
   * @example ```"skus"```
   */
  resource_type:
    | 'applications'
    | 'event_stores'
    | 'organizations'
    | 'addresses'
    | 'geocoders'
    | 'events'
    | 'tags'
    | 'adjustments'
    | 'price_lists'
    | 'payment_gateways'
    | 'payment_methods'
    | 'markets'
    | 'customer_groups'
    | 'line_items'
    | 'discount_engine_items'
    | 'promotions'
    | 'adyen_payments'
    | 'orders'
    | 'transactions'
    | 'order_factories'
    | 'attachments'
    | 'tax_calculators'
    | 'tax_categories'
    | 'skus'
    | 'shipping_categories'
    | 'axerve_payments'
    | 'order_validation_rules'
    | 'braintree_payments'
    | 'bundles'
    | 'sku_lists'
    | 'sku_list_items'
    | 'stock_items'
    | 'stock_locations'
    | 'promotion_rules'
    | 'coupons'
    | 'returns'
    | 'carrier_accounts'
    | 'checkout_com_payments'
    | 'customers'
    | 'customer_addresses'
    | 'customer_payment_sources'
    | 'customer_subscriptions'
    | 'order_subscriptions'
    | 'customer_password_resets'
    | 'delivery_lead_times'
    | 'shipping_methods'
    | 'shipments'
    | 'discount_engines'
    | 'pickups'
    | 'parcels'
    | 'webhooks'
    | 'event_callbacks'
    | 'external_payments'
    | 'gift_cards'
    | 'in_stock_subscriptions'
    | 'inventory_models'
    | 'inventory_stock_locations'
    | 'inventory_return_locations'
    | 'klarna_payments'
    | 'line_item_options'
    | 'return_line_items'
    | 'stock_line_items'
    | 'stock_reservations'
    | 'stock_transfers'
    | 'notifications'
    | 'sku_options'
    | 'links'
    | 'tax_rules'
    | 'merchants'
    | 'subscription_models'
    | 'stores'
    | 'price_list_schedulers'
    | 'order_subscription_items'
    | 'payment_options'
    | 'resource_errors'
    | 'paypal_payments'
    | 'packages'
    | 'parcel_line_items'
    | 'prices'
    | 'price_tiers'
    | 'reserved_stocks'
    | 'satispay_payments'
    | 'shipping_method_tiers'
    | 'shipping_zones'
    | 'stripe_payments'
    | 'wire_transfers'
  /**
   * The format of the export. One of 'csv', or 'json' (default).
   * @example ```"json"```
   */
  format?: 'csv' | 'json' | null
  /**
   * List of related resources that should be included in the export (redundant when 'fields' are specified).
   * @example ```["prices.price_tiers"]```
   */
  includes?: string[] | null
  /**
   * List of fields to export for the main and related resources (automatically included). Pass the asterisk '*' to include all exportable fields for the main and related resources.
   * @example ```["code","name","prices.*","prices.price_tiers.price_amount_cents"]```
   */
  fields?: string[] | null
  /**
   * The filters used to select the records to be exported.
   * @example ```{"code_eq":"AAA"}```
   */
  filters?: Record<string, any> | null
  /**
   * Send this attribute if you want to skip exporting redundant attributes (IDs, timestamps, blanks, etc.), useful when combining export and import to duplicate your dataset.
   */
  dry_data?: boolean | null
  /**
   * Send this attribute to apply JWT scope–based sales channel filtering to the exported data.
   * @example ```true```
   */
  jwt_filters?: boolean | null
}

interface ExportUpdate extends ResourceUpdate {
  /**
   * Send this attribute if you want to restart an 'interrupted' export.
   * @example ```true```
   */
  _start?: boolean | null
  /**
   * Send this attribute if you want to mark status as 'interrupted'.
   * @example ```true```
   */
  _interrupt?: boolean | null
}

class Exports extends ApiResource<Export> {
  static readonly TYPE: ExportType = 'exports' as const

  async create(
    resource: ExportCreate,
    params?: QueryParamsRetrieve<Export>,
    options?: ResourcesConfig,
  ): Promise<Export> {
    return this.resources.create<ExportCreate, Export>({ ...resource, type: Exports.TYPE }, params, options)
  }

  async update(
    resource: ExportUpdate,
    params?: QueryParamsRetrieve<Export>,
    options?: ResourcesConfig,
  ): Promise<Export> {
    return this.resources.update<ExportUpdate, Export>({ ...resource, type: Exports.TYPE }, params, options)
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: Exports.TYPE } : id, options)
  }

  async events(
    exportId: string | Export,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _exportId = (exportId as Export).id || (exportId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `exports/${_exportId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    exportId: string | Export,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _exportId = (exportId as Export).id || (exportId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `exports/${_exportId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _start(id: string | Export, params?: QueryParamsRetrieve<Export>, options?: ResourcesConfig): Promise<Export> {
    return this.resources.update<ExportUpdate, Export>(
      { id: typeof id === 'string' ? id : id.id, type: Exports.TYPE, _start: true },
      params,
      options,
    )
  }

  async _interrupt(
    id: string | Export,
    params?: QueryParamsRetrieve<Export>,
    options?: ResourcesConfig,
  ): Promise<Export> {
    return this.resources.update<ExportUpdate, Export>(
      { id: typeof id === 'string' ? id : id.id, type: Exports.TYPE, _interrupt: true },
      params,
      options,
    )
  }

  isExport(resource: any): resource is Export {
    return resource.type && resource.type === Exports.TYPE
  }

  relationship(id: string | ResourceId | null): ExportRel {
    return super.relationshipOneToOne<ExportRel>(id)
  }

  relationshipToMany(...ids: string[]): ExportRel[] {
    return super.relationshipOneToMany<ExportRel>(...ids)
  }

  type(): ExportType {
    return Exports.TYPE
  }
}

const instance = new Exports()
export default instance

export type { Export, ExportCreate, Exports, ExportType, ExportUpdate }
