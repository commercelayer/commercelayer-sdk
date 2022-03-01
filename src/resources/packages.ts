import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { StockLocation } from './stock_locations'
import { Parcel } from './parcels'
import { Attachment } from './attachments'


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

	static readonly TYPE: 'packages' = 'packages'
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

	async stock_location(packageId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `packages/${packageId}/stock_location`, params, options) as unknown as StockLocation
	}

	async parcels(packageId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Parcel>> {
		return this.resources.fetch<Parcel>({ type: 'parcels' }, `packages/${packageId}/parcels`, params, options) as unknown as ListResponse<Parcel>
	}

	async attachments(packageId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `packages/${packageId}/attachments`, params, options) as unknown as ListResponse<Attachment>
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
