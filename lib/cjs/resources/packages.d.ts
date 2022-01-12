import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { StockLocation } from './stock_locations';
import { Parcel } from './parcels';
import { Attachment } from './attachments';
declare type PackageRel = ResourceId & {
    type: typeof Packages.TYPE;
};
declare type StockLocationRel = ResourceId & {
    type: 'stock_locations';
};
interface Package extends Resource {
    name?: string;
    code?: string;
    length?: number;
    width?: number;
    height?: number;
    unit_of_length?: string;
    stock_location?: StockLocation;
    parcels?: Parcel[];
    attachments?: Attachment[];
}
interface PackageCreate extends ResourceCreate {
    name: string;
    code?: string;
    length: number;
    width: number;
    height: number;
    unit_of_length: string;
    stock_location: StockLocationRel;
}
interface PackageUpdate extends ResourceUpdate {
    name?: string;
    code?: string;
    length?: number;
    width?: number;
    height?: number;
    unit_of_length?: string;
    stock_location?: StockLocationRel;
}
declare class Packages extends ApiResource {
    static readonly TYPE: 'packages';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Package>>;
    create(resource: PackageCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Package>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Package>;
    update(resource: PackageUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Package>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isPackage(resource: any): resource is Package;
    relationship(id: string | ResourceId): PackageRel;
    type(): string;
}
export default Packages;
export { Package, PackageCreate, PackageUpdate };
