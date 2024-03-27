import { Customers } from '../src/api'
import { inspect } from 'util'
import getToken, { AccessToken } from './token'
import commercelayer, { CommerceLayerClient, CommerceLayerStatic } from '../src'
import ResourceAdapter, { ApiResourceAdapter } from '../src/resource';
import { CommerceLayerInitConfig } from '../src/commercelayer'


export const CustomersClient = (init: ResourceAdapter | CommerceLayerInitConfig): Customers => {
	return new Customers((init instanceof ResourceAdapter)? init : ApiResourceAdapter(init))
}


const ENV = ''

	; (async () => {

		// const cl = await init()
		const config = await initConfig()

		try {

			const adapter = ApiResourceAdapter(config)
			const api = CustomersClient(adapter)

			const res = await api.list({ fields: ['created_at'], sort: { created_at: 'asc' }, pageSize: 25 })
			console.log(res)


		} catch (error: any) {
			handleError(error)
		}

	})()


async function getAccessToken(): Promise<AccessToken> {
	const auth = await getToken('integration', ENV).catch(err => {
		console.log(`${err.message}\n`)
		process.exit()
	})
	return auth
}


async function initConfig(): Promise<CommerceLayerInitConfig> {

	const auth = await getAccessToken()

	const accessToken = auth ? auth.accessToken : ''
	const organization = process.env.CL_SDK_ORGANIZATION || 'sdk-test-org'

	return {
		organization,
		accessToken
	}

}


async function init(): Promise<CommerceLayerClient> {
	const config = await initConfig()
	const cl = commercelayer(config)
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