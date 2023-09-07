
import { CommerceLayerClient, CommerceLayerStatic } from '../src'
import { currentAccessToken, getClient, initClient, organization, } from '../test/common'
import { RawResponseReader } from '../src/interceptor'
import { OPEN_API_SCHEMA_VERSION } from '../src/commercelayer'


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


	it('commercelayer.accessToken', async () => {

		expect(cl.currentAccessToken).toEqual(currentAccessToken)
	
		cl.config({ accessToken: 'fake-token' })
		expect(cl.currentAccessToken).toEqual('fake-token')

	})


	it('commercelayer.rawResponse', async () => {

		jest.setTimeout(10000)
		const headers = true

		const cli = await getClient(true)

		const reader = cli.addRawResponseReader({ headers })
		expect(reader).not.toBeUndefined()
		expect(reader.id).toBeGreaterThanOrEqual(0)

		await cli.customers.list({ pageSize: 1 })
		expect(reader.rawResponse?.data).not.toBeUndefined()
		if (headers) expect(reader.headers).not.toBeUndefined()
		else expect(reader.headers).toBeUndefined()

		cli.removeRawResponseReader(reader.id as number)
		cli.removeRawResponseReader(reader)
		cli.removeRawResponseReader(0)
		cli.removeRawResponseReader({ id: undefined } as RawResponseReader)

		cl = await getClient()

	})


})
