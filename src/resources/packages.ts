import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { StockLocation, StockLocationType } from './stock_locations'
import type { Parcel } from './parcels'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type PackageType = 'packages'
type PackageRel = ResourceRel & { type: PackageType }
type StockLocationRel = ResourceRel & { type: StockLocationType }


export type PackageSort = Pick<Package, 'id' | 'name' | 'code' | 'length' | 'width' | 'height' | 'unit_of_length'> & ResourceSort
// export type PackageFilter = Pick<Package, 'id' | 'name' | 'code' | 'length' | 'width' | 'height' | 'unit_of_length'> & ResourceFilter


interface Package extends Resource {
	
	readonly type: PackageType

	/** 
	 * Unique name for the package.
	 * @example ```"Large (60x40x30)"```
	 */
	name: string
	/** 
	 * The package identifying code.
	 * @example ```"YYYY 2000"```
	 */
	code?: string | null
	/** 
	 * The package length, used to automatically calculate the tax rates from the available carrier accounts.
	 * @example ```40```
	 */
	length: number
	/** 
	 * The package width, used to automatically calculate the tax rates from the available carrier accounts.
	 * @example ```40```
	 */
	width: number
	/** 
	 * The package height, used to automatically calculate the tax rates from the available carrier accounts.
	 * @example ```25```
	 */
	height: number
	/** 
	 * The unit of length. Can be one of 'cm', or 'in'.
	 * @example ```"gr"```
	 */
	unit_of_length: string

	stock_location?: StockLocation | null
	parcels?: Parcel[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface PackageCreate extends ResourceCreate {
	
	/** 
	 * Unique name for the package.
	 * @example ```"Large (60x40x30)"```
	 */
	name: string
	/** 
	 * The package identifying code.
	 * @example ```"YYYY 2000"```
	 */
	code?: string | null
	/** 
	 * The package length, used to automatically calculate the tax rates from the available carrier accounts.
	 * @example ```40```
	 */
	length: number
	/** 
	 * The package width, used to automatically calculate the tax rates from the available carrier accounts.
	 * @example ```40```
	 */
	width: number
	/** 
	 * The package height, used to automatically calculate the tax rates from the available carrier accounts.
	 * @example ```25```
	 */
	height: number
	/** 
	 * The unit of length. Can be one of 'cm', or 'in'.
	 * @example ```"gr"```
	 */
	unit_of_length: string

	stock_location: StockLocationRel

}


interface PackageUpdate extends ResourceUpdate {
	
	/** 
	 * Unique name for the package.
	 * @example ```"Large (60x40x30)"```
	 */
	name?: string | null
	/** 
	 * The package identifying code.
	 * @example ```"YYYY 2000"```
	 */
	code?: string | null
	/** 
	 * The package length, used to automatically calculate the tax rates from the available carrier accounts.
	 * @example ```40```
	 */
	length?: number | null
	/** 
	 * The package width, used to automatically calculate the tax rates from the available carrier accounts.
	 * @example ```40```
	 */
	width?: number | null
	/** 
	 * The package height, used to automatically calculate the tax rates from the available carrier accounts.
	 * @example ```25```
	 */
	height?: number | null
	/** 
	 * The unit of length. Can be one of 'cm', or 'in'.
	 * @example ```"gr"```
	 */
	unit_of_length?: string | null

	stock_location?: StockLocationRel | null

}


class Packages extends ApiResource<Package> {

	static readonly TYPE: PackageType = 'packages' as const

	async create(resource: PackageCreate, params?: QueryParamsRetrieve<Package>, options?: ResourcesConfig): Promise<Package> {
		return this.resources.create<PackageCreate, Package>({ ...resource, type: Packages.TYPE }, params, options)
	}

	async update(resource: PackageUpdate, params?: QueryParamsRetrieve<Package>, options?: ResourcesConfig): Promise<Package> {
		return this.resources.update<PackageUpdate, Package>({ ...resource, type: Packages.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Packages.TYPE } : id, options)
	}

	async stock_location(packageId: string | Package, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _packageId = (packageId as Package).id || packageId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `packages/${_packageId}/stock_location`, params, options) as unknown as StockLocation
	}

	async parcels(packageId: string | Package, params?: QueryParamsList<Parcel>, options?: ResourcesConfig): Promise<ListResponse<Parcel>> {
		const _packageId = (packageId as Package).id || packageId as string
		return this.resources.fetch<Parcel>({ type: 'parcels' }, `packages/${_packageId}/parcels`, params, options) as unknown as ListResponse<Parcel>
	}

	async attachments(packageId: string | Package, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _packageId = (packageId as Package).id || packageId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `packages/${_packageId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(packageId: string | Package, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _packageId = (packageId as Package).id || packageId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `packages/${_packageId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isPackage(resource: any): resource is Package {
		return resource.type && (resource.type === Packages.TYPE)
	}


	relationship(id: string | ResourceId | null): PackageRel {
		return super.relationshipOneToOne<PackageRel>(id)
	}

	relationshipToMany(...ids: string[]): PackageRel[] {
		return super.relationshipOneToMany<PackageRel>(...ids)
	}


	type(): PackageType {
		return Packages.TYPE
	}

}


const instance = new Packages()
export default instance

export type { Packages, Package, PackageCreate, PackageUpdate, PackageType }
