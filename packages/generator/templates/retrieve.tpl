async retrieve(id: string, params?: QueryParamsRetrieve<##__RESOURCE_RESPONSE_CLASS__##>, options?: ResourcesConfig): Promise<##__RESOURCE_RESPONSE_CLASS__##> {
	return this.resources.retrieve<##__RESOURCE_RESPONSE_CLASS__##>({ type: ##__RESOURCE_CLASS__##.TYPE, id }, params, options)
}