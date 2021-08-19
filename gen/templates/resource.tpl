/**
 * ©##__CURRENT_YEAR__## Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema ##__SCHEMA_VERSION__##
 * Generation date: ##__CURRENT_DATE__##
 **/

import { ApiResource, ##__RESOURCE_INTERFACES__##, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */##__QUERY_MODELS__## } from '../query'

##__IMPORT_RESOURCE_MODELS__##

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

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(##__RESOURCE_CLASS__##.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(##__RESOURCE_CLASS__##.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof ##__RESOURCE_CLASS__##.TYPE } {
		return { id, type: ##__RESOURCE_CLASS__##.TYPE }
	}

}


export default ##__RESOURCE_CLASS__##

export { ##__EXPORT_RESOURCE_TYPES__## }
