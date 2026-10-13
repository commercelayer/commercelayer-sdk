import type { Resource, ResourceId, ResourceRel, ResourceSort /* ResourceFilter */ } from '@runtime/resource'
import { ApiResource } from '@runtime/resource'

type EventStoreType = 'event_stores'
type EventStoreRel = ResourceRel & { type: EventStoreType }

export type EventStoreSort = Pick<EventStore, 'id'> & ResourceSort
// export type EventStoreFilter = Pick<EventStore, 'id'> & ResourceFilter

/**
 * The Event store object is returned as part of the response body of each successful retrieve API call to the /api/event_stores endpoint.
 *
 * @link https://docs.commercelayer.io/core-api-reference/event_stores/object
 */
interface EventStore extends Resource {
  readonly type: EventStoreType

  /**
   * The type of the affected resource. One of 'addresses', 'adjustments', 'adyen_payments', 'applications', 'attachments', 'axerve_payments', 'braintree_payments', 'bundles', 'carrier_accounts', 'checkout_com_payments', 'coupons', 'customer_addresses', 'customer_groups', 'customer_password_resets', 'customer_payment_sources', 'customer_subscriptions', 'customers', 'delivery_lead_times', 'event_callbacks', 'event_stores', 'events', 'external_payments', 'geocoders', 'gift_cards', 'in_stock_subscriptions', 'inventory_models', 'inventory_return_locations', 'inventory_stock_locations', 'klarna_payments', 'line_item_options', 'line_items', 'links', 'markets', 'merchants', 'notifications', 'order_factories', 'order_subscription_items', 'order_subscriptions', 'order_validation_rules', 'orders', 'packages', 'parcel_line_items', 'parcels', 'payment_gateways', 'payment_links', 'payment_methods', 'payment_options', 'payment_sessions', 'payment_settings', 'payment_transactions', 'payment_wallets', 'paypal_payments', 'pickups', 'price_list_schedulers', 'price_lists', 'price_tiers', 'prices', 'promotion_rules', 'promotions', 'reserved_stocks', 'resource_errors', 'return_line_items', 'returns', 'satispay_payments', 'shipments', 'shipping_categories', 'shipping_method_tiers', 'shipping_methods', 'shipping_zones', 'sku_list_items', 'sku_lists', 'sku_options', 'skus', 'stock_items', 'stock_line_items', 'stock_locations', 'stock_reservations', 'stock_transfers', 'stores', 'stripe_payments', 'subscription_models', 'tags', 'tax_calculators', 'tax_categories', 'tax_rules', 'transactions', 'webhooks', or 'wire_transfers'.
   * @example ```"orders"```
   */
  resource_type?:
    | 'addresses'
    | 'adjustments'
    | 'adyen_payments'
    | 'applications'
    | 'attachments'
    | 'axerve_payments'
    | 'braintree_payments'
    | 'bundles'
    | 'carrier_accounts'
    | 'checkout_com_payments'
    | 'coupons'
    | 'customer_addresses'
    | 'customer_groups'
    | 'customer_password_resets'
    | 'customer_payment_sources'
    | 'customer_subscriptions'
    | 'customers'
    | 'delivery_lead_times'
    | 'event_callbacks'
    | 'event_stores'
    | 'events'
    | 'external_payments'
    | 'geocoders'
    | 'gift_cards'
    | 'in_stock_subscriptions'
    | 'inventory_models'
    | 'inventory_return_locations'
    | 'inventory_stock_locations'
    | 'klarna_payments'
    | 'line_item_options'
    | 'line_items'
    | 'links'
    | 'markets'
    | 'merchants'
    | 'notifications'
    | 'order_factories'
    | 'order_subscription_items'
    | 'order_subscriptions'
    | 'order_validation_rules'
    | 'orders'
    | 'packages'
    | 'parcel_line_items'
    | 'parcels'
    | 'payment_gateways'
    | 'payment_links'
    | 'payment_methods'
    | 'payment_options'
    | 'payment_sessions'
    | 'payment_settings'
    | 'payment_transactions'
    | 'payment_wallets'
    | 'paypal_payments'
    | 'pickups'
    | 'price_list_schedulers'
    | 'price_lists'
    | 'price_tiers'
    | 'prices'
    | 'promotion_rules'
    | 'promotions'
    | 'reserved_stocks'
    | 'resource_errors'
    | 'return_line_items'
    | 'returns'
    | 'satispay_payments'
    | 'shipments'
    | 'shipping_categories'
    | 'shipping_method_tiers'
    | 'shipping_methods'
    | 'shipping_zones'
    | 'sku_list_items'
    | 'sku_lists'
    | 'sku_options'
    | 'skus'
    | 'stock_items'
    | 'stock_line_items'
    | 'stock_locations'
    | 'stock_reservations'
    | 'stock_transfers'
    | 'stores'
    | 'stripe_payments'
    | 'subscription_models'
    | 'tags'
    | 'tax_calculators'
    | 'tax_categories'
    | 'tax_rules'
    | 'transactions'
    | 'webhooks'
    | 'wire_transfers'
    | null
  /**
   * The ID of the affected resource.
   * @example ```"PzdJhdLdYV"```
   */
  resource_id?: string | null
  /**
   * The type of change. One of 'create', 'update', 'destroy', 'anonymization_request', 'anonymization_started', 'anonymization_completed', 'anonymization_failed', or 'anonymization_cancel'.
   * @example ```"update"```
   */
  event?:
    | 'create'
    | 'update'
    | 'destroy'
    | 'anonymization_request'
    | 'anonymization_started'
    | 'anonymization_completed'
    | 'anonymization_failed'
    | 'anonymization_cancel'
    | null
  /**
   * The object changes payload.
   * @example ```{"status":["draft","placed"]}```
   */
  payload?: Record<string, any> | null
  /**
   * Information about who triggered the change.
   * @example ```{"application":{"id":"DNOPYiZYpn","kind":"sales_channel","public":true},"owner":{"id":"yQQrBhLBmQ","type":"Customer"}}```
   */
  who?: Record<string, any> | null
}

class EventStores extends ApiResource<EventStore> {
  static readonly TYPE: EventStoreType = 'event_stores' as const

  isEventStore(resource: any): resource is EventStore {
    return resource.type && resource.type === EventStores.TYPE
  }

  relationship(id: string | ResourceId | null): EventStoreRel {
    return super.relationshipOneToOne<EventStoreRel>(id)
  }

  relationshipToMany(...ids: string[]): EventStoreRel[] {
    return super.relationshipOneToMany<EventStoreRel>(...ids)
  }

  type(): EventStoreType {
    return EventStores.TYPE
  }
}

const instance = new EventStores()
export default instance

export type { EventStore, EventStores, EventStoreType }
