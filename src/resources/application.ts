import { ApiSingleton, Resource, ResourceId, ResourceRel } from '../resource'




type ApplicationType = 'application'
type ApplicationRel = ResourceRel & { type: ApplicationType }


interface Application extends Resource {
	
	readonly type: ApplicationType

	name?: string
	kind?: string
	public_access?: boolean
	redirect_uri?: string
	scopes?: string
	
}


class Applications extends ApiSingleton<Application> {

	static readonly TYPE: ApplicationType = 'application' as const

	


	isApplication(resource: any): resource is Application {
		return resource.type && (resource.type === Applications.TYPE)
	}


	relationship(id: string | ResourceId | null): ApplicationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Applications.TYPE } : { id: id.id, type: Applications.TYPE }
	}


	type(): ApplicationType {
		return Applications.TYPE
	}

}


export default Applications

export type { Application, ApplicationType }
