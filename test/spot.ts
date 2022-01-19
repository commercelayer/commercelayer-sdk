import commercelayer from '../lib/cjs'


(async () => {

	const organization = process.env.CL_SDK_ORGANIZATION || ''
	const accessToken = process.env.CL_SDK_ACCESS_TOKEN || ''

	const cl = commercelayer({
		organization,
		accessToken,
	})

	const customers = await cl.customers.list({ pageSize: 1, fields: ['email', 'customer_group'], include: ['customer_group'] })
	const customer = customers[0]
	console.log('CUSTOMER')
	console.log(customer)

	const customerGroups = await cl.customer_groups.list({ pageSize: 1, fields: ['name'] })
	const customerGroup = customerGroups[0]
	console.log('CUSTOMER GROUP')
	console.log(customerGroup)

	let c = await cl.customers.update({
		id: customer.id,
		customer_group: cl.customer_groups.relationship(customerGroup)
	}, { fields: ['email', 'customer_group'], include: ['customer_group']})
	console.log('CUSTOMER WITH CUSTOMER GROUP')
	console.log(await cl.customers.retrieve(c.id, { fields: ['email', 'customer_group'], include: ['customer_group']}))

	c = await cl.customers.update({
		id: customer.id,
		customer_group: cl.customer_groups.relationship(null)
	}, { fields: ['email', 'customer_group'], include: ['customer_group']})
	console.log('CUSTOMER WITHOUT CUSTOMER GROUP')
	console.log(await cl.customers.retrieve(c.id, { fields: ['email', 'customer_group'], include: ['customer_group']}))

})()