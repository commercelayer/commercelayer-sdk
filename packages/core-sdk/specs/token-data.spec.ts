import { extractTokenData, isTokenExpired } from '@runtime/util'
import { describe, expect, test } from 'vitest'
import { application, CommerceLayer } from '../src/single-client'
import { handleError, interceptRequest } from '../test/common'

// Unsigned test tokens: only the payload segment is ever read client-side.
const segment = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
const jwt = (payload: object) => `${segment({ alg: 'none' })}.${segment(payload)}.sig`

/**
 * A token whose payload segment does, or does not, contain the base64url-only
 * characters `-` and `_`. Real tokens get them only when a claim contains `>`,
 * `?`, `~` or certain non-ASCII characters, so most never do — this forces the
 * case with a `?`-padded claim. Both shapes must decode identically.
 */
const tokenWith = (urlSafeChars: boolean, payload: object): string => {
  for (let n = 0; n < 500; n++) {
    const candidate = { ...payload, pad: '?'.repeat(n) }
    if (/[-_]/.test(segment(candidate)) === urlSafeChars) return jwt(candidate)
  }
  throw new Error('could not build the requested token shape')
}

const FUTURE = Math.floor(Date.now() / 1000) + 3600
const PAST = Math.floor(Date.now() / 1000) - 3600
const claims = (iss: unknown, exp = FUTURE) => ({ organization: { slug: 'test-org' }, iss, exp })

describe('SDK:token data', () => {
  describe('decoding', () => {
    test.each([false, true])('payload with base64url-only characters: %s', (urlSafe) => {
      const data = extractTokenData(tokenWith(urlSafe, claims('https://auth.commercelayer.co')))
      expect(data).toEqual({ organization: 'test-org', domain: 'commercelayer.co', expiration: FUTURE })
    })

    test('a token without an organization claim still yields domain and expiry', () => {
      const data = extractTokenData(jwt({ iss: 'https://auth.commercelayer.co', exp: FUTURE }))
      expect(data?.organization).toBeUndefined()
      expect(data?.domain).toBe('commercelayer.co')
      expect(data?.expiration).toBe(FUTURE)
    })

    test('garbage is not a token', () => {
      expect(extractTokenData('not-a-jwt')).toBeUndefined()
    })
  })

  describe('expiry', () => {
    // isTokenExpired gates automatic refresh: when decoding failed it returned
    // false, so a configured refreshToken callback never ran for such tokens.
    test.each([false, true])('detects expiry, base64url-only characters: %s', (urlSafe) => {
      expect(isTokenExpired(tokenWith(urlSafe, claims('https://auth.commercelayer.co', PAST)))).toBe(true)
      expect(isTokenExpired(tokenWith(urlSafe, claims('https://auth.commercelayer.co', FUTURE)))).toBe(false)
    })
  })

  describe('domain from issuer', () => {
    test.each([
      ['https://auth.commercelayer.io', 'commercelayer.io'],
      ['https://auth.commercelayer.co', 'commercelayer.co'],
      ['https://auth.stg1.commercelayer.co', 'stg1.commercelayer.co'],
      ['https://auth.username.commercelayer.dev', 'username.commercelayer.dev'],
    ])('trusts %s', (iss, domain) => {
      expect(extractTokenData(jwt(claims(iss)))?.domain).toBe(domain)
    })

    test.each([
      ['an arbitrary host', 'https://auth.evil.example'],
      ['a lookalike suffix', 'https://auth.commercelayer.co.evil.example'],
      ['a lookalike dev suffix', 'https://auth.username.commercelayer.dev.evil.example'],
      ['no label boundary', 'https://auth.evilcommercelayer.io'],
      ['plain http', 'http://auth.commercelayer.co'],
      ['a non-auth host', 'https://api.commercelayer.co'],
      ['not a URL', 'commercelayer.co'],
      ['not a string', 42],
    ])('rejects %s', (_label, iss) => {
      expect(extractTokenData(jwt(claims(iss)))?.domain).toBeUndefined()
    })
  })

  describe('through the client', () => {
    type ClientConfig = { accessToken: string; organization?: string; domain?: string }
    type RequestOptions = Parameters<typeof application.retrieve>[1]

    const requestedHost = async (config: ClientConfig, options?: RequestOptions) => {
      const client = CommerceLayer(config)
      let host: string | undefined
      client.addRequestInterceptor((request) => {
        host = request.url.host
        return interceptRequest()
      })
      await application
        .retrieve({}, options)
        .catch(handleError)
        .finally(() => client.removeInterceptor('request'))
      expect(host, 'request interceptor did not run').toBeDefined()
      return host
    }

    const stagingToken = jwt(claims('https://auth.commercelayer.co'))

    test('organization and domain are inferred from a token with base64url-only characters', async () => {
      const host = await requestedHost({ accessToken: tokenWith(true, claims('https://auth.commercelayer.co')) })
      expect(host).toBe('test-org.commercelayer.co')
    })

    test('a development token reaches its own environment without an explicit domain', async () => {
      const host = await requestedHost({ accessToken: jwt(claims('https://auth.username.commercelayer.dev')) })
      expect(host).toBe('test-org.username.commercelayer.dev')
    })

    test('an untrusted issuer falls back to the default domain', async () => {
      const host = await requestedHost({ accessToken: jwt(claims('https://auth.evil.example')) })
      expect(host).toBe('test-org.commercelayer.io')
    })

    // Inference only fills in what was not passed; explicit values always win,
    // even when they contradict the token.
    test('an explicit domain wins over the token issuer', async () => {
      const host = await requestedHost({ accessToken: stagingToken, domain: 'commercelayer.io' })
      expect(host).toBe('test-org.commercelayer.io')
    })

    test('an explicit organization wins over the token claim', async () => {
      const host = await requestedHost({ accessToken: stagingToken, organization: 'other-org' })
      expect(host).toBe('other-org.commercelayer.co')
    })

    test('a per-request apiVersion keeps the explicit domain, not the issuer', async () => {
      const host = await requestedHost({ accessToken: stagingToken, domain: 'commercelayer.io' }, {
        apiVersion: '2099-03',
      } as RequestOptions)
      expect(host).toBe('test-org.commercelayer.io')
    })
  })
})
