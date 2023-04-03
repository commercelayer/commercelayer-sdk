import { ##__RESOURCE_MODEL_TYPE__## } from '../resource'
import type { ##__RESOURCE_INTERFACES__##, ##__IMPORT_RESOURCE_COMMON__##, ResourceRel##__RESPONSE_MODELS__## } from '../resource'
##__IMPORT_QUERY_MODELS__##

##__IMPORT_RESOURCE_MODELS__##

type ##__MODEL_RESOURCE_INTERFACE__##Type = '##__RESOURCE_TYPE__##'
type ##__MODEL_RESOURCE_INTERFACE__##Rel = ResourceRel & { type: ##__MODEL_RESOURCE_INTERFACE__##Type }
##__RELATIONSHIP_TYPES__##

##__MODEL_INTERFACES__##


class ##__RESOURCE_CLASS__## extends ##__RESOURCE_MODEL_TYPE__##<##__MODEL_RESOURCE_INTERFACE__##> {

	static readonly TYPE: ##__MODEL_RESOURCE_INTERFACE__##Type = '##__RESOURCE_TYPE__##' as const

	##__RESOURCE_OPERATIONS__##


	is##__MODEL_RESOURCE_INTERFACE__##(resource: any): resource is ##__MODEL_RESOURCE_INTERFACE__## {
		return resource.type && (resource.type === ##__RESOURCE_CLASS__##.TYPE)
	}


	relationship(id: string | ResourceId | null): ##__MODEL_RESOURCE_INTERFACE__##Rel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ##__RESOURCE_CLASS__##.TYPE } : { id: id.id, type: ##__RESOURCE_CLASS__##.TYPE }
	}


	type(): ##__MODEL_RESOURCE_INTERFACE__##Type {
		return ##__RESOURCE_CLASS__##.TYPE
	}

}


export default ##__RESOURCE_CLASS__##

export type { ##__EXPORT_RESOURCE_TYPES__##, ##__MODEL_RESOURCE_INTERFACE__##Type }
