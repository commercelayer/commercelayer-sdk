import { DocWithData, ResourceObject } from 'jsonapi-typescript';
import type { ResourceCreate, ResourceUpdate, ResourceId, ResourceType, Resource } from './resource';
declare const denormalize: <R extends Resource>(response: DocWithData) => R | R[];
declare const normalize: (resource: (ResourceCreate & ResourceType) | (ResourceUpdate & ResourceId)) => ResourceObject;
export { denormalize, normalize };
