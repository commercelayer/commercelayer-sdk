async delete(id: string, options?: ResourcesConfig): Promise<void> {
	await this.resources.delete({ type: ##__RESOURCE_CLASS__##.TYPE, id }, options)
}
