import { CommerceLayer } from '../src'
import { getAccessToken, handleError, initConfig } from './util'

async function customFetch(input: string | URL | Request, init?: RequestInit) {
  console.log('CUSTOM FETCH START')
  const res = await global.fetch(input, init)
  console.log('CUSTOM_FETCH STOP')
  return res
}

async function refreshToken(_old: string): Promise<string> {
  console.log('Getting new access token from auth server')
  // if (true) throw new Error('Error refreshing test expired access token')
  return (await getAccessToken()).accessToken
}

;(async () => {
  const config = await initConfig()
  const cl = CommerceLayer(config)

  cl.config({ refreshToken, fetch: customFetch, accessToken: process.env.CL_SDK_ACCESS_TOKEN_EXPIRED })
  try {
    // console.log(cl.currentOrganization)

    const org = await cl.organization.retrieve({ fields: ['name', 'slug'] })
    console.log(org)

    const app = await cl.application.retrieve({ fields: ['name', 'kind'] })
    console.log(app)

    const customer = (await cl.customers.list()).first()
    console.log(customer)
  } catch (error: any) {
    handleError(error, true)
  }
})()
