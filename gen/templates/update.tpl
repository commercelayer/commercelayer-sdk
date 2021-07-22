async update(resource: ##__RESOURCE_REQUEST_TYPE__##, options?: ResourcesConfig): Promise<##__RESOURCE_RESPONSE_TYPE__## | DocWithData<##__RESOURCE_RESPONSE_TYPE__##>> {
	return this.resources.update({ ...resource, type: ##__RESOURCE_CLASS__##.TYPE }, options)
}