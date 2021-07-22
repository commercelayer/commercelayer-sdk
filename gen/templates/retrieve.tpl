async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<##__RESOURCE_RESPONSE_TYPE__##> {
	return this.resources.retrieve<##__RESOURCE_RESPONSE_TYPE__##>({ type: ##__RESOURCE_CLASS__##.TYPE, id }, params, options)
}