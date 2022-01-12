import { ApiResource, Resource, ResourcesConfig, ResourceId } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsRetrieve } from '../query';
declare type ApplicationRel = ResourceId & {
    type: typeof Applications.TYPE;
};
interface Application extends Resource {
    name?: string;
    kind?: string;
    public_access?: string;
    redirect_uri?: string;
    scopes?: string;
}
declare class Applications extends ApiResource {
    static readonly TYPE: 'application';
    retrieve(params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Application>;
    isApplication(resource: any): resource is Application;
    relationship(id: string | ResourceId): ApplicationRel;
    type(): string;
}
export default Applications;
export { Application };
