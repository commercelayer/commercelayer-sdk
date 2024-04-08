import { authenticate, jwtDecode } from 'https://esm.sh/@commercelayer/js-auth@6.0.0'
import { CommerceLayer } from 'https://esm.sh/@commercelayer/sdk@sdk6'

const auth = await authenticate('client_credentials', {
  clientId: 'BISG8bb3GWpC8_D7Nt1SuWWdieS5bJq831A50LgB_Ig',
  scope: 'market:id:KoaJYhMVVj'
})

const decoded = jwtDecode(auth.accessToken)

const cl = CommerceLayer({
  organization: decoded.payload.organization.slug,
  accessToken: auth.accessToken
})

const skus = await cl.skus.list({
  fields: {
    skus: ['code', 'name']
  }
})

console.log('skus', skus)
