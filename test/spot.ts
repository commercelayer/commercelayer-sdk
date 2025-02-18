import { getAccessToken, handleError, init, initConfig } from './util'
import commercelayer from '../src'



async function customFetch(input: string | URL | Request, init?: RequestInit) {
	console.log('CUSTOM FETCH START')
	const res = await global.fetch(input, init)
	console.log('CUSTOM_FETCH STOP')
	return res
}

async function refreshToken(old: string): Promise<string> {
	console.log('Getting new access token from auth server')
	// if (true) throw new Error('Error refreshing test expired access token')
	return (await getAccessToken()).accessToken
}

; (async () => {

	const config = await initConfig()
	const cl = commercelayer(config)

	// cl.config({ refreshToken, fetch: customFetch })
	try {

		const org = await cl.organization.retrieve({ fields: ['name', 'slug']})
		console.log(org)

		const app = await cl.application.retrieve({ fields: ['name', 'kind']})
		console.log(app)

		const priceListIds = ['xlqjNCmDGL','vkmQxCWOAk']
		for (const id of priceListIds) {
			await cl.price_lists.delete(id)
			console.log('Deleted price list ' + id)
		}

	} catch (error: any) {
		handleError(error, true)
	}

})()
