import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { StockLocation } from './stock_locations'
import type { Parcel } from './parcels'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type PackageRel = ResourceRel & { type: typeof Packages.TYPE }
type StockLocationRel = ResourceRel & { type: 'stock_locations' }


interface Package extends Resource {
	
	name?: string
	code?: string
	length?: number
	width?: number
	height?: number
	unit_of_length?: string

	stock_location?: StockLocation
	parcels?: Parcel[]
	attachments?: Attachment[]
	versions?: Version[]

}


interface PackageCreate extends ResourceCreate {
	
	name: string
	code?: string
	length: number
	width: number
	height: number
	unit_of_length: string

	stock_location: StockLocationRel

}


interface PackageUpdate extends ResourceUpdate {
	
	name?: string
	code?: string
	length?: number
	width?: number
	height?: number
	unit_of_length?: string

	stock_location?: StockLocationRel

}


class Packages extends ApiResource {

	static readonly TYPE: 'packages' = 'packages' as const
	// static readonly PATH = 'packages'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Package>> {
		return this.resources.list<Package>({ type: Packages.TYPE }, params, options)
	}

	async create(resource: PackageCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Package> {
		return this.resources.create<PackageCreate, Package>({ ...resource, type: Packages.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Package> {
		return this.resources.retrieve<Package>({ type: Packages.TYPE, id }, params, options)
	}

	async update(resource: PackageUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Package> {
		return this.resources.update<PackageUpdate, Package>({ ...resource, type: Packages.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Packages.TYPE, id }, options)
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPackage(resource: any): resource is Package {
		return resource.type && (resource.type === Packages.TYPE)
	}


	relationship(id: string | ResourceId | null): PackageRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Packages.TYPE } : { id: id.id, type: Packages.TYPE }
	}


	type(): string {
		return Packages.TYPE
	}

}


export default Packages

export { Package, PackageCreate, PackageUpdate }
