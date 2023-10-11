import { ApiSingleton } from '../resource'
import type { Resource, ResourceId, ResourceRel } from '../resource'




type ApplicationType = 'application'
type ApplicationRel = ResourceRel & { type: ApplicationType }


interface Application extends Resource {
	
	readonly type: ApplicationType

	name?: string | null
	kind?: string | null
	public_access?: boolean | null
	redirect_uri?: string | null
	scopes?: string | null
	
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


	parse(payload: any): Application | Application[] {
		return super.parse(payload)
	}

}


export default Applications

export type { Application, ApplicationType }
