async create(resource: ##__RESOURCE_REQUEST_TYPE__##, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<##__RESOURCE_RESPONSE_TYPE__##> {
	return this.resources.create({ ...resource, type: ##__RESOURCE_CLASS__##.TYPE }, params, options)
}