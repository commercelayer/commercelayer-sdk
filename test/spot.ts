import commercelayer, { type Address, CommerceLayerClient, CommerceLayerStatic } from '../lib/cjs'
import { inspect } from 'util'
import getToken from './token'


const ENV = ''

	; (async () => {

		const cl = await init()

		try {

			const a: Address = await cl.addresses.retrieve('')

		} catch (error: any) {
			handleError(error)
		}

	})()


async function init(): Promise<CommerceLayerClient> {
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

	return cl
}

function handleError(error: any): void {
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