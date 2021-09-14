/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { StockLocation } from './stock_locations'
import { Parcel } from './parcels'
import { Attachment } from './attachments'


type PackageRel = ResourceId & { type: typeof Packages.TYPE }
type StockLocationRel = ResourceId & { type: 'stock_locations' }


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
	
	name?: string
	code?: string
	length?: number
	width?: number
	height?: number
	unit_of_length?: string

	stock_location?: StockLocationRel

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
		return this.resources.list({ type: Packages.TYPE }, params, options)
	}

	async create(resource: PackageCreate, options?: ResourcesConfig): Promise<Package> {
		return this.resources.create(Object.assign(resource, { type: Packages.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Package> {
		return this.resources.retrieve<Package>({ type: Packages.TYPE, id }, params, options)
	}

	async update(resource: PackageUpdate, options?: ResourcesConfig): Promise<Package> {
		return this.resources.update({ ...resource, type: Packages.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Packages.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPackage(resource: any): resource is Package {
		return resource.type && (resource.type === Packages.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Packages.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Packages.TYPE)
	}
	*/

	relationship(id: string | ResourceId): PackageRel {
		return (typeof id === 'string') ? { id, type: Packages.TYPE } : {id: id.id, type: Packages.TYPE }
	}

}


export default Packages

export { Package, PackageCreate, PackageUpdate }
