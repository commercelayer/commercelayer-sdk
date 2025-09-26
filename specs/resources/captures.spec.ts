/**
 * ©2025 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { expect, test, beforeAll, describe } from 'vitest'
import { CommerceLayerClient, Capture, captures } from '../../lib'
import { isDeepStrictEqual } from 'node:util'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('Captures resource', () => {

  const resourceType = 'captures'
  const resourcePath = 'captures'


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

    await captures.retrieve(id, params, CommonData.options)
      .then((res: Capture) =>  expect(res).not.toBeNull())
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

    await captures.update(resData, params, CommonData.options)
      .then((res: Capture) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.update.stop */


  /* spec.list.start */
  test(resourceType + '.list', async () => {

    const params = CommonData.paramsList

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourcePath)
      checkCommonParamsList(request, params)
      return interceptRequest()
    })

    await captures.list(params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
    
  })
  /* spec.list.stop */


  /* spec.type.start */
  test(resourceType + '.type', async () => {

    const resource = { id: TestData.id, type: resourceType }
    expect(captures.isCapture(resource)).toBeTruthy()

    const type = captures.type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
  test(resourceType + '.relationship', async () => {

    const relId = captures.relationship(TestData.id)
    expect(isDeepStrictEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = captures.relationship({ id: TestData.id, type: resourceType })
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

    const res = captures.parse(payload) as Capture

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  */
  /* spec.parse.stop */


  /* spec.instance start */
	test(resourceType + '.instance', async () => {
    expect(captures)
		expect(captures.type()).toBe(resourceType)
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
	
		await captures.order(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.order stop */
	

	
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
	
		await captures.attachments(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.attachments stop */
	

	
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
	
		await captures.events(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.events stop */
	

	
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
	
		await captures.versions(id, params, CommonData.options)
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
	
		await captures.event_stores(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.event_stores stop */
	

	
	/* relationship.reference_authorization start */
	test(resourceType + '.reference_authorization', async () => {
	
		const id = TestData.id
		const params = { fields: { authorizations: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'reference_authorization')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await captures.reference_authorization(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.reference_authorization stop */
	

	
	/* relationship.refunds start */
	test(resourceType + '.refunds', async () => {
	
		const id = TestData.id
		const params = { fields: { refunds: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'refunds')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await captures.refunds(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.refunds stop */
	

	
	/* relationship.return start */
	test(resourceType + '.return', async () => {
	
		const id = TestData.id
		const params = { fields: { returns: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'return')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await captures.return(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.return stop */
	
  

	
	/* trigger._forward start */
	test(resourceType + '._forward', async () => {
	
		let triggerAttr = '_forward'
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
	
		await captures._forward(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._forward stop */
	

	
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
	
		await captures._refund(id, {}, CommonData.options)
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
	
		await captures._refund_amount_cents(id, triggerValue, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._refund_amount_cents stop */
	

	
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
	
		await captures._cancel(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._cancel stop */
	
})
