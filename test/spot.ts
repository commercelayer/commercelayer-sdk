
import { inspect } from 'util'
import commercelayer from '../lib/esm'
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

		const customers = await cl.customers.list({ filters: { email_eq: 'userx2@server.com' }})
		console.log(inspect(customers, false, null, true))

	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
