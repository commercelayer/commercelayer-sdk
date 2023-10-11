/* eslint-disable no-console */
import commercelayer, { Shipment } from '../lib/cjs'
import { inspect } from 'util'
// import commercelayer from '../src'
import getToken from './token'


(async () => {

	const organization = process.env.CL_SDK_ORGANIZATION || ''
	const auth = await getToken('integration')
	const accessToken = auth ? auth.accessToken : ''

	const cl = commercelayer({
		organization,
		accessToken,
		timeout: 5000,
	})

	try {

		const payload = `
		{
			"data": {
				"id": "PzgnCjlEvL",
				"meta": {
					"mode": "live",
					"organization_id": "ORKmVFlwaX"
				},
				"type": "shipments",
				"links": {
					"self": "/api/shipments/PzgnCjlEvL"
				},
				"attributes": {
					"rates": [],
					"number": "48030369/S/001",
					"status": "shipped",
					"metadata": {},
					"reference": null,
					"created_at": "2023-10-01T05:53:29.296Z",
					"on_hold_at": null,
					"packing_at": "2023-10-10T08:51:57.583Z",
					"picking_at": "2023-10-10T08:51:45.784Z",
					"shipped_at": "2023-10-10T08:52:13.251Z",
					"skus_count": 1,
					"updated_at": "2023-10-10T08:52:13.251Z",
					"currency_code": "JPY",
					"get_rates_errors": [],
					"ready_to_ship_at": "2023-10-10T08:52:11.533Z",
					"reference_origin": null,
					"selected_rate_id": null,
					"cost_amount_cents": 0,
					"cost_amount_float": 0,
					"purchase_failed_at": null,
					"purchase_error_code": null,
					"purchase_started_at": null,
					"get_rates_started_at": null,
					"formatted_cost_amount": "$0.00",
					"purchase_completed_at": null,
					"get_rates_completed_at": null,
					"purchase_error_message": null
				},
				"relationships": {
					"order": {
						"data": {
							"id": "QgYhvvEXLW",
							"type": "orders"
						},
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/order",
							"related": "/api/shipments/PzgnCjlEvL/order"
						}
					},
					"events": {
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/events",
							"related": "/api/shipments/PzgnCjlEvL/events"
						}
					},
					"parcels": {
						"data": [
							{
								"id": "qvaDfjVDpd",
								"type": "parcels"
							}
						],
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/parcels",
							"related": "/api/shipments/PzgnCjlEvL/parcels"
						}
					},
					"versions": {
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/versions",
							"related": "/api/shipments/PzgnCjlEvL/versions"
						}
					},
					"attachments": {
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/attachments",
							"related": "/api/shipments/PzgnCjlEvL/attachments"
						}
					},
					"origin_address": {
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/origin_address",
							"related": "/api/shipments/PzgnCjlEvL/origin_address"
						}
					},
					"stock_location": {
						"data": {
							"id": "gkWomumdOk",
							"type": "stock_locations"
						},
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/stock_location",
							"related": "/api/shipments/PzgnCjlEvL/stock_location"
						}
					},
					"shipping_method": {
						"data": {
							"id": "mOARXFjMLN",
							"type": "shipping_methods"
						},
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/shipping_method",
							"related": "/api/shipments/PzgnCjlEvL/shipping_method"
						}
					},
					"stock_transfers": {
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/stock_transfers",
							"related": "/api/shipments/PzgnCjlEvL/stock_transfers"
						}
					},
					"carrier_accounts": {
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/carrier_accounts",
							"related": "/api/shipments/PzgnCjlEvL/carrier_accounts"
						}
					},
					"shipping_address": {
						"data": {
							"id": "bGJquvpJqw",
							"type": "addresses"
						},
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/shipping_address",
							"related": "/api/shipments/PzgnCjlEvL/shipping_address"
						}
					},
					"stock_line_items": {
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/stock_line_items",
							"related": "/api/shipments/PzgnCjlEvL/stock_line_items"
						}
					},
					"shipping_category": {
						"data": {
							"id": "EWblJFmYDN",
							"type": "shipping_categories"
						},
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/shipping_category",
							"related": "/api/shipments/PzgnCjlEvL/shipping_category"
						}
					},
					"delivery_lead_time": {
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/delivery_lead_time",
							"related": "/api/shipments/PzgnCjlEvL/delivery_lead_time"
						}
					},
					"shipment_line_items": {
						"data": [
							{
								"id": "wzqJurljQj",
								"type": "shipment_line_items"
							}
						],
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/shipment_line_items",
							"related": "/api/shipments/PzgnCjlEvL/shipment_line_items"
						}
					},
					"available_shipping_methods": {
						"links": {
							"self": "/api/shipments/PzgnCjlEvL/relationships/available_shipping_methods",
							"related": "/api/shipments/PzgnCjlEvL/available_shipping_methods"
						}
					}
				}
			},
			"included": [
				{
					"id": "QgYhvvEXLW",
					"meta": {
						"mode": "live",
						"organization_id": "ORKmVFlwaX"
					},
					"type": "orders",
					"links": {
						"self": "/api/orders/QgYhvvEXLW"
					},
					"attributes": {
						"guest": true,
						"token": "8c99072e1502d101853d72cff3f9b29b",
						"number": 48030369,
						"status": "approved",
						"cart_url": null,
						"editable": false,
						"metadata": {
							"ctf_store_id": "",
							"click_and_collect": false,
							"market_switch_checked": "",
							"stock_location_reference": ""
						},
						"tax_rate": null,
						"placed_at": "2023-10-01T05:58:02.787Z",
						"reference": null,
						"terms_url": null,
						"created_at": "2023-10-01T05:20:53.384Z",
						"expires_at": null,
						"return_url": null,
						"skus_count": 1,
						"updated_at": "2023-10-10T08:52:13.278Z",
						"approved_at": "2023-10-02T01:30:43.422Z",
						"archived_at": null,
						"autorefresh": true,
						"coupon_code": null,
						"privacy_url": null,
						"cancelled_at": null,
						"checkout_url": "https://checkout.brioni.com/QgYhvvEXLW",
						"country_code": "JP",
						"refreshed_at": null,
						"tax_included": true,
						"currency_code": "JPY",
						"language_code": "ja",
						"customer_email": "piano.hanahana46@gmail.com",
						"gift_card_code": null,
						"payment_status": "paid",
						"freight_taxable": null,
						"shipments_count": 1,
						"reference_origin": null,
						"duty_amount_cents": null,
						"duty_amount_float": null,
						"fees_amount_cents": 0,
						"fees_amount_float": 0,
						"gift_card_taxable": null,
						"validations_count": 0,
						"adjustment_taxable": null,
						"fulfillment_status": "fulfilled",
						"payment_updated_at": "2023-10-10T08:51:45.729Z",
						"total_amount_cents": 34100,
						"total_amount_float": 34100,
						"discount_amount_cents": 0,
						"discount_amount_float": 0,
						"formatted_duty_amount": null,
						"formatted_fees_amount": "¥0",
						"requires_billing_info": false,
						"shipping_amount_cents": 0,
						"shipping_amount_float": 0,
						"subtotal_amount_cents": 34100,
						"subtotal_amount_float": 34100,
						"formatted_total_amount": "¥34,100",
						"fulfillment_updated_at": "2023-10-10T08:52:13.263Z",
						"gift_card_amount_cents": 0,
						"gift_card_amount_float": 0,
						"payment_method_taxable": null,
						"payment_source_details": {},
						"tax_calculations_count": 0,
						"total_tax_amount_cents": 0,
						"total_tax_amount_float": 0,
						"adjustment_amount_cents": 0,
						"adjustment_amount_float": 0,
						"line_item_options_count": 0,
						"subscription_created_at": null,
						"gift_card_or_coupon_code": null,
						"place_total_amount_cents": 34100,
						"place_total_amount_float": 34100,
						"formatted_discount_amount": "¥0",
						"formatted_shipping_amount": "¥0",
						"formatted_subtotal_amount": "¥34,100",
						"shipping_tax_amount_cents": 0,
						"shipping_tax_amount_float": 0,
						"subtotal_tax_amount_cents": 0,
						"subtotal_tax_amount_float": 0,
						"formatted_gift_card_amount": "¥0",
						"formatted_total_tax_amount": "¥0",
						"shipping_country_code_lock": "JP",
						"total_taxable_amount_cents": 34100,
						"total_taxable_amount_float": 34100,
						"adjustment_tax_amount_cents": 0,
						"adjustment_tax_amount_float": 0,
						"formatted_adjustment_amount": "¥0",
						"payment_method_amount_cents": 0,
						"payment_method_amount_float": 0,
						"formatted_place_total_amount": "¥34,100",
						"formatted_shipping_tax_amount": "¥0",
						"formatted_subtotal_tax_amount": "¥0",
						"shipping_taxable_amount_cents": 0,
						"shipping_taxable_amount_float": 0,
						"subtotal_taxable_amount_cents": 34100,
						"subtotal_taxable_amount_float": 34100,
						"total_amount_with_taxes_cents": 34100,
						"total_amount_with_taxes_float": 34100,
						"formatted_total_taxable_amount": "¥34,100",
						"adjustment_taxable_amount_cents": 0,
						"adjustment_taxable_amount_float": 0,
						"formatted_adjustment_tax_amount": "¥0",
						"formatted_payment_method_amount": "¥0",
						"payment_method_tax_amount_cents": 0,
						"payment_method_tax_amount_float": 0,
						"formatted_shipping_taxable_amount": "¥0",
						"formatted_subtotal_taxable_amount": "¥34,100",
						"formatted_total_amount_with_taxes": "¥34,100",
						"formatted_adjustment_taxable_amount": "¥0",
						"formatted_payment_method_tax_amount": "¥0",
						"payment_method_taxable_amount_cents": 0,
						"payment_method_taxable_amount_float": 0,
						"formatted_payment_method_taxable_amount": "¥0"
					},
					"relationships": {
						"tags": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/tags",
								"related": "/api/orders/QgYhvvEXLW/tags"
							}
						},
						"voids": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/voids",
								"related": "/api/orders/QgYhvvEXLW/voids"
							}
						},
						"events": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/events",
								"related": "/api/orders/QgYhvvEXLW/events"
							}
						},
						"market": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/market",
								"related": "/api/orders/QgYhvvEXLW/market"
							}
						},
						"refunds": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/refunds",
								"related": "/api/orders/QgYhvvEXLW/refunds"
							}
						},
						"returns": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/returns",
								"related": "/api/orders/QgYhvvEXLW/returns"
							}
						},
						"captures": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/captures",
								"related": "/api/orders/QgYhvvEXLW/captures"
							}
						},
						"customer": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/customer",
								"related": "/api/orders/QgYhvvEXLW/customer"
							}
						},
						"versions": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/versions",
								"related": "/api/orders/QgYhvvEXLW/versions"
							}
						},
						"shipments": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/shipments",
								"related": "/api/orders/QgYhvvEXLW/shipments"
							}
						},
						"line_items": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/line_items",
								"related": "/api/orders/QgYhvvEXLW/line_items"
							}
						},
						"attachments": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/attachments",
								"related": "/api/orders/QgYhvvEXLW/attachments"
							}
						},
						"order_copies": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/order_copies",
								"related": "/api/orders/QgYhvvEXLW/order_copies"
							}
						},
						"transactions": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/transactions",
								"related": "/api/orders/QgYhvvEXLW/transactions"
							}
						},
						"authorizations": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/authorizations",
								"related": "/api/orders/QgYhvvEXLW/authorizations"
							}
						},
						"payment_method": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/payment_method",
								"related": "/api/orders/QgYhvvEXLW/payment_method"
							}
						},
						"payment_source": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/payment_source",
								"related": "/api/orders/QgYhvvEXLW/payment_source"
							}
						},
						"billing_address": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/billing_address",
								"related": "/api/orders/QgYhvvEXLW/billing_address"
							}
						},
						"order_factories": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/order_factories",
								"related": "/api/orders/QgYhvvEXLW/order_factories"
							}
						},
						"payment_options": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/payment_options",
								"related": "/api/orders/QgYhvvEXLW/payment_options"
							}
						},
						"stock_transfers": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/stock_transfers",
								"related": "/api/orders/QgYhvvEXLW/stock_transfers"
							}
						},
						"shipping_address": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/shipping_address",
								"related": "/api/orders/QgYhvvEXLW/shipping_address"
							}
						},
						"stock_line_items": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/stock_line_items",
								"related": "/api/orders/QgYhvvEXLW/stock_line_items"
							}
						},
						"line_item_options": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/line_item_options",
								"related": "/api/orders/QgYhvvEXLW/line_item_options"
							}
						},
						"stock_reservations": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/stock_reservations",
								"related": "/api/orders/QgYhvvEXLW/stock_reservations"
							}
						},
						"available_free_skus": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/available_free_skus",
								"related": "/api/orders/QgYhvvEXLW/available_free_skus"
							}
						},
						"order_subscriptions": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/order_subscriptions",
								"related": "/api/orders/QgYhvvEXLW/order_subscriptions"
							}
						},
						"available_free_bundles": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/available_free_bundles",
								"related": "/api/orders/QgYhvvEXLW/available_free_bundles"
							}
						},
						"recurring_order_copies": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/recurring_order_copies",
								"related": "/api/orders/QgYhvvEXLW/recurring_order_copies"
							}
						},
						"available_payment_methods": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/available_payment_methods",
								"related": "/api/orders/QgYhvvEXLW/available_payment_methods"
							}
						},
						"available_customer_payment_sources": {
							"links": {
								"self": "/api/orders/QgYhvvEXLW/relationships/available_customer_payment_sources",
								"related": "/api/orders/QgYhvvEXLW/available_customer_payment_sources"
							}
						}
					}
				},
				{
					"id": "EWblJFmYDN",
					"meta": {
						"mode": "live",
						"organization_id": "ORKmVFlwaX"
					},
					"type": "shipping_categories",
					"links": {
						"self": "/api/shipping_categories/EWblJFmYDN"
					},
					"attributes": {
						"name": "Standard",
						"metadata": {},
						"reference": "",
						"created_at": "2021-02-17T16:11:21.326Z",
						"updated_at": "2022-09-22T08:35:19.919Z",
						"reference_origin": ""
					},
					"relationships": {
						"skus": {
							"links": {
								"self": "/api/shipping_categories/EWblJFmYDN/relationships/skus",
								"related": "/api/shipping_categories/EWblJFmYDN/skus"
							}
						},
						"versions": {
							"links": {
								"self": "/api/shipping_categories/EWblJFmYDN/relationships/versions",
								"related": "/api/shipping_categories/EWblJFmYDN/versions"
							}
						},
						"attachments": {
							"links": {
								"self": "/api/shipping_categories/EWblJFmYDN/relationships/attachments",
								"related": "/api/shipping_categories/EWblJFmYDN/attachments"
							}
						}
					}
				},
				{
					"id": "gkWomumdOk",
					"meta": {
						"mode": "live",
						"organization_id": "ORKmVFlwaX"
					},
					"type": "stock_locations",
					"links": {
						"self": "/api/stock_locations/gkWomumdOk"
					},
					"attributes": {
						"name": "Brioni Tokyo Ginza",
						"number": 4285,
						"metadata": {},
						"reference": "15201",
						"created_at": "2021-02-17T16:10:38.051Z",
						"updated_at": "2021-03-26T15:04:25.013Z",
						"label_format": "PDF",
						"suppress_etd": "0",
						"reference_origin": "SIEBEL"
					},
					"relationships": {
						"address": {
							"links": {
								"self": "/api/stock_locations/gkWomumdOk/relationships/address",
								"related": "/api/stock_locations/gkWomumdOk/address"
							}
						},
						"versions": {
							"links": {
								"self": "/api/stock_locations/gkWomumdOk/relationships/versions",
								"related": "/api/stock_locations/gkWomumdOk/versions"
							}
						},
						"attachments": {
							"links": {
								"self": "/api/stock_locations/gkWomumdOk/relationships/attachments",
								"related": "/api/stock_locations/gkWomumdOk/attachments"
							}
						},
						"stock_items": {
							"links": {
								"self": "/api/stock_locations/gkWomumdOk/relationships/stock_items",
								"related": "/api/stock_locations/gkWomumdOk/stock_items"
							}
						},
						"stock_transfers": {
							"links": {
								"self": "/api/stock_locations/gkWomumdOk/relationships/stock_transfers",
								"related": "/api/stock_locations/gkWomumdOk/stock_transfers"
							}
						},
						"inventory_stock_locations": {
							"links": {
								"self": "/api/stock_locations/gkWomumdOk/relationships/inventory_stock_locations",
								"related": "/api/stock_locations/gkWomumdOk/inventory_stock_locations"
							}
						},
						"inventory_return_locations": {
							"links": {
								"self": "/api/stock_locations/gkWomumdOk/relationships/inventory_return_locations",
								"related": "/api/stock_locations/gkWomumdOk/inventory_return_locations"
							}
						}
					}
				},
				{
					"id": "bGJquvpJqw",
					"meta": {
						"mode": "live",
						"organization_id": "ORKmVFlwaX"
					},
					"type": "addresses",
					"links": {
						"self": "/api/addresses/bGJquvpJqw"
					},
					"attributes": {
						"lat": null,
						"lng": null,
						"city": "東京",
						"name": "中野 吉男, 大阪府茨木市駅前1丁目3-5-303, 567-0888 東京 大阪府 (JP) +818049834080",
						"email": null,
						"notes": null,
						"phone": "+818049834080",
						"line_1": "大阪府茨木市駅前1丁目3-5-303",
						"line_2": "",
						"company": null,
						"map_url": null,
						"business": false,
						"metadata": {},
						"zip_code": "567-0888",
						"full_name": "中野 吉男",
						"last_name": "吉男",
						"reference": null,
						"created_at": "2023-10-01T05:53:29.250Z",
						"first_name": "中野",
						"state_code": "大阪府",
						"updated_at": "2023-10-01T05:53:29.250Z",
						"is_geocoded": false,
						"billing_info": "",
						"country_code": "JP",
						"full_address": "大阪府茨木市駅前1丁目3-5-303, 567-0888 東京 大阪府 (JP) +818049834080",
						"is_localized": false,
						"provider_name": null,
						"static_map_url": null,
						"reference_origin": null
					},
					"relationships": {
						"tags": {
							"links": {
								"self": "/api/addresses/bGJquvpJqw/relationships/tags",
								"related": "/api/addresses/bGJquvpJqw/tags"
							}
						},
						"events": {
							"links": {
								"self": "/api/addresses/bGJquvpJqw/relationships/events",
								"related": "/api/addresses/bGJquvpJqw/events"
							}
						},
						"geocoder": {
							"links": {
								"self": "/api/addresses/bGJquvpJqw/relationships/geocoder",
								"related": "/api/addresses/bGJquvpJqw/geocoder"
							}
						},
						"versions": {
							"links": {
								"self": "/api/addresses/bGJquvpJqw/relationships/versions",
								"related": "/api/addresses/bGJquvpJqw/versions"
							}
						}
					}
				},
				{
					"id": "mOARXFjMLN",
					"meta": {
						"mode": "live",
						"organization_id": "ORKmVFlwaX"
					},
					"type": "shipping_methods",
					"links": {
						"self": "/api/shipping_methods/mOARXFjMLN"
					},
					"attributes": {
						"name": "Standard",
						"scheme": "flat",
						"metadata": {},
						"reference": "Standard",
						"created_at": "2021-02-22T10:20:41.675Z",
						"max_weight": null,
						"min_weight": null,
						"updated_at": "2023-05-31T08:53:05.420Z",
						"disabled_at": null,
						"use_subtotal": false,
						"currency_code": "JPY",
						"unit_of_weight": "gr",
						"reference_origin": "",
						"price_amount_cents": 0,
						"price_amount_float": 0,
						"external_prices_url": "",
						"formatted_price_amount": "¥0",
						"free_over_amount_cents": null,
						"free_over_amount_float": null,
						"formatted_free_over_amount": null,
						"price_amount_for_shipment_cents": 0,
						"price_amount_for_shipment_float": 0,
						"formatted_price_amount_for_shipment": "¥0"
					},
					"relationships": {
						"market": {
							"links": {
								"self": "/api/shipping_methods/mOARXFjMLN/relationships/market",
								"related": "/api/shipping_methods/mOARXFjMLN/market"
							}
						},
						"versions": {
							"links": {
								"self": "/api/shipping_methods/mOARXFjMLN/relationships/versions",
								"related": "/api/shipping_methods/mOARXFjMLN/versions"
							}
						},
						"attachments": {
							"links": {
								"self": "/api/shipping_methods/mOARXFjMLN/relationships/attachments",
								"related": "/api/shipping_methods/mOARXFjMLN/attachments"
							}
						},
						"shipping_zone": {
							"links": {
								"self": "/api/shipping_methods/mOARXFjMLN/relationships/shipping_zone",
								"related": "/api/shipping_methods/mOARXFjMLN/shipping_zone"
							}
						},
						"stock_location": {
							"links": {
								"self": "/api/shipping_methods/mOARXFjMLN/relationships/stock_location",
								"related": "/api/shipping_methods/mOARXFjMLN/stock_location"
							}
						},
						"shipping_category": {
							"links": {
								"self": "/api/shipping_methods/mOARXFjMLN/relationships/shipping_category",
								"related": "/api/shipping_methods/mOARXFjMLN/shipping_category"
							}
						},
						"shipping_method_tiers": {
							"links": {
								"self": "/api/shipping_methods/mOARXFjMLN/relationships/shipping_method_tiers",
								"related": "/api/shipping_methods/mOARXFjMLN/shipping_method_tiers"
							}
						},
						"shipping_weight_tiers": {
							"links": {
								"self": "/api/shipping_methods/mOARXFjMLN/relationships/shipping_weight_tiers",
								"related": "/api/shipping_methods/mOARXFjMLN/shipping_weight_tiers"
							}
						},
						"delivery_lead_time_for_shipment": {
							"links": {
								"self": "/api/shipping_methods/mOARXFjMLN/relationships/delivery_lead_time_for_shipment",
								"related": "/api/shipping_methods/mOARXFjMLN/delivery_lead_time_for_shipment"
							}
						}
					}
				},
				{
					"id": "wzqJurljQj",
					"meta": {
						"mode": "live",
						"organization_id": "ORKmVFlwaX"
					},
					"type": "shipment_line_items",
					"links": {
						"self": "/api/shipment_line_items/wzqJurljQj"
					},
					"attributes": {
						"metadata": {},
						"quantity": 1,
						"sku_code": "806848799",
						"reference": null,
						"created_at": "2023-10-01T05:53:29.305Z",
						"updated_at": "2023-10-01T05:53:29.305Z",
						"bundle_code": null,
						"reference_origin": null
					},
					"relationships": {
						"sku": {
							"links": {
								"self": "/api/shipment_line_items/wzqJurljQj/relationships/sku",
								"related": "/api/shipment_line_items/wzqJurljQj/sku"
							}
						},
						"shipment": {
							"links": {
								"self": "/api/shipment_line_items/wzqJurljQj/relationships/shipment",
								"related": "/api/shipment_line_items/wzqJurljQj/shipment"
							}
						},
						"versions": {
							"links": {
								"self": "/api/shipment_line_items/wzqJurljQj/relationships/versions",
								"related": "/api/shipment_line_items/wzqJurljQj/versions"
							}
						},
						"line_item": {
							"data": {
								"id": "kXBqtwEKBx",
								"type": "line_items"
							},
							"links": {
								"self": "/api/shipment_line_items/wzqJurljQj/relationships/line_item",
								"related": "/api/shipment_line_items/wzqJurljQj/line_item"
							}
						},
						"stock_item": {
							"links": {
								"self": "/api/shipment_line_items/wzqJurljQj/relationships/stock_item",
								"related": "/api/shipment_line_items/wzqJurljQj/stock_item"
							}
						}
					}
				},
				{
					"id": "kXBqtwEKBx",
					"meta": {
						"mode": "live",
						"organization_id": "ORKmVFlwaX"
					},
					"type": "line_items",
					"links": {
						"self": "/api/line_items/kXBqtwEKBx"
					},
					"attributes": {
						"name": "O61D00PZ4111400_STANDARD_TIE_8X150_PZ411_LEAD_U-806848799",
						"metadata": {
							"url": "/ja/jp/pr/essential-ライトグレー-シルクネクタイ-O61D00PZ4111400?gclsrc=aw.ds&gclid=Cj0KCQjwjt-oBhDKARIsABVRB0yrjCy1HAxaR5cEvaJzPFNkFrlnoxt5SxYXz7p5ZBSqVt5ihTZcnxYaApveEALw_wcB&location=1009524&targetid=pla-325418297924",
							"name": "Essentialライトグレー シルクネクタイ",
							"size": "onesize",
							"type": "Product",
							"color": "グレー",
							"prop65": false,
							"category": "ネクタイ"
						},
						"quantity": 1,
						"sku_code": "806848799",
						"tax_rate": 0,
						"frequency": null,
						"image_url": "https://images.ctfassets.net/w2dr5qwt1rrm/6IqcDfSyVFDaU1Pa8yLgSq/f0e7aaadde190478cadfe92b14760948/O61D00PZ4111400F.jpg",
						"item_type": "skus",
						"reference": null,
						"created_at": "2023-10-01T05:49:57.775Z",
						"updated_at": "2023-10-01T05:49:57.775Z",
						"bundle_code": null,
						"coupon_code": null,
						"currency_code": "JPY",
						"tax_breakdown": {},
						"discount_cents": 0,
						"discount_float": 0,
						"reference_origin": null,
						"tax_amount_cents": 0,
						"tax_amount_float": 0,
						"unit_amount_cents": 34100,
						"unit_amount_float": 34100,
						"discount_breakdown": {},
						"formatted_discount": "¥0",
						"total_amount_cents": 34100,
						"total_amount_float": 34100,
						"formatted_tax_amount": "¥0",
						"options_amount_cents": 0,
						"options_amount_float": 0,
						"formatted_unit_amount": "¥34,100",
						"formatted_total_amount": "¥34,100",
						"formatted_options_amount": "¥0"
					},
					"relationships": {
						"sku": {
							"links": {
								"self": "/api/line_items/kXBqtwEKBx/relationships/sku",
								"related": "/api/line_items/kXBqtwEKBx/sku"
							}
						},
						"item": {
							"links": {
								"self": "/api/line_items/kXBqtwEKBx/relationships/item",
								"related": "/api/line_items/kXBqtwEKBx/item"
							}
						},
						"tags": {
							"links": {
								"self": "/api/line_items/kXBqtwEKBx/relationships/tags",
								"related": "/api/line_items/kXBqtwEKBx/tags"
							}
						},
						"order": {
							"links": {
								"self": "/api/line_items/kXBqtwEKBx/relationships/order",
								"related": "/api/line_items/kXBqtwEKBx/order"
							}
						},
						"bundle": {
							"links": {
								"self": "/api/line_items/kXBqtwEKBx/relationships/bundle",
								"related": "/api/line_items/kXBqtwEKBx/bundle"
							}
						},
						"events": {
							"links": {
								"self": "/api/line_items/kXBqtwEKBx/relationships/events",
								"related": "/api/line_items/kXBqtwEKBx/events"
							}
						},
						"stock_transfers": {
							"links": {
								"self": "/api/line_items/kXBqtwEKBx/relationships/stock_transfers",
								"related": "/api/line_items/kXBqtwEKBx/stock_transfers"
							}
						},
						"stock_line_items": {
							"links": {
								"self": "/api/line_items/kXBqtwEKBx/relationships/stock_line_items",
								"related": "/api/line_items/kXBqtwEKBx/stock_line_items"
							}
						},
						"line_item_options": {
							"links": {
								"self": "/api/line_items/kXBqtwEKBx/relationships/line_item_options",
								"related": "/api/line_items/kXBqtwEKBx/line_item_options"
							}
						},
						"stock_reservations": {
							"links": {
								"self": "/api/line_items/kXBqtwEKBx/relationships/stock_reservations",
								"related": "/api/line_items/kXBqtwEKBx/stock_reservations"
							}
						},
						"shipment_line_items": {
							"links": {
								"self": "/api/line_items/kXBqtwEKBx/relationships/shipment_line_items",
								"related": "/api/line_items/kXBqtwEKBx/shipment_line_items"
							}
						}
					}
				},
				{
					"id": "qvaDfjVDpd",
					"meta": {
						"mode": "live",
						"organization_id": "ORKmVFlwaX"
					},
					"type": "parcels",
					"links": {
						"self": "/api/parcels/qvaDfjVDpd"
					},
					"attributes": {
						"number": "#48030369/S/001/P/001",
						"weight": "100.0",
						"eel_pfc": null,
						"incoterm": "",
						"metadata": {},
						"reference": null,
						"signed_by": null,
						"created_at": "2023-10-10T08:52:06.447Z",
						"updated_at": "2023-10-10T08:52:06.447Z",
						"contents_type": null,
						"customs_signer": null,
						"unit_of_weight": "gr",
						"customs_certify": null,
						"tracking_number": null,
						"tracking_status": null,
						"reference_origin": null,
						"restriction_type": null,
						"tracking_details": {},
						"carrier_weight_oz": null,
						"shipping_label_url": null,
						"non_delivery_option": null,
						"shipping_label_size": null,
						"contents_explanation": null,
						"restriction_comments": null,
						"customs_info_required": false,
						"delivery_confirmation": "",
						"tracking_status_detail": null,
						"shipping_label_file_type": null,
						"shipping_label_resolution": null,
						"tracking_status_updated_at": null
					},
					"relationships": {
						"events": {
							"links": {
								"self": "/api/parcels/qvaDfjVDpd/relationships/events",
								"related": "/api/parcels/qvaDfjVDpd/events"
							}
						},
						"package": {
							"links": {
								"self": "/api/parcels/qvaDfjVDpd/relationships/package",
								"related": "/api/parcels/qvaDfjVDpd/package"
							}
						},
						"shipment": {
							"links": {
								"self": "/api/parcels/qvaDfjVDpd/relationships/shipment",
								"related": "/api/parcels/qvaDfjVDpd/shipment"
							}
						},
						"versions": {
							"links": {
								"self": "/api/parcels/qvaDfjVDpd/relationships/versions",
								"related": "/api/parcels/qvaDfjVDpd/versions"
							}
						},
						"attachments": {
							"links": {
								"self": "/api/parcels/qvaDfjVDpd/relationships/attachments",
								"related": "/api/parcels/qvaDfjVDpd/attachments"
							}
						}
					}
				}
			]
		}
		`

		const shipment = cl.shipments.parse(payload) as Shipment

		console.log(shipment)

	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
