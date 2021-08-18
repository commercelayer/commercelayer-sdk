import { getIntegrationToken, getSalesChannelToken } from '@commercelayer/js-auth'
import { AuthReturnType } from '@commercelayer/js-auth/dist/typings'
type TokenType = 'sales_channel' | 'integration' | 'customer'

export default async (type: TokenType = 'sales_channel'): AuthReturnType => {
  if (type === 'integration') {
    return await getIntegrationToken({
      endpoint: process.env.ENDPOINT as string,
      clientId: process.env.INTEGRATION_CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      scope: process.env.SCOPE as string
    })
  }
  return await getSalesChannelToken({
    endpoint: process.env.ENDPOINT as string,
    clientId: process.env.SALES_CHANNEL_CLIENT_ID as string,
    scope: process.env.SCOPE as string
  })
}
