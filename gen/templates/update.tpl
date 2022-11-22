async update(resource: ##__RESOURCE_REQUEST_CLASS__##, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<##__RESOURCE_RESPONSE_CLASS__##> {
	return this.resources.update<##__RESOURCE_REQUEST_CLASS__##, ##__RESOURCE_RESPONSE_CLASS__##>({ ...resource, type: ##__RESOURCE_CLASS__##.TYPE }, params, options)
}