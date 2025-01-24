
import { CommerceLayerClient } from '../src'
import { getClient, TestData } from '../test/common'
import { normalize, denormalize } from '../src/jsonapi'
import { ResourceTypeLock } from '../src/api'
import { isDeepStrictEqual } from 'node:util'


let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('SDK:jsonapi suite', () => {

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
			customer_subscriptions: cl.customer_subscriptions.relationship(null)
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
				},
				customer_subscriptions: {
					data: null
				}
			}
		}

		const normalized = normalize(resource)

		expect(isDeepStrictEqual(normalized, expected)).toBeTruthy()

	})


	it('jsonapi.denormalize', async () => {

		const jsonApi = {
			data: {
				id: TestData.id + '00',
				type: 'customers',
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
					addresses: { data: [] },
					customer_subscriptions: { data: null }
				},
			},
			included: [{ id: TestData.id, type: 'customer_groups', attributes: { name: 'CG_Name' } }],
			links: { self: 'link' },
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
			addresses: [],
			customer_subscriptions: null,
		}

		const denormalized = denormalize(jsonApi)

		expect(isDeepStrictEqual(expected, denormalized)).toBeTruthy()

	})

})
