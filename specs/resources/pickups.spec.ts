/**
 * ©2025 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

<<<<<<< HEAD
import { expect, test, beforeAll, describe } from 'vitest'
import { CommerceLayerClient, Pickup, pickups } from '../../src'
=======
import { CommerceLayerClient, Pickup } from '../../src'
>>>>>>> main
import { isDeepStrictEqual } from 'node:util'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('Pickups resource', () => {

  const resourceType = 'pickups'
  const resourcePath = 'pickups'


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
      .then((res: Pickup) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.retrieve.stop */


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
    expect(cl[resourcePath].isPickup(resource)).toBeTruthy()

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

    const res = cl[resourcePath].parse(payload) as Pickup

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  */
  /* spec.parse.stop */

<<<<<<< HEAD

  /* spec.instance start */
	test(resourceType + '.instance', async () => {
    expect(pickups)
		expect(pickups.type()).toBe(resourceType)
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
	
  
})
