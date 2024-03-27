import { ApiSingleton } from '../resource'
import type { Resource, ResourceId, ResourceRel, ResourceSortable, ResourceFilterable } from '../resource'




type ApplicationType = 'application'
type ApplicationRel = ResourceRel & { type: ApplicationType }


export type ApplicationSortable = Pick<Application, 'id'> & ResourceSortable
export type ApplicationFilterable = Pick<Application, 'id' | 'name' | 'kind' | 'public_access' | 'scopes'> & ResourceFilterable


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
		return super.relationshipOneToOne<ApplicationRel>(id)
	}

	relationshipToMany(...ids: string[]): ApplicationRel[] {
		return super.relationshipOneToMany<ApplicationRel>(...ids)
	}


	type(): ApplicationType {
		return Applications.TYPE
	}

}


export default Applications

export type { Application, ApplicationType }

/*
export const ApplicationsClient = (init: ResourceAdapter | ResourcesInitConfig): Applications => {
	return new Applications((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
