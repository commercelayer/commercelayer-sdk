async ##__OPERATION_NAME__##(##__RESOURCE_ID__##: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<##__RESOURCE_RESPONSE_CLASS__##>> {
	return this.resources.fetch<##__RESOURCE_RESPONSE_CLASS__##>({ type: '##__RELATIONSHIP_TYPE__##' }, `##__RELATIONSHIP_PATH__##`, params, options) as unknown as ListResponse<##__RESOURCE_RESPONSE_CLASS__##>
}