async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
	await this.resources.delete((typeof id === 'string')? { id, type: ##__RESOURCE_CLASS__##.TYPE } : id, options)
}