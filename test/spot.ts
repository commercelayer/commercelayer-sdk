import commercelayer from '../lib/cjs'
import { inspect } from 'util'
import getToken from './token'

const ENV = 'topfarmacia'

;(async () => {

	const auth = await getToken('integration')
	const accessToken = auth ? auth.accessToken : ''
	const organization = process.env.CL_SDK_ORGANIZATION || 'sdk-test-org'

	const cl = commercelayer({
		organization,
		accessToken
	})

	try {

		const orders = await cl.orders.list({ pageSize: 1 })
		console.log(orders)
	
	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
