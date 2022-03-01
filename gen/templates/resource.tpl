import { ApiResource, ##__RESOURCE_INTERFACES__##, ResourcesConfig, ResourceId, ResourceRel##__RESPONSE_MODELS__## } from '../resource'
import type { ##__QUERY_MODELS__## } from '../query'

##__IMPORT_RESOURCE_MODELS__##

type ##__MODEL_RESOURCE_INTERFACE__##Rel = ResourceRel & { type: typeof ##__RESOURCE_CLASS__##.TYPE }
##__RELATIONSHIP_TYPES__##

##__MODEL_INTERFACES__##


class ##__RESOURCE_CLASS__## extends ApiResource {

	static readonly TYPE: '##__RESOURCE_TYPE__##' = '##__RESOURCE_TYPE__##'
	// static readonly PATH = '##__RESOURCE_TYPE__##'

	##__RESOURCE_OPERATIONS__##


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	is##__MODEL_RESOURCE_INTERFACE__##(resource: any): resource is ##__MODEL_RESOURCE_INTERFACE__## {
		return resource.type && (resource.type === ##__RESOURCE_CLASS__##.TYPE)
	}


	relationship(id: string | ResourceId | null): ##__MODEL_RESOURCE_INTERFACE__##Rel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ##__RESOURCE_CLASS__##.TYPE } : { id: id.id, type: ##__RESOURCE_CLASS__##.TYPE }
	}


	type(): string {
		return ##__RESOURCE_CLASS__##.TYPE
	}

}


export default ##__RESOURCE_CLASS__##

export { ##__EXPORT_RESOURCE_TYPES__## }
