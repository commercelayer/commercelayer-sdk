import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel } from '../resource'
import { QueryParamsRetrieve } from '../query'



type ApplicationRel = ResourceRel & { type: typeof Applications.TYPE }


interface Application extends Resource {
	
	name?: string
	kind?: string
	public_access?: string
	redirect_uri?: string
	scopes?: string
	
}


class Applications extends ApiResource {

	static readonly TYPE: 'application' = 'application'
	// static readonly PATH = 'application'

	async retrieve(params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Application> {
		return this.resources.singleton<Application>({ type: Applications.TYPE }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isApplication(resource: any): resource is Application {
		return resource.type && (resource.type === Applications.TYPE)
	}


	relationship(id: string | ResourceId | null): ApplicationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Applications.TYPE } : { id: id.id, type: Applications.TYPE }
	}


	type(): string {
		return Applications.TYPE
	}

}


export default Applications

export { Application }
