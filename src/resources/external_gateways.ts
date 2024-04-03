import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { ExternalPayment } from './external_payments'


type ExternalGatewayType = 'external_gateways'
type ExternalGatewayRel = ResourceRel & { type: ExternalGatewayType }


export type ExternalGatewaySort = Pick<ExternalGateway, 'id' | 'name' | 'circuit_state' | 'circuit_failure_count'> & ResourceSort
// export type ExternalGatewayFilter = Pick<ExternalGateway, 'id' | 'name' | 'circuit_state' | 'circuit_failure_count'> & ResourceFilter


interface ExternalGateway extends Resource {
	
	readonly type: ExternalGatewayType

	name: string
	authorize_url?: Nullable<string>
	capture_url?: Nullable<string>
	void_url?: Nullable<string>
	refund_url?: Nullable<string>
	token_url?: Nullable<string>
	circuit_state?: Nullable<string>
	circuit_failure_count?: Nullable<number>
	shared_secret: string

	payment_methods?: Nullable<PaymentMethod[]>
	versions?: Nullable<Version[]>
	external_payments?: Nullable<ExternalPayment[]>

}


interface ExternalGatewayCreate extends ResourceCreate {
	
	name: string
	authorize_url?: Nullable<string>
	capture_url?: Nullable<string>
	void_url?: Nullable<string>
	refund_url?: Nullable<string>
	token_url?: Nullable<string>
	
}


interface ExternalGatewayUpdate extends ResourceUpdate {
	
	name?: Nullable<string>
	authorize_url?: Nullable<string>
	capture_url?: Nullable<string>
	void_url?: Nullable<string>
	refund_url?: Nullable<string>
	token_url?: Nullable<string>
	_reset_circuit?: Nullable<boolean>
	
}


class ExternalGateways extends ApiResource<ExternalGateway> {

	static readonly TYPE: ExternalGatewayType = 'external_gateways' as const

	async create(resource: ExternalGatewayCreate, params?: QueryParamsRetrieve<ExternalGateway>, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.create<ExternalGatewayCreate, ExternalGateway>({ ...resource, type: ExternalGateways.TYPE }, params, options)
	}

	async update(resource: ExternalGatewayUpdate, params?: QueryParamsRetrieve<ExternalGateway>, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.update<ExternalGatewayUpdate, ExternalGateway>({ ...resource, type: ExternalGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ExternalGateways.TYPE } : id, options)
	}

	async payment_methods(externalGatewayId: string | ExternalGateway, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _externalGatewayId = (externalGatewayId as ExternalGateway).id || externalGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `external_gateways/${_externalGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(externalGatewayId: string | ExternalGateway, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _externalGatewayId = (externalGatewayId as ExternalGateway).id || externalGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `external_gateways/${_externalGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async external_payments(externalGatewayId: string | ExternalGateway, params?: QueryParamsList<ExternalPayment>, options?: ResourcesConfig): Promise<ListResponse<ExternalPayment>> {
		const _externalGatewayId = (externalGatewayId as ExternalGateway).id || externalGatewayId as string
		return this.resources.fetch<ExternalPayment>({ type: 'external_payments' }, `external_gateways/${_externalGatewayId}/external_payments`, params, options) as unknown as ListResponse<ExternalPayment>
	}

	async _reset_circuit(id: string | ExternalGateway, params?: QueryParamsRetrieve<ExternalGateway>, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.update<ExternalGatewayUpdate, ExternalGateway>({ id: (typeof id === 'string')? id: id.id, type: ExternalGateways.TYPE, _reset_circuit: true }, params, options)
	}


	isExternalGateway(resource: any): resource is ExternalGateway {
		return resource.type && (resource.type === ExternalGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): ExternalGatewayRel {
		return super.relationshipOneToOne<ExternalGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): ExternalGatewayRel[] {
		return super.relationshipOneToMany<ExternalGatewayRel>(...ids)
	}


	type(): ExternalGatewayType {
		return ExternalGateways.TYPE
	}

}


export default ExternalGateways

export type { ExternalGateway, ExternalGatewayCreate, ExternalGatewayUpdate, ExternalGatewayType }
