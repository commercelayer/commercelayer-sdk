/* trigger.##__OPERATION_NAME__## start */
it(resourceType + '.##__OPERATION_NAME__##', async () => {

	let triggerAttr = '##__OPERATION_NAME__##'
	if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`

	const triggerValue = ##__TRIGGER_VALUE__##
	const attributes = { [triggerAttr]: triggerValue }
  const id = TestData.id

	const intId = cl.addRequestInterceptor((request) => {
		const data = JSON.parse(String(request.options.body))
		expect(request.options.method).toBe('PATCH')
		checkCommon(request, resourcePath, id, currentAccessToken)
		checkCommonData(data, resourceType, attributes, id)
		return interceptRequest()
	})

	await cl[resourcePath].##__OPERATION_NAME__##(##__TRIGGER_PARAMS__##, {}, CommonData.options)
		.catch(handleError)
		.finally(() => cl.removeInterceptor('request'))

})
/* trigger.##__OPERATION_NAME__## stop */