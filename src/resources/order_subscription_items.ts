import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { OrderSubscription, OrderSubscriptionType } from './order_subscriptions'
import type { Adjustment, AdjustmentType } from './adjustments'
import type { Bundle, BundleType } from './bundles'
import type { Sku, SkuType } from './skus'
import type { LineItem } from './line_items'


type OrderSubscriptionItemType = 'order_subscription_items'
type OrderSubscriptionItemRel = ResourceRel & { type: OrderSubscriptionItemType }
type OrderSubscriptionRel = ResourceRel & { type: OrderSubscriptionType }
type AdjustmentRel = ResourceRel & { type: AdjustmentType }
type BundleRel = ResourceRel & { type: BundleType }
type SkuRel = ResourceRel & { type: SkuType }


export type OrderSubscriptionItemSort = Pick<OrderSubscriptionItem, 'id' | 'quantity' | 'unit_amount_cents'> & ResourceSort
// export type OrderSubscriptionItemFilter = Pick<OrderSubscriptionItem, 'id' | 'quantity' | 'unit_amount_cents'> & ResourceFilter


interface OrderSubscriptionItem extends Resource {
	
	readonly type: OrderSubscriptionItemType

	/** 
	 * The code of the associated SKU..
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The code of the associated bundle..
	 * @example ```"BUNDLEMM000000FFFFFFXLXX"```
	 */
	bundle_code?: string | null
	/** 
	 * The subscription item quantity..
	 * @example ```"4"```
	 */
	quantity: number
	/** 
	 * The unit amount of the subscription item, in cents..
	 * @example ```"9900"```
	 */
	unit_amount_cents?: number | null
	/** 
	 * The unit amount of the subscription item, float. This can be useful to track the purchase on thrid party systems, e.g Google Analyitcs Enhanced Ecommerce..
	 * @example ```"99"```
	 */
	unit_amount_float?: number | null
	/** 
	 * The unit amount of the subscription item, formatted. This can be useful to display the amount with currency in you views..
	 * @example ```"€99,00"```
	 */
	formatted_unit_amount?: string | null
	/** 
	 * Calculated as unit amount x quantity amount, in cents..
	 * @example ```"18800"```
	 */
	total_amount_cents?: number | null
	/** 
	 * Calculated as unit amount x quantity amount, float. This can be useful to track the purchase on thrid party systems, e.g Google Analyitcs Enhanced Ecommerce..
	 * @example ```"188"```
	 */
	total_amount_float: number
	/** 
	 * Calculated as unit amount x quantity amount, formatted. This can be useful to display the amount with currency in you views..
	 * @example ```"€188,00"```
	 */
	formatted_total_amount?: string | null

	order_subscription?: OrderSubscription | null
	item?: Adjustment | Bundle | Sku | null
	sku?: Sku | null
	bundle?: Bundle | null
	adjustment?: Adjustment | null
	source_line_item?: LineItem | null

}


interface OrderSubscriptionItemCreate extends ResourceCreate {
	
	/** 
	 * The code of the associated SKU..
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The code of the associated bundle..
	 * @example ```"BUNDLEMM000000FFFFFFXLXX"```
	 */
	bundle_code?: string | null
	/** 
	 * The subscription item quantity..
	 * @example ```"4"```
	 */
	quantity: number
	/** 
	 * The unit amount of the subscription item, in cents..
	 * @example ```"9900"```
	 */
	unit_amount_cents?: number | null

	order_subscription: OrderSubscriptionRel
	item: AdjustmentRel | BundleRel | SkuRel
	sku?: SkuRel | null
	bundle?: BundleRel | null
	adjustment?: AdjustmentRel | null

}


interface OrderSubscriptionItemUpdate extends ResourceUpdate {
	
	/** 
	 * The code of the associated SKU..
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The code of the associated bundle..
	 * @example ```"BUNDLEMM000000FFFFFFXLXX"```
	 */
	bundle_code?: string | null
	/** 
	 * The subscription item quantity..
	 * @example ```"4"```
	 */
	quantity?: number | null
	/** 
	 * The unit amount of the subscription item, in cents..
	 * @example ```"9900"```
	 */
	unit_amount_cents?: number | null
	
}


class OrderSubscriptionItems extends ApiResource<OrderSubscriptionItem> {

	static readonly TYPE: OrderSubscriptionItemType = 'order_subscription_items' as const

	async create(resource: OrderSubscriptionItemCreate, params?: QueryParamsRetrieve<OrderSubscriptionItem>, options?: ResourcesConfig): Promise<OrderSubscriptionItem> {
		return this.resources.create<OrderSubscriptionItemCreate, OrderSubscriptionItem>({ ...resource, type: OrderSubscriptionItems.TYPE }, params, options)
	}

	async update(resource: OrderSubscriptionItemUpdate, params?: QueryParamsRetrieve<OrderSubscriptionItem>, options?: ResourcesConfig): Promise<OrderSubscriptionItem> {
		return this.resources.update<OrderSubscriptionItemUpdate, OrderSubscriptionItem>({ ...resource, type: OrderSubscriptionItems.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: OrderSubscriptionItems.TYPE } : id, options)
	}

	async order_subscription(orderSubscriptionItemId: string | OrderSubscriptionItem, params?: QueryParamsRetrieve<OrderSubscription>, options?: ResourcesConfig): Promise<OrderSubscription> {
		const _orderSubscriptionItemId = (orderSubscriptionItemId as OrderSubscriptionItem).id || orderSubscriptionItemId as string
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `order_subscription_items/${_orderSubscriptionItemId}/order_subscription`, params, options) as unknown as OrderSubscription
	}

	async source_line_item(orderSubscriptionItemId: string | OrderSubscriptionItem, params?: QueryParamsRetrieve<LineItem>, options?: ResourcesConfig): Promise<LineItem> {
		const _orderSubscriptionItemId = (orderSubscriptionItemId as OrderSubscriptionItem).id || orderSubscriptionItemId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `order_subscription_items/${_orderSubscriptionItemId}/source_line_item`, params, options) as unknown as LineItem
	}


	isOrderSubscriptionItem(resource: any): resource is OrderSubscriptionItem {
		return resource.type && (resource.type === OrderSubscriptionItems.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderSubscriptionItemRel {
		return super.relationshipOneToOne<OrderSubscriptionItemRel>(id)
	}

	relationshipToMany(...ids: string[]): OrderSubscriptionItemRel[] {
		return super.relationshipOneToMany<OrderSubscriptionItemRel>(...ids)
	}


	type(): OrderSubscriptionItemType {
		return OrderSubscriptionItems.TYPE
	}

}


export default OrderSubscriptionItems

export type { OrderSubscriptionItem, OrderSubscriptionItemCreate, OrderSubscriptionItemUpdate, OrderSubscriptionItemType }
