
import { CommerceLayerClient, Customer } from '../src'
import { sleep } from '../src/util'
import { getClient, TestData } from '../test/common'
import { normalize, denormalize } from '../src/jsonapi'
import { ResourceTypeLock } from '../src/api'
import { isEqual } from 'lodash'
import { isResourceType } from '../src/common'


let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('SDK suite', () => {

	it('util.sleep', async () => {

		const ms = 2000

		const start = Date.now()
		await sleep(ms)
		const stop = Date.now()

		const delay = stop - start

		expect(delay).toBeGreaterThanOrEqual(ms)
		expect(delay).toBeLessThan(ms + 10)

	})


	it('common.type', async () => {

		const customer: Customer = {
			id: TestData.id,
			type: 'customers',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		}

		expect(isResourceType(customer)).toBeTruthy()

	})


	it('jsonapi.normalize', async () => {

		const type: ResourceTypeLock = 'customers'

		const resource = {
			id: TestData.id,
			type,
			reference: TestData.reference,
			reference_origin: TestData.reference_origin,
			metadata: TestData.metadata,
			customer_group: cl.customers.relationship(TestData.id),
			order: cl.orders.relationship(TestData.id),
		}

		const expected = {
			id: resource.id,
			type,
			attributes: {
				reference: resource.reference,
				reference_origin: resource.reference_origin,
				metadata: resource.metadata
			},
			relationships: {
				customer_group: {
					data: resource.customer_group
				},
				order: {
					data: resource.order
				}
			}
		}

		const normalized = normalize(resource)

		expect(isEqual(normalized, expected)).toBeTruthy()

	})


	it('jsonapi.denormalize', async () => {

		const jsonApi = {
			data: {
				id: TestData.id + '00',
				type: 'customers',
				links: { },
				attributes: {
					email: 'customer@sdk-test.org',
					status: 'prospect',
					reference: TestData.reference,
					reference_origin: TestData.reference_origin,
					metadata: TestData.metadata
				},
				relationships: {
					customer_group: { data: { type: 'customer_groups', id: TestData.id } },
					customer_address: { data: null },
					addresses: { data: [] }
				},
			},
			included: [{ id: TestData.id, type: 'customer_groups', attributes: { name: 'CG_Name' } }]
		}

		const expected = {
			id: TestData.id + '00',
			type: 'customers',
			email: 'customer@sdk-test.org',
			status: 'prospect',
			reference: TestData.reference,
			reference_origin: TestData.reference_origin,
			metadata: TestData.metadata,
			customer_group: { type: 'customer_groups', id: TestData.id, name: 'CG_Name' },
			customer_address: null,
			addresses: []
		}

		const denormalized = denormalize(jsonApi)

		expect(isEqual(expected, denormalized)).toBeTruthy()

	})

})
