/**
 * ©2025 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { expect, test, beforeAll, describe } from 'vitest'
import { CommerceLayerClient, Return, returns, orders, stock_locations, captures, tags } from '../../src'
import { isDeepStrictEqual } from 'node:util'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('Returns resource', () => {

  const resourceType = 'returns'
  const resourcePath = 'returns'


  /* spec.create.start */
  test(resourceType + '.create', async () => {

    const createAttributes = {
			order: orders.relationship(TestData.id),
			stock_location: stock_locations.relationship(TestData.id),
			reference_capture: captures.relationship(TestData.id),
			tags: [ tags.relationship(TestData.id) ],
		}

    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    cl.addRequestInterceptor((request) => {
      const data = JSON.parse(String(request.options.body))
      expect(request.options.method).toBe('POST')
      checkCommon(request, resourcePath)
      checkCommonData(data, resourceType, attributes)
      expect(returns.isReturn(data.data)).toBeTruthy()
      return interceptRequest()
    })

    await returns.create(resData, params, CommonData.options)
      .then((res: Return) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.create.stop */


  /* spec.retrieve.start */
  test(resourceType + '.retrieve', async () => {

    const id = TestData.id
    const params = { fields: {[resourceType]: CommonData.paramsFields } }

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourcePath, id, currentAccessToken)
      checkCommonParams(request, params)
      return interceptRequest()
    })

    await returns.retrieve(id, params, CommonData.options)
      .then((res: Return) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.retrieve.stop */


  /* spec.update.start */
  test(resourceType + '.update', async () => {

    const attributes = { reference_origin: TestData.reference_origin, metadata: TestData.metadata }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = { id: TestData.id, ...attributes}

    cl.addRequestInterceptor((request) => {
      const data = JSON.parse(String(request.options.body))
      expect(request.options.method).toBe('PATCH')
      checkCommon(request, resourcePath, resData.id, currentAccessToken)
      checkCommonData(data, resourceType, attributes, resData.id)
      return interceptRequest()
    })

    await returns.update(resData, params, CommonData.options)
      .then((res: Return) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.update.stop */


  /* spec.delete.start */
  test(resourceType + '.delete', async () => {

    const id = TestData.id

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('DELETE')
      checkCommon(request, resourcePath, id, currentAccessToken)
      return interceptRequest()
    })

    await returns.delete(id, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.delete.stop */


  /* spec.list.start */
  test(resourceType + '.list', async () => {

    const params = CommonData.paramsList

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourcePath)
      checkCommonParamsList(request, params)
      return interceptRequest()
    })

    await returns.list(params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
    
  })
  /* spec.list.stop */


  /* spec.type.start */
  test(resourceType + '.type', async () => {

    const resource = { id: TestData.id, type: resourceType }
    expect(returns.isReturn(resource)).toBeTruthy()

    const type = returns.type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
  test(resourceType + '.relationship', async () => {

    const relId = returns.relationship(TestData.id)
    expect(isDeepStrictEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = returns.relationship({ id: TestData.id, type: resourceType })
    expect(isDeepStrictEqual(relResId, { id: TestData.id, type: resourceType}))

  })
  /* spec.relationship.stop */


  /* spec.parse.start */
  /*
  test(resourceType + '.parse', async () => {

    const reference = 'myReferenceId'

    const payload = `
    {
	    "data": {
        "id": "AbcdEfgHiL",
        "meta": {
          "mode": "test",
          "organization_id": "myOrgId"
        },
        "type": "${resourceType}",
        "links": {
          "self": "https://sdk-test-org.commercelayer.io/api/${resourceType}/AbcdEfgHiL"
        },
        "attributes": {
          "metadata": {},
          "reference": "${reference}",
          "created_at": "2023-10-01T05:53:29.296Z",
          "updated_at": "2023-10-10T08:52:13.251Z"
        }
      }
    }
    `

    const res = returns.parse(payload) as Return

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  */
  /* spec.parse.stop */


  /* spec.instance start */
	test(resourceType + '.instance', async () => {
    expect(returns)
		expect(returns.type()).toBe(resourceType)
	})
	/* spec.instance stop */

  

	
	/* relationship.order start */
	test(resourceType + '.order', async () => {
	
		const id = TestData.id
		const params = { fields: { orders: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'order')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.order(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.order stop */
	

	
	/* relationship.customer start */
	test(resourceType + '.customer', async () => {
	
		const id = TestData.id
		const params = { fields: { customers: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'customer')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.customer(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.customer stop */
	

	
	/* relationship.stock_location start */
	test(resourceType + '.stock_location', async () => {
	
		const id = TestData.id
		const params = { fields: { stock_locations: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'stock_location')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.stock_location(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.stock_location stop */
	

	
	/* relationship.origin_address start */
	test(resourceType + '.origin_address', async () => {
	
		const id = TestData.id
		const params = { fields: { addresses: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'origin_address')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.origin_address(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.origin_address stop */
	

	
	/* relationship.destination_address start */
	test(resourceType + '.destination_address', async () => {
	
		const id = TestData.id
		const params = { fields: { addresses: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'destination_address')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.destination_address(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.destination_address stop */
	

	
	/* relationship.reference_capture start */
	test(resourceType + '.reference_capture', async () => {
	
		const id = TestData.id
		const params = { fields: { captures: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'reference_capture')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.reference_capture(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.reference_capture stop */
	

	
	/* relationship.reference_refund start */
	test(resourceType + '.reference_refund', async () => {
	
		const id = TestData.id
		const params = { fields: { refunds: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'reference_refund')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.reference_refund(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.reference_refund stop */
	

	
	/* relationship.return_line_items start */
	test(resourceType + '.return_line_items', async () => {
	
		const id = TestData.id
		const params = { fields: { return_line_items: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'return_line_items')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.return_line_items(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.return_line_items stop */
	

	
	/* relationship.attachments start */
	test(resourceType + '.attachments', async () => {
	
		const id = TestData.id
		const params = { fields: { attachments: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'attachments')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.attachments(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.attachments stop */
	

	
	/* relationship.resource_errors start */
	test(resourceType + '.resource_errors', async () => {
	
		const id = TestData.id
		const params = { fields: { resource_errors: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'resource_errors')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.resource_errors(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.resource_errors stop */
	

	
	/* relationship.events start */
	test(resourceType + '.events', async () => {
	
		const id = TestData.id
		const params = { fields: { events: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'events')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.events(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.events stop */
	

	
	/* relationship.tags start */
	test(resourceType + '.tags', async () => {
	
		const id = TestData.id
		const params = { fields: { tags: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'tags')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.tags(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.tags stop */
	

	
	/* relationship.versions start */
	test(resourceType + '.versions', async () => {
	
		const id = TestData.id
		const params = { fields: { versions: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'versions')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.versions(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.versions stop */
	

	
	/* relationship.event_stores start */
	test(resourceType + '.event_stores', async () => {
	
		const id = TestData.id
		const params = { fields: { event_stores: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'event_stores')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await returns.event_stores(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.event_stores stop */
	
  

	
	/* trigger._request start */
	test(resourceType + '._request', async () => {
	
		let triggerAttr = '_request'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await returns._request(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._request stop */
	

	
	/* trigger._approve start */
	test(resourceType + '._approve', async () => {
	
		let triggerAttr = '_approve'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await returns._approve(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._approve stop */
	

	
	/* trigger._cancel start */
	test(resourceType + '._cancel', async () => {
	
		let triggerAttr = '_cancel'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await returns._cancel(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._cancel stop */
	

	
	/* trigger._ship start */
	test(resourceType + '._ship', async () => {
	
		let triggerAttr = '_ship'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await returns._ship(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._ship stop */
	

	
	/* trigger._reject start */
	test(resourceType + '._reject', async () => {
	
		let triggerAttr = '_reject'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await returns._reject(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._reject stop */
	

	
	/* trigger._receive start */
	test(resourceType + '._receive', async () => {
	
		let triggerAttr = '_receive'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await returns._receive(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._receive stop */
	

	
	/* trigger._restock start */
	test(resourceType + '._restock', async () => {
	
		let triggerAttr = '_restock'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await returns._restock(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._restock stop */
	

	
	/* trigger._archive start */
	test(resourceType + '._archive', async () => {
	
		let triggerAttr = '_archive'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await returns._archive(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._archive stop */
	

	
	/* trigger._unarchive start */
	test(resourceType + '._unarchive', async () => {
	
		let triggerAttr = '_unarchive'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await returns._unarchive(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._unarchive stop */
	

	
	/* trigger._refund start */
	test(resourceType + '._refund', async () => {
	
		let triggerAttr = '_refund'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = true
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await returns._refund(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._refund stop */
	

	
	/* trigger._refund_amount_cents start */
	test(resourceType + '._refund_amount_cents', async () => {
	
		let triggerAttr = '_refund_amount_cents'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = randomValue('integer')
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await returns._refund_amount_cents(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._refund_amount_cents stop */
	

	
	/* trigger._add_tags start */
	test(resourceType + '._add_tags', async () => {
	
		let triggerAttr = '_add_tags'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = randomValue('string')
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await returns._add_tags(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._add_tags stop */
	

	
	/* trigger._remove_tags start */
	test(resourceType + '._remove_tags', async () => {
	
		let triggerAttr = '_remove_tags'
		if (!triggerAttr.startsWith('_')) triggerAttr = `_${triggerAttr}`
	
		const triggerValue = randomValue('string')
		const attributes = { [triggerAttr]: triggerValue }
	  const id = TestData.id
	
		const intId = cl.addRequestInterceptor((request) => {
			const data = JSON.parse(String(request.options.body))
			expect(request.options.method).toBe('PATCH')
			checkCommon(request, resourcePath, id, currentAccessToken)
			checkCommonData(data, resourceType, attributes, id)
			return interceptRequest()
		})
	
		await returns._remove_tags(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._remove_tags stop */
	
})
