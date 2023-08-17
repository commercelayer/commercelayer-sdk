/* trigger.##__OPERATION_NAME__## start */
it(resourceType + '.##__OPERATION_NAME__##', async () => {

	let triggerAttr = '##__OPERATION_NAME__##'
	if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`

	const triggerValue = ##__TRIGGER_VALUE__##
	const attributes = { [triggerAttr]: triggerValue }
    const id = TestData.id

	const intId = cl.addRequestInterceptor((config) => {
		expect(config.method).toBe('patch')
		checkCommon(config, resourceType, id, currentAccessToken)
		checkCommonData(config, resourceType, attributes, id)
		return interceptRequest()
	})

	await cl[resourceType].##__OPERATION_NAME__##(##__TRIGGER_PARAMS__##, {}, CommonData.options)
		.catch(handleError)
		.finally(() => cl.removeInterceptor('request', intId))

})
/* trigger.##__OPERATION_NAME__## stop */