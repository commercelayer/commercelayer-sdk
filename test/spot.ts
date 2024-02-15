
import { inspect } from 'util'
import commercelayer, { Tag } from '../src/index'
import getToken from './token'
import { error } from 'console'


(async () => {

	const auth = await getToken('integration')
	const accessToken = auth ? auth.accessToken : ''
	const organization = process.env.CL_SDK_ORGANIZATION || 'sdk-test-org'

	const cl = commercelayer({
		organization,
		accessToken
	})

	try {

		cl.customers.create({ email: 'fake' }).catch(error => {
			if (cl.isApiError(error)) console.log(error.errors)
		})
	
	} catch (error: any) {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}

})()
