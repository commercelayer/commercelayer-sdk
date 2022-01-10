import { getIntegrationToken, getSalesChannelToken } from '@commercelayer/js-auth'
import { AuthReturnType } from '@commercelayer/js-auth'
import dotenv from 'dotenv'

dotenv.config()


type TokenType = 'sales_channel' | 'integration' | 'customer'


const organization = process.env.CL_SDK_ORGANIZATION || ''
const domain = process.env.CL_SDK_DOMAIN
const clientId = process.env.CL_SDK_CLIENT_ID || ''
const clientSecret = process.env.CL_SDK_CLIENT_SECRET || ''
const scope = process.env.CL_SDK_SCOPE || ''


const endpoint = `https://${organization.toLowerCase()}.${domain ? domain : 'commercelayer.io'}`


export default async (type: TokenType): AuthReturnType => {
	switch (type) {
		case 'integration': return getIntegrationToken({ endpoint, clientId, clientSecret, scope })
		case 'sales_channel':
		default: return getSalesChannelToken({ endpoint, clientId, scope })
	}
}
