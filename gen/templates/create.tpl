async create(resource: ##__RESOURCE_REQUEST_TYPE__##, options?: ResourcesConfig): Promise<##__RESOURCE_RESPONSE_TYPE__##> {
	return this.resources.create(Object.assign(resource, { type: ##__RESOURCE_CLASS__##.TYPE }) , options)
}