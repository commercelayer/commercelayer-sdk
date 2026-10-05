async create(resource: ##__RESOURCE_REQUEST_CLASS__##, params?: QueryParamsRetrieve<##__RESOURCE_RESPONSE_CLASS__##>, options?: ResourcesConfig): Promise<##__RESOURCE_RESPONSE_CLASS__##> {
	return this.resources.create<##__RESOURCE_REQUEST_CLASS__##, ##__RESOURCE_RESPONSE_CLASS__##>({ ...resource, type: ##__RESOURCE_CLASS__##.TYPE }, params, options)
}