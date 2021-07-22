
import { ResourceType } from './resource'


type AttachableType = /*'bundles' | */'carrier_accounts' | 'customers' | 'customer_groups' | 'delivery_lead_times' | /*'geocoders' |*/
	'gift_cards' | 'gift_card_recipients' | 'inventory_models' | 'markets' | 'merchants' | 'orders' | 'packages' | 'parcels' |
	'payment_methods' | 'prices' | 'price_lists' | 'promotions' | 'returns' | 'shipments' | 'shipping_categories' |
	'shipping_methods' | 'shipping_zones' | 'skus' | 'sku_options' | 'stock_items' | 'stock_locations' | 'tax_calculators' |
	'tax_categories'


interface Attachable extends ResourceType {
	type: AttachableType
}

interface PaymentSource extends ResourceType {
	type: 'paypal_payments' | 'adyen_payments' | 'stripe_payments'
}


export { Attachable, PaymentSource }