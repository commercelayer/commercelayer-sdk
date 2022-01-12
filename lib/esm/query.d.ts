import { ResourceType } from "./resource";
interface QueryParamsRetrieve {
    include?: string[];
    fields?: string[] | {
        [key: string]: string[];
    };
}
interface QueryParamsList extends QueryParamsRetrieve {
    sort?: string[] | {
        [key: string]: 'asc' | 'desc';
    };
    filters?: {
        [key: string]: string | number | boolean;
    };
    pageNumber?: number;
    pageSize?: number;
}
declare type QueryParams = QueryParamsRetrieve | QueryParamsList;
export { QueryParamsRetrieve, QueryParamsList, QueryParams };
declare const generateQueryStringParams: (params: QueryParamsRetrieve | QueryParamsList | undefined, res: ResourceType) => {
    [key: string]: string;
};
export { generateQueryStringParams };
