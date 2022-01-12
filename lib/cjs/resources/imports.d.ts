import { ApiResource, Resource, ResourceCreate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
declare type ImportRel = ResourceId & {
    type: typeof Imports.TYPE;
};
interface Import extends Resource {
    resource_type?: string;
    parent_resource_id?: string;
    status?: string;
    started_at?: string;
    completed_at?: string;
    interrupted_at?: string;
    inputs?: object[];
    inputs_size?: number;
    errors_count?: number;
    warnings_count?: number;
    destroyed_count?: number;
    processed_count?: number;
    errors_log?: object;
    warnings_log?: object;
    cleanup_records?: boolean;
}
interface ImportCreate extends ResourceCreate {
    resource_type: string;
    parent_resource_id?: string;
    inputs: object[];
    cleanup_records?: boolean;
}
declare class Imports extends ApiResource {
    static readonly TYPE: 'imports';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Import>>;
    create(resource: ImportCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Import>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Import>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isImport(resource: any): resource is Import;
    relationship(id: string | ResourceId): ImportRel;
    type(): string;
}
export default Imports;
export { Import, ImportCreate };
