import type { ResourceId, ResourceType } from './resource';
declare const isResourceId: (resource: any) => resource is ResourceId;
declare const isResourceType: (resource: any) => resource is ResourceType;
export { isResourceId, isResourceType };
