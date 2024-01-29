
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

		let customers = await cl.customers.list({ filters: { 'email_cont_any': ['userx2@server.com','userx@server.com'] } })
		console.log(customers)

		customers = await cl.customers.list({ filters: { 'email_cont_any': 'userx2@server.com,userx@server.com' } })
		console.log(customers)

		customers = await cl.customers.list({ filters: { 'email_cont': 'userx2@server.com' } })
		console.log(customers)


	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
