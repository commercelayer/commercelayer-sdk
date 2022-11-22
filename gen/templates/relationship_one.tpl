async ##__OPERATION_NAME__##(##__RESOURCE_ID__##: string | ##__MODEL_RESOURCE_INTERFACE__##, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<##__RESOURCE_RESPONSE_CLASS__##> {
	const _##__RESOURCE_ID__## = (##__RESOURCE_ID__## as ##__MODEL_RESOURCE_INTERFACE__##).id || ##__RESOURCE_ID__## as string
	return this.resources.fetch<##__RESOURCE_RESPONSE_CLASS__##>({ type: '##__RELATIONSHIP_TYPE__##' }, `##__RELATIONSHIP_PATH__##`, params, options) as unknown as ##__RESOURCE_RESPONSE_CLASS__##
}