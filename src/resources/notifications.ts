import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { EventStore } from './event_stores'
import type { Order, OrderType } from './orders'
import type { LineItem, LineItemType } from './line_items'
import type { ShippingMethod, ShippingMethodType } from './shipping_methods'


type NotificationType = 'notifications'
type NotificationRel = ResourceRel & { type: NotificationType }
type OrderRel = ResourceRel & { type: OrderType }
type LineItemRel = ResourceRel & { type: LineItemType }
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }


export type NotificationSort = Pick<Notification, 'id' | 'name' | 'flash'> & ResourceSort
// export type NotificationFilter = Pick<Notification, 'id' | 'name' | 'flash'> & ResourceFilter


interface Notification extends Resource {
	
	readonly type: NotificationType

	/** 
	 * The internal name of the notification.
	 * @example ```"DDT transport document"```
	 */
	name: string
	/** 
	 * Indicates if the notification is temporary, valid for the ones created by external services.
	 */
	flash?: boolean | null
	/** 
	 * An internal body of the notification.
	 * @example ```{"sku":"REDHANDBAG","name":"Enjoy your free item"}```
	 */
	body?: Record<string, any> | null

	notifiable?: Order | LineItem | ShippingMethod | null
	event_stores?: EventStore[] | null

}


interface NotificationCreate extends ResourceCreate {
	
	/** 
	 * The internal name of the notification.
	 * @example ```"DDT transport document"```
	 */
	name: string
	/** 
	 * Indicates if the notification is temporary, valid for the ones created by external services.
	 */
	flash?: boolean | null
	/** 
	 * An internal body of the notification.
	 * @example ```{"sku":"REDHANDBAG","name":"Enjoy your free item"}```
	 */
	body?: Record<string, any> | null

	notifiable: OrderRel | LineItemRel | ShippingMethodRel

}


interface NotificationUpdate extends ResourceUpdate {
	
	/** 
	 * The internal name of the notification.
	 * @example ```"DDT transport document"```
	 */
	name?: string | null
	/** 
	 * Indicates if the notification is temporary, valid for the ones created by external services.
	 */
	flash?: boolean | null
	/** 
	 * An internal body of the notification.
	 * @example ```{"sku":"REDHANDBAG","name":"Enjoy your free item"}```
	 */
	body?: Record<string, any> | null

	notifiable?: OrderRel | LineItemRel | ShippingMethodRel | null

}


class Notifications extends ApiResource<Notification> {

	static readonly TYPE: NotificationType = 'notifications' as const

	async create(resource: NotificationCreate, params?: QueryParamsRetrieve<Notification>, options?: ResourcesConfig): Promise<Notification> {
		return this.resources.create<NotificationCreate, Notification>({ ...resource, type: Notifications.TYPE }, params, options)
	}

	async update(resource: NotificationUpdate, params?: QueryParamsRetrieve<Notification>, options?: ResourcesConfig): Promise<Notification> {
		return this.resources.update<NotificationUpdate, Notification>({ ...resource, type: Notifications.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Notifications.TYPE } : id, options)
	}

	async event_stores(notificationId: string | Notification, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _notificationId = (notificationId as Notification).id || notificationId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `notifications/${_notificationId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}


	isNotification(resource: any): resource is Notification {
		return resource.type && (resource.type === Notifications.TYPE)
	}


	relationship(id: string | ResourceId | null): NotificationRel {
		return super.relationshipOneToOne<NotificationRel>(id)
	}

	relationshipToMany(...ids: string[]): NotificationRel[] {
		return super.relationshipOneToMany<NotificationRel>(...ids)
	}


	type(): NotificationType {
		return Notifications.TYPE
	}

}


export default Notifications

export type { Notification, NotificationCreate, NotificationUpdate, NotificationType }
