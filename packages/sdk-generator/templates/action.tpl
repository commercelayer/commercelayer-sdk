async ##__ACTION_NAME__##(##__RESOURCE_ID__##: string | ##__RESOURCE_MODEL__####__ACTION_PAYLOAD_PARAM__##, options?: ResourcesConfig): Promise<void> {
	const _##__RESOURCE_ID__## = (##__RESOURCE_ID__## as ##__RESOURCE_MODEL__##).id || (##__RESOURCE_ID__## as string)
	await this.resources.action('##__ACTION_COMMAND__##', `##__ACTION_PATH__##`, ##__ACTION_PAYLOAD_ARG__##, options)
}
