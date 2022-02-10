async ##__OPERATION_NAME__##(##__RESOURCE_ID__##: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<##__RESOURCE_RESPONSE_CLASS__##> {
	return this.resources.fetch<##__RESOURCE_RESPONSE_CLASS__##>({ type: '##__RELATIONSHIP_TYPE__##' }, `##__RELATIONSHIP_PATH__##`, params, options) as unknown as ##__RESOURCE_RESPONSE_CLASS__##
}