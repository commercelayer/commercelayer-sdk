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

	cl.config({ timeout: 6000 })

	const opt = {
		timeout: 8000
	}

	const start = Date.now()
	const customers = await cl.customers.list({ pageSize: 2, pageNumber: 2, sort: { created_at: 'desc', updated_at: 'asc' }, fields: ['email'] }, opt)
		.catch(console.log)
	const stop = Date.now()
	console.log(stop-start)

})()