import { getAccessToken, handleError, init } from './util'



async function customFetch(input: string | URL | Request, init?: RequestInit) {
	console.log('CUSTOM FETCH START')
	const res = await global.fetch(input, init)
	console.log('CUSTOM_FETCH STOP')
	return res
}

async function refreshToken(old: string): Promise<string> {
	console.log('Getting new access token from auth server')
	return (await getAccessToken()).accessToken
}

; (async () => {

	const cl = await init()

	cl.config({ refreshToken, fetch: customFetch })

	try {

		const res = await cl.customers.list({ pageSize: 1 })
		console.log(res)
		const c = await cl.customers.retrieve(res[0].id)
		console.log(c)

	} catch (error: any) {
		handleError(error, true)
	}

})()
