import { authenticate } from '@commercelayer/js-auth'
import dotenv from 'dotenv'

dotenv.config()


type TokenType = 'sales_channel' | 'integration' | 'customer'

export type AuthScope = string | string[]

type AuthData = {
	slug: string
	clientId: string
	clientSecret?: string
	domain?: string
	scope?: AuthScope
	email?: string
	password?: string
}


export type AccessToken = {
	accessToken: string;
	tokenType: 'bearer' | 'Bearer';
	expiresIn: number;
	expires: Date;
	scope: AuthScope;
	createdAt: number;
	error?: string;
	errorDescription?: string;
}



// const endpoint = `https://${organization.toLowerCase()}.${domain ? domain : 'commercelayer.io'}`

const initEnv = (env?: string): AuthData | undefined => {

	if (env) {
		console.log('**** Test Environment: ' + env)
		const cfg = dotenv.config({ path: `./test/env/.env.${env}`, override: true })
		if (cfg.error) throw cfg.error
	}

	return {
		slug: process.env.CL_SDK_ORGANIZATION || '',
		domain: process.env.CL_SDK_DOMAIN,
		clientId: process.env.CL_SDK_CLIENT_ID || '',
		clientSecret: process.env.CL_SDK_CLIENT_SECRET || '',
		scope: process.env.CL_SDK_SCOPE || ''
	}

}


export default async (type: TokenType, env?: string): Promise<AccessToken> => {

	const credentials = initEnv(env)

	if (credentials) {
		switch (type) {
			case 'integration': return getAccessToken(credentials)
			case 'sales_channel':
			default: return getAccessToken(credentials)
		}
	} else throw Error('Environment configuration error')

}





const getAccessToken = async (auth: AuthData): Promise<AccessToken> => {

	const scope = auth.scope ? (Array.isArray(auth.scope) ? auth.scope.map(s => s.trim()).join(',') : auth.scope) : undefined

	const credentials: any = {
		clientId: auth.clientId,
		clientSecret: auth.clientSecret,
		// slug: auth.slug,
		domain: auth.domain || undefined,
		scope
	}

	if (auth.email && auth.password) {
		credentials.username = auth.email
		credentials.password = auth.password
		return authenticate('password', credentials)
	}

	return authenticate('client_credentials', credentials)

}
