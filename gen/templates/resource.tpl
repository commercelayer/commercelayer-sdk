import { ##__RESOURCE_MODEL_TYPE__## } from '../resource'
import type { ##__IMPORT_RESOURCE_INTERFACES__##, ##__IMPORT_RESOURCE_COMMON__##, ResourceRel##__RESPONSE_MODELS__##, ResourceSort, /* ResourceFilter */ } from '../resource'
##__IMPORT_QUERY_MODELS__##

##__IMPORT_RESOURCE_MODELS__##

type ##__MODEL_RESOURCE_INTERFACE__##Type = '##__RESOURCE_TYPE__##'
type ##__MODEL_RESOURCE_INTERFACE__##Rel = ResourceRel & { type: ##__MODEL_RESOURCE_INTERFACE__##Type }
##__RELATIONSHIP_TYPES__##

export type ##__MODEL_RESOURCE_INTERFACE__##Sort = Pick<##__MODEL_RESOURCE_INTERFACE__##, ##__MODEL_SORTABLE_FIELDS__##> & ResourceSort
// export type ##__MODEL_RESOURCE_INTERFACE__##Filter = Pick<##__MODEL_RESOURCE_INTERFACE__##, ##__MODEL_FILTERABLE_FIELDS__##> & ResourceFilter


##__MODEL_INTERFACES__##


class ##__RESOURCE_CLASS__## extends ##__RESOURCE_MODEL_TYPE__##<##__MODEL_RESOURCE_INTERFACE__##> {

	static readonly TYPE: ##__MODEL_RESOURCE_INTERFACE__##Type = '##__RESOURCE_TYPE__##' as const

	##__RESOURCE_OPERATIONS__##


	is##__MODEL_RESOURCE_INTERFACE__##(resource: any): resource is ##__MODEL_RESOURCE_INTERFACE__## {
		return resource.type && (resource.type === ##__RESOURCE_CLASS__##.TYPE)
	}


	relationship(id: string | ResourceId | null): ##__MODEL_RESOURCE_INTERFACE__##Rel {
		return super.relationshipOneToOne<##__MODEL_RESOURCE_INTERFACE__##Rel>(id)
	}

	relationshipToMany(...ids: string[]): ##__MODEL_RESOURCE_INTERFACE__##Rel[] {
		return super.relationshipOneToMany<##__MODEL_RESOURCE_INTERFACE__##Rel>(...ids)
	}


	type(): ##__MODEL_RESOURCE_INTERFACE__##Type {
		return ##__RESOURCE_CLASS__##.TYPE
	}
##__SINGLETON_PATH_OVERRIDE__##
}


export default ##__RESOURCE_CLASS__##

export type { ##__EXPORT_RESOURCE_TYPES__##, ##__MODEL_RESOURCE_INTERFACE__##Type }
