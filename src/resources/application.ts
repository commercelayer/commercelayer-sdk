import type { Nullable } from '../types'
import { ApiSingleton } from '../resource'
import type { Resource, ResourceId, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'




type ApplicationType = 'application'
type ApplicationRel = ResourceRel & { type: ApplicationType }


export type ApplicationSort = Pick<Application, 'id'> & ResourceSort
// export type ApplicationFilter = Pick<Application, 'id' | 'name' | 'kind' | 'public_access' | 'scopes'> & ResourceFilter


interface Application extends Resource {
	
	readonly type: ApplicationType

	/** 
	 * The application's internal name..
	 * @example ```"My app"```
	 */
	name?: Nullable<string>
	/** 
	 * The application's kind, can be one of: 'sales_channel', 'integration' and 'webapp'..
	 * @example ```"sales-channel"```
	 */
	kind?: Nullable<string>
	/** 
	 * Indicates if the application has public access..
	 * @example ```"true"```
	 */
	public_access?: Nullable<boolean>
	/** 
	 * The application's redirect URI..
	 * @example ```"https://bluebrand.com/img/logo.svg"```
	 */
	redirect_uri?: Nullable<string>
	/** 
	 * The application's scopes..
	 * @example ```"market:all market:9 market:122 market:6 stock_location:6 stock_location:33"```
	 */
	scopes?: Nullable<string>
	
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
