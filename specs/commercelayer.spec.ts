
import { CommerceLayer, CommerceLayerClient, CommerceLayerStatic } from '../src'
import { getClient, organization, } from '../test/common'
import getAccessToken from '../test/token'


let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('SDK:commercelayer suite', () => {

	it('commercelayer.resources', async () => {

		const resources = CommerceLayerStatic.resources()

		expect(resources).not.toBeUndefined()
		expect(Array.isArray(resources)).toBeTruthy()
		expect(resources.length).toBeGreaterThan(0)

		const resourcesInstance = cl.resources()
		expect(resourcesInstance).toStrictEqual(resources)

	})


	it('commercelayer.organization', async () => {

		expect(cl.currentOrganization).toEqual(organization)
	
		cl.config({ organization: 'fake-org' })
		expect(cl.currentOrganization).toEqual('fake-org')

	})


	it('commercelayer.rawResponse', async () => {

		const headers = true

		const cli = await getClient({ timeout: 15000 })

		const reader = cli.addRawResponseReader({ headers })
		expect(reader).not.toBeUndefined()
		expect(reader.id).toBeGreaterThanOrEqual(0)

		await cli.customers.list({ pageSize: 1 })
		expect(reader.rawResponse?.data).not.toBeUndefined()
		if (headers) expect(reader.headers).not.toBeUndefined()
		else expect(reader.headers).toBeUndefined()

		cli.removeRawResponseReader()

		cl = await getClient()

	})


	it('commercelayer.refreshToken', async () => {

		let refreshed = false

		async function refreshToken(old: string): Promise<string> {
			const token = (await getAccessToken('integration')).accessToken
			refreshed = true
			return token
		}

		const organization = process.env.CL_SDK_ORGANIZATION as string
		const domain = process.env.CL_SDK_DOMAIN as string
		const expiredToken = process.env.CL_SDK_ACCESS_TOKEN_EXPIRED as string

		const cli = CommerceLayer({
			organization,
			domain,
			accessToken: expiredToken,
			refreshToken
		})

		expect(cli.currentAccessToken).toBe(expiredToken)

		await cli.customers.list({ pageSize: 1 })

		expect(refreshed).toBeTruthy()
		expect(cli.currentAccessToken).toBeDefined()
		expect(cli.currentAccessToken).not.toBe(expiredToken)
		
		cl = await getClient()

	})

})
