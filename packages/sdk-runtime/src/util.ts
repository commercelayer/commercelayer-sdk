import type { ObjectType } from '../src/types'
// import path from 'node:path'

export const sleep = async (ms: number): Promise<NodeJS.Timeout> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const sortObjectFields = (obj: ObjectType): ObjectType => {
  const sorted = Object.keys(obj)
    .sort()
    .reduce((accumulator: ObjectType, key: string) => {
      accumulator[key] = obj[key]
      return accumulator
    }, {})
  return sorted
}

/*
const nestedField = (obj: any, field: string): { key: string, val: any } => {

	let fp = field
	if (fp.endsWith('.')) fp = fp.substring(0, fp.length-1)

	const dots = field.split(".")

	const key = dots[dots.length-1]
	let val = obj
	while (dots.length && (val = val[dots.shift() || '']))
	  
	return { key, val }
}
*/

/*
const packageInfo = (fields?: string | string[], options?: any): Record<string, any>  => {
	const pjson = require(path.resolve('./', 'package.json'))
	return fields? (Array.isArray(fields)? fields : [ fields ]).reduce((info: any, field) => {
			const nf = nestedField(pjson, field)
			info[options?.nestedName? nf.key : field] = nf.val
			return info
		}, {}) : pjson
}
*/

export type TokenData = {
  // Absent from tokens without an `organization` claim; the domain and expiry
  // are still read from such a token.
  organization?: string
  domain?: string
  expiration: number
}

/**
 * Decodes one JWT segment. JWTs are base64url-encoded, using `-` and `_` where
 * standard base64 uses `+` and `/`, and `atob` throws on both. A payload only
 * contains them when its claims do — for ASCII text, only the characters `>`,
 * `?` and `~` produce them; some non-ASCII characters do too — so most tokens
 * decode either way, and the ones that do not would silently lose everything
 * inferred from them. Missing padding needs no handling: `atob` accepts it.
 * Normalised here rather than with `Buffer`, which browsers do not have.
 */
const decodeJwtSegment = (segment: string): string => atob(segment.replace(/-/g, '+').replace(/_/g, '/'))

// Production, staging and development. All three are Commerce Layer's own;
// dropping one sends that environment's requests to the default domain.
const COMMERCE_LAYER_DOMAINS = ['commercelayer.io', 'commercelayer.co', 'commercelayer.dev']

/**
 * The API domain implied by the token issuer: `https://auth.commercelayer.co`
 * gives `commercelayer.co`. The token is not verified client-side, so the
 * issuer is accepted only when it is a Commerce Layer auth host — otherwise a
 * token naming an arbitrary issuer would route requests, token attached, to a
 * host of its choosing. Anything else yields no domain, and the default applies.
 */
const domainFromIssuer = (iss: unknown): string | undefined => {
  if (typeof iss !== 'string') return undefined
  let host: string
  try {
    const url = new URL(iss)
    if (url.protocol !== 'https:') return undefined
    host = url.hostname
  } catch {
    return undefined
  }
  if (!host.startsWith('auth.')) return undefined
  const domain = host.slice('auth.'.length)
  const trusted = COMMERCE_LAYER_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`))
  return trusted ? domain : undefined
}

export const extractTokenData = (token: string): TokenData | undefined => {
  try {
    const data = JSON.parse(decodeJwtSegment(token.split('.')[1] as string))
    return {
      organization: data.organization?.slug,
      domain: domainFromIssuer(data.iss),
      expiration: data.exp,
    }
  } catch (_err: any) {
    return undefined
  }
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const tokenData = extractTokenData(token)
    return tokenData?.expiration ? tokenData.expiration * 1000 - Date.now() < 0 : false
  } catch (_err: any) {
    return false
  }
}
