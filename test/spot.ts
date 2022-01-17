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

	const c = await cl.customers.update({ id: 'kopZhGAJBn', customer_group: cl.customer_groups.relationship(null)}, { include: ['customer_group'] })

	console.log(c)

})()