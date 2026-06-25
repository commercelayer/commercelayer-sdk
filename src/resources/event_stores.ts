import type { Resource, ResourceId, ResourceRel, ResourceSort /* ResourceFilter */ } from '../resource'
import { ApiResource } from '../resource'

type EventStoreType = 'event_stores'
type EventStoreRel = ResourceRel & { type: EventStoreType }

export type EventStoreSort = Pick<EventStore, 'id'> & ResourceSort
// export type EventStoreFilter = Pick<EventStore, 'id'> & ResourceFilter

interface EventStore extends Resource {
  readonly type: EventStoreType

  /**
   * The type of the affected resource. One of 'applications', 'event_stores', 'organizations', 'addresses', 'geocoders', 'events', 'tags', 'adjustments', 'price_lists', 'payment_gateways', 'payment_methods', 'markets', 'customer_groups', 'line_items', 'discount_engine_items', 'promotions', 'adyen_payments', 'orders', 'transactions', 'order_factories', 'attachments', 'tax_calculators', 'tax_categories', 'skus', 'shipping_categories', 'axerve_payments', 'order_validation_rules', 'braintree_payments', 'bundles', 'sku_lists', 'sku_list_items', 'stock_items', 'stock_locations', 'promotion_rules', 'coupons', 'returns', 'carrier_accounts', 'checkout_com_payments', 'customers', 'customer_addresses', 'customer_payment_sources', 'customer_subscriptions', 'order_subscriptions', 'customer_password_resets', 'delivery_lead_times', 'shipping_methods', 'shipments', 'discount_engines', 'pickups', 'parcels', 'webhooks', 'event_callbacks', 'external_payments', 'gift_cards', 'in_stock_subscriptions', 'inventory_models', 'inventory_stock_locations', 'inventory_return_locations', 'klarna_payments', 'line_item_options', 'return_line_items', 'stock_line_items', 'stock_reservations', 'stock_transfers', 'notifications', 'sku_options', 'links', 'tax_rules', 'merchants', 'subscription_models', 'stores', 'price_list_schedulers', 'order_subscription_items', 'payment_options', 'resource_errors', 'paypal_payments', 'packages', 'parcel_line_items', 'prices', 'price_tiers', 'reserved_stocks', 'satispay_payments', 'shipping_method_tiers', 'shipping_zones', 'stripe_payments', or 'wire_transfers'.
   * @example ```"orders"```
   */
  resource_type?:
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
    | null
  /**
   * The ID of the affected resource.
   * @example ```"PzdJhdLdYV"```
   */
  resource_id?: string | null
  /**
   * The type of change (one of create or update).
   * @example ```"update"```
   */
  event?: string | null
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
