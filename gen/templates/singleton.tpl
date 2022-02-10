async retrieve(params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<##__RESOURCE_RESPONSE_CLASS__##> {
	return this.resources.singleton<##__RESOURCE_RESPONSE_CLASS__##>({ type: ##__RESOURCE_CLASS__##.TYPE }, params, options)
}