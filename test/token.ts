import { authentication } from '@commercelayer/js-auth'
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



const organization = process.env.CL_SDK_ORGANIZATION || ''
const domain = process.env.CL_SDK_DOMAIN
const clientId = process.env.CL_SDK_CLIENT_ID || ''
const clientSecret = process.env.CL_SDK_CLIENT_SECRET || ''
const scope = process.env.CL_SDK_SCOPE || ''


const endpoint = `https://${organization.toLowerCase()}.${domain ? domain : 'commercelayer.io'}`


export default async (type: TokenType): Promise<AccessToken> => {
	switch (type) {
		case 'integration': return getAccessToken({ slug: organization, clientId, clientSecret, scope })
		case 'sales_channel':
		default: return getAccessToken({ slug: organization, clientId, scope })
	}
}





const getAccessToken = async (auth: AuthData): Promise<AccessToken> => {

	const scope = auth.scope ? (Array.isArray(auth.scope) ? auth.scope.map(s => s.trim()).join(',') : auth.scope) : ''
  
	const credentials: any = {
	  clientId: auth.clientId,
	  clientSecret: auth.clientSecret,
	  slug: auth.slug,
	  domain: auth.domain,
	  scope
	}
  
	if (auth.email && auth.password) {
	  credentials.username = auth.email
	  credentials.password = auth.password
	  return authentication('password', credentials)
	}
  
	return authentication('client_credentials', credentials)
  
  }
