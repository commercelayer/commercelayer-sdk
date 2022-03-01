/* eslint-disable no-console */
// import commercelayer from '../lib/cjs'
import commercelayer from '../src'


(async () => {

	const organization = process.env.CL_SDK_ORGANIZATION || ''
	const accessToken = process.env.CL_SDK_ACCESS_TOKEN || ''

	const cl = commercelayer({
		organization,
		accessToken,
		timeout: 5000,
	})

	const customer = await cl.customers.retrieve('OZqohRjoWn')

	const id = customer.id

	const orders = await cl.customers.orders(id)

	console.log(orders)

	console.log(id)

})()