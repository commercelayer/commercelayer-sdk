import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'



type VersionRel = ResourceRel & { type: typeof Versions.TYPE }


interface Version extends Resource {
	
	resource_type?: string
	resource_id?: string
	event?: string
	changes?: object
	who?: object
	
}


class Versions extends ApiResource {

	static readonly TYPE: 'versions' = 'versions' as const
	// static readonly PATH = 'versions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		return this.resources.list<Version>({ type: Versions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Version> {
		return this.resources.retrieve<Version>({ type: Versions.TYPE, id }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isVersion(resource: any): resource is Version {
		return resource.type && (resource.type === Versions.TYPE)
	}


	relationship(id: string | ResourceId | null): VersionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Versions.TYPE } : { id: id.id, type: Versions.TYPE }
	}


	type(): string {
		return Versions.TYPE
	}

}


export default Versions

export { Version }
