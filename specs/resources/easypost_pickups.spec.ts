/**
 * ©2025 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

<<<<<<< HEAD
import { expect, test, beforeAll, describe } from 'vitest'
import { CommerceLayerClient, EasypostPickup, easypost_pickups } from '../../src'
=======
import { CommerceLayerClient, EasypostPickup } from '../../src'
>>>>>>> main
import { isDeepStrictEqual } from 'node:util'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('EasypostPickups resource', () => {

  const resourceType = 'easypost_pickups'
  const resourcePath = 'easypost_pickups'


  /* spec.create.start */
<<<<<<< HEAD
  test(resourceType + '.create', async () => {
=======
  it(resourceType + '.create', async () => {
>>>>>>> main

    const createAttributes = {
			min_datetime: randomValue('string', 'min_datetime'),
			max_datetime: randomValue('string', 'max_datetime'),
			shipment: cl.shipments.relationship(TestData.id),
		}

    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    cl.addRequestInterceptor((request) => {
      const data = JSON.parse(String(request.options.body))
      expect(request.options.method).toBe('POST')
      checkCommon(request, resourcePath)
      checkCommonData(data, resourceType, attributes)
      expect(cl[resourcePath].isEasypostPickup(data.data)).toBeTruthy()
      return interceptRequest()
    })

    await cl[resourcePath].create(resData, params, CommonData.options)
      .then((res: EasypostPickup) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.create.stop */


  /* spec.retrieve.start */
<<<<<<< HEAD
  test(resourceType + '.retrieve', async () => {
=======
  it(resourceType + '.retrieve', async () => {
>>>>>>> main

    const id = TestData.id
    const params = { fields: {[resourceType]: CommonData.paramsFields } }

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourcePath, id, currentAccessToken)
      checkCommonParams(request, params)
      return interceptRequest()
    })

    await cl[resourcePath].retrieve(id, params, CommonData.options)
      .then((res: EasypostPickup) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.retrieve.stop */


  /* spec.update.start */
<<<<<<< HEAD
  test(resourceType + '.update', async () => {
=======
  it(resourceType + '.update', async () => {
>>>>>>> main

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

    await cl[resourcePath].update(resData, params, CommonData.options)
      .then((res: EasypostPickup) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.update.stop */


  /* spec.delete.start */
<<<<<<< HEAD
  test(resourceType + '.delete', async () => {
=======
  it(resourceType + '.delete', async () => {
>>>>>>> main

    const id = TestData.id

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('DELETE')
      checkCommon(request, resourcePath, id, currentAccessToken)
      return interceptRequest()
    })

    await cl[resourcePath].delete(id, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.delete.stop */


  /* spec.list.start */
<<<<<<< HEAD
  test(resourceType + '.list', async () => {
=======
  it(resourceType + '.list', async () => {
>>>>>>> main

    const params = CommonData.paramsList

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourcePath)
      checkCommonParamsList(request, params)
      return interceptRequest()
    })

    await cl[resourcePath].list(params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
    
  })
  /* spec.list.stop */


  /* spec.type.start */
<<<<<<< HEAD
  test(resourceType + '.type', async () => {
=======
  it(resourceType + '.type', async () => {
>>>>>>> main

    const resource = { id: TestData.id, type: resourceType }
    expect(cl[resourcePath].isEasypostPickup(resource)).toBeTruthy()

    const type = cl[resourcePath].type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
<<<<<<< HEAD
  test(resourceType + '.relationship', async () => {
=======
  it(resourceType + '.relationship', async () => {
>>>>>>> main

    const relId = cl[resourcePath].relationship(TestData.id)
    expect(isDeepStrictEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = cl[resourcePath].relationship({ id: TestData.id, type: resourceType })
    expect(isDeepStrictEqual(relResId, { id: TestData.id, type: resourceType}))

  })
  /* spec.relationship.stop */


  /* spec.parse.start */
  /*
<<<<<<< HEAD
  test(resourceType + '.parse', async () => {
=======
  it(resourceType + '.parse', async () => {
>>>>>>> main

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

    const res = cl[resourcePath].parse(payload) as EasypostPickup

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  */
  /* spec.parse.stop */

<<<<<<< HEAD

  /* spec.instance start */
	test(resourceType + '.instance', async () => {
    expect(easypost_pickups)
		expect(easypost_pickups.type()).toBe(resourceType)
	})
	/* spec.instance stop */

  

	
	/* relationship.shipment start */
	test(resourceType + '.shipment', async () => {
=======
  

	/* relationship.shipment start */
	it(resourceType + '.shipment', async () => {
>>>>>>> main
	
		const id = TestData.id
		const params = { fields: { shipments: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'shipment')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].shipment(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.shipment stop */
	

<<<<<<< HEAD
	
	/* relationship.parcels start */
	test(resourceType + '.parcels', async () => {
=======
	/* relationship.parcels start */
	it(resourceType + '.parcels', async () => {
>>>>>>> main
	
		const id = TestData.id
		const params = { fields: { parcels: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'parcels')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].parcels(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.parcels stop */
	

<<<<<<< HEAD
	
	/* relationship.events start */
	test(resourceType + '.events', async () => {
=======
	/* relationship.events start */
	it(resourceType + '.events', async () => {
>>>>>>> main
	
		const id = TestData.id
		const params = { fields: { events: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'events')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourcePath].events(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.events stop */
	
  

<<<<<<< HEAD
	
	/* trigger._purchase start */
	test(resourceType + '._purchase', async () => {
=======
	/* trigger._purchase start */
	it(resourceType + '._purchase', async () => {
>>>>>>> main
	
		let triggerAttr = '_purchase'
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
	
		await cl[resourcePath]._purchase(id, {}, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* trigger._purchase stop */
	
})
