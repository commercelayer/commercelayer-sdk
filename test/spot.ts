import commercelayer, { CommerceLayerStatic } from '../lib/cjs'
import { inspect } from 'util'
import getToken from './token'

const ENV = 'topfarmacia'

;(async () => {

	const auth = await getToken('integration', ENV).catch(err => {
		console.log(`${err.message}\n`)
		process.exit()
	})

	const accessToken = auth ? auth.accessToken : ''
	const organization = process.env.CL_SDK_ORGANIZATION || 'sdk-test-org'

	const cl = commercelayer({
		organization,
		accessToken
	})

	try {
		
		const order = await cl.orders.retrieve('nlKhmzozJO')
		console.log(order)

	
	} catch (error: any) {
		console.log('\n\n --xx  ERROR  xx--\n')
		if (CommerceLayerStatic.isApiError(error)) console.log(error.errors)
		else {
			console.log(inspect(error, false, null, true))
			console.log(error.message)
		}
	}

})()
