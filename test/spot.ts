
import commercelayer, { CommerceLayerStatic } from '../src'
import { inspect } from 'util'
import getToken from './token'
import { startupSnapshot } from 'v8';
import { Customers } from '../src/api';

const ENV = ''

	; (async () => {

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

			let c = await cl.customers.update({ id: 'kqzZhoJpdJ', reference: 'TESTREF' })
			c = await cl.customers.retrieve(c.id)
			c = await cl.customers.retrieve(c.id)
			console.log(c)
			c = await cl.customers.retrieve(c.id)
			console.log(c)
			c = await cl.customers.retrieve(c.id)
			console.log(c)
			console.log(c)

		} catch (error: any) {
			console.log('\n\n --xx  ERROR  xx--\n')
			if (CommerceLayerStatic.isApiError(error)) {
				console.log('message: ' + error.message)
				console.log('status: ' + error.status)
				console.log('statusText: ' + error.statusText)
				console.log('source: ' + error.source)
				console.log('errors:')
				if (error.errors?.length > 0) console.log(error.errors)
			}
			else if (CommerceLayerStatic.isSdkError(error)) {
				console.log('message: ' + error.message)
				console.log('type: ' + error.type)
				console.log('code: ' + error.code)
				console.log('source: ' + error.source)
			}
			else {
				console.log(inspect(error, false, null, true))
				console.log(error.message)
			}
		}

	})()
