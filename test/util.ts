import { inspect } from "util"
import CommerceLayer, { CommerceLayerClient, type CommerceLayerInitConfig, CommerceLayerStatic } from "../src"
import getToken, { AccessToken } from './token'


const ENV = ''


export const getAccessToken = async (): Promise<AccessToken> => {
	const auth = await getToken('integration', ENV).catch(err => {
		console.log(`${err.message}\n`)
		process.exit()
	})
	return auth
}


export const initConfig = async (): Promise<CommerceLayerInitConfig> => {

	const auth = await getAccessToken()

	const accessToken = process.env.CL_SDK_ACCESS_TOKEN || (auth ? auth.accessToken : '')
	const organization = process.env.CL_SDK_ORGANIZATION || 'sdk-test-org'

	return {
		organization,
		accessToken
	}

}


export const init = async (): Promise<CommerceLayerClient> => {
	const config = await initConfig()
	const cl = CommerceLayer(config)
	return cl
}


export const handleError = (error: any, stack?: boolean): void => {
	console.log('\n\n --xx  ERROR  xx--\n')
	if (CommerceLayerStatic.isApiError(error)) {
		console.log('message: ' + error.message)
		console.log('status: ' + error.status)
		console.log('statusText: ' + error.statusText)
		console.log('source: ' + error.source)
		console.log('errors:')
		if (error.errors?.length > 0) console.log(error.errors)
		if (stack) console.log(inspect(error, false, null, true))
	}
	else if (CommerceLayerStatic.isSdkError(error)) {
		console.log('message: ' + error.message)
		console.log('type: ' + error.type)
		console.log('code: ' + error.code)
		console.log('source: ' + error.source)
		if (stack) console.log(inspect(error, false, null, true))
	}
	else {
		console.log(inspect(error, false, null, true))
		console.log(error.message)
	}
}