import { authenticate } from '@commercelayer/js-auth'
import 'varlock/auto-load'
import { ENV } from 'varlock/env'

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
  accessToken: string
  tokenType: 'bearer' | 'Bearer'
  expiresIn: number
  expires: Date
  scope: AuthScope
  createdAt: number
  error?: string
  errorDescription?: string
}

// const endpoint = `https://${organization.toLowerCase()}.${domain ? domain : 'commercelayer.io'}`

// Variables are resolved by varlock from .env.schema (see that file).
const initEnv = (): AuthData | undefined => {
  return {
    slug: ENV.CL_PROVISIONING_SDK_ORGANIZATION,
    domain: ENV.CL_PROVISIONING_SDK_DOMAIN,
    clientId: ENV.CL_PROVISIONING_SDK_CLIENT_ID,
    clientSecret: ENV.CL_PROVISIONING_SDK_CLIENT_SECRET,
    scope: ENV.CL_PROVISIONING_SDK_SCOPE,
  }
}

export default async (type: TokenType): Promise<AccessToken> => {
  const credentials = initEnv()

  if (credentials) {
    switch (type) {
      case 'integration':
        return getAccessToken(credentials)
      // case 'sales_channel':
      default:
        return getAccessToken(credentials)
    }
  } else throw Error('Environment configuration error')
}

const getAccessToken = async (auth: AuthData): Promise<AccessToken> => {
  const scope = auth.scope
    ? Array.isArray(auth.scope)
      ? auth.scope.map((s) => s.trim()).join(',')
      : auth.scope
    : undefined

  const credentials: any = {
    clientId: auth.clientId,
    clientSecret: auth.clientSecret,
    // slug: auth.slug,
    domain: auth.domain || undefined,
    scope,
  }

  if (auth.email && auth.password) {
    credentials.username = auth.email
    credentials.password = auth.password
    return authenticate('password', credentials)
  }

  return authenticate('client_credentials', credentials)
}
