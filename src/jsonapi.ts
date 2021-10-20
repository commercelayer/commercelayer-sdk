/* eslint-disable @typescript-eslint/no-explicit-any */
import { Value } from 'json-typescript'
import { DocWithData, Included, ResourceIdentifierObject, ResourceObject, AttributesObject, RelationshipsObject } from 'jsonapi-typescript'
import type { ResourceCreate, ResourceUpdate, ResourceId, ResourceType, Resource } from './resource'
import { isResourceId } from './common'

export type { DocWithData, Value as JSONValue }



// DENORMALIZATION

const denormalize = <R extends Resource>(response: DocWithData): R | R[] => {

	let denormalizedResponse

	if (response.links) delete response.links

	const data = response.data
	const included = response.included

	if (Array.isArray(data)) denormalizedResponse = data.map(res => denormalizeResource<R>(res, included))
	else denormalizedResponse = denormalizeResource<R>(data, included)

	return denormalizedResponse

}


const findIncluded = (rel: ResourceIdentifierObject, included: Included = []): ResourceObject | undefined => {
	return included.find(inc => {
		return (rel.id === inc.id) && (rel.type === inc.type)
	})
}


const denormalizeResource = <T extends ResourceType>(res: any, included?: Included): T => {

	const resource = {
		id: res.id,
		type: res.type,
		...res.attributes,
	}

	if (res.relationships) Object.keys(res.relationships).forEach(key => {
		const rel = res.relationships[key].data
		if (rel) {
			if (Array.isArray(rel)) resource[key] = rel.map(r => denormalizeResource<ResourceType>(findIncluded(r, included), included))
			else resource[key] = denormalizeResource<ResourceType>(findIncluded(rel, included), included)
		} else if (rel === null) resource[key] = null
	})
	

	return resource

}


// NORMALIZATION

const normalize = (resource: (ResourceCreate & ResourceType) | (ResourceUpdate & ResourceId)): ResourceObject => {

	const attributes: AttributesObject = {}
	const relationships: RelationshipsObject = {}

	for (const field in resource) {
		if (['type', 'id'].includes(field)) continue
		const value = resource[field as keyof (ResourceCreate | ResourceUpdate)]
		if (value && (isResourceId(value) || (Array.isArray(value) && isResourceId(value[0])))) {
			relationships[field] = { data: value as ResourceIdentifierObject }
		}
		else attributes[field] = value as Value
	}

	const normalized: ResourceObject = {
		type: resource.type,
		attributes,
		relationships
	}

	if (isResourceId(resource)) normalized.id = resource.id


	return normalized

}



export { denormalize, normalize }
