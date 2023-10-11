import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { StockLocation, StockLocationType } from './stock_locations'
import type { Parcel } from './parcels'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type PackageType = 'packages'
type PackageRel = ResourceRel & { type: PackageType }
type StockLocationRel = ResourceRel & { type: StockLocationType }


interface Package extends Resource {
	
	readonly type: PackageType

	name: string
	code?: string | null
	length: number
	width: number
	height: number
	unit_of_length: string

	stock_location?: StockLocation | null
	parcels?: Parcel[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface PackageCreate extends ResourceCreate {
	
	name: string
	code?: string | null
	length: number
	width: number
	height: number
	unit_of_length: string

	stock_location: StockLocationRel

}


interface PackageUpdate extends ResourceUpdate {
	
	name?: string | null
	code?: string | null
	length?: number | null
	width?: number | null
	height?: number | null
	unit_of_length?: string | null

	stock_location?: StockLocationRel | null

}


class Packages extends ApiResource<Package> {

	static readonly TYPE: PackageType = 'packages' as const

	async create(resource: PackageCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Package> {
		return this.resources.create<PackageCreate, Package>({ ...resource, type: Packages.TYPE }, params, options)
	}

	async update(resource: PackageUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Package> {
		return this.resources.update<PackageUpdate, Package>({ ...resource, type: Packages.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Packages.TYPE } : id, options)
	}

	async stock_location(packageId: string | Package, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _packageId = (packageId as Package).id || packageId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `packages/${_packageId}/stock_location`, params, options) as unknown as StockLocation
	}

	async parcels(packageId: string | Package, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Parcel>> {
		const _packageId = (packageId as Package).id || packageId as string
		return this.resources.fetch<Parcel>({ type: 'parcels' }, `packages/${_packageId}/parcels`, params, options) as unknown as ListResponse<Parcel>
	}

	async attachments(packageId: string | Package, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _packageId = (packageId as Package).id || packageId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `packages/${_packageId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(packageId: string | Package, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _packageId = (packageId as Package).id || packageId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `packages/${_packageId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isPackage(resource: any): resource is Package {
		return resource.type && (resource.type === Packages.TYPE)
	}


	relationship(id: string | ResourceId | null): PackageRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Packages.TYPE } : { id: id.id, type: Packages.TYPE }
	}


	type(): PackageType {
		return Packages.TYPE
	}

}


export default Packages

export type { Package, PackageCreate, PackageUpdate, PackageType }
