
import { inspect } from 'util'
import commercelayer, { Tag } from '../src/index'
import getToken from './token'


(async () => {

	const auth = await getToken('integration')
	const accessToken = auth ? auth.accessToken : ''
	const organization = process.env.CL_SDK_ORGANIZATION || 'sdk-test-org'

	const cl = commercelayer({
		organization,
		accessToken
	})

	try {

		const customers = await cl.customers.list({ filters: { metadata_jcont: { testkey: 'meta' }}})

	console.log(customers)

	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
