/**
 * ©2024 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { CommerceLayerClient, PaypalPayment } from '../../src'
import { isEqual } from 'lodash'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('PaypalPayments resource', () => {

  const resourceType = 'paypal_payments'


  /* spec.create.start */
  it(resourceType + '.create', async () => {

    const createAttributes = {
			return_url: randomValue('string', 'return_url'),
			cancel_url: randomValue('string', 'cancel_url'),
			order: cl.orders.relationship(TestData.id),
		}

    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    cl.addRequestInterceptor((request) => {
      const data = JSON.parse(String(request.options.body))
      expect(request.options.method).toBe('POST')
      checkCommon(request, resourceType)
      checkCommonData(data, resourceType, attributes)
      expect(cl[resourceType].isPaypalPayment(data.data)).toBeTruthy()
      return interceptRequest()
    })

    await cl[resourceType].create(resData, params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.create.stop */


  /* spec.retrieve.start */
  it(resourceType + '.retrieve', async () => {

    const id = TestData.id
    const params = { fields: {[resourceType]: CommonData.paramsFields } }

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourceType, id, currentAccessToken)
      checkCommonParams(request, params)
      return interceptRequest()
    })

    await cl[resourceType].retrieve(id, params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.retrieve.stop */


  /* spec.update.start */
  it(resourceType + '.update', async () => {

    const attributes = { reference_origin: TestData.reference_origin, metadata: TestData.metadata }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = { id: TestData.id, ...attributes}

    cl.addRequestInterceptor((request) => {
      const data = JSON.parse(String(request.options.body))
      expect(request.options.method).toBe('PATCH')
      checkCommon(request, resourceType, resData.id, currentAccessToken)
      checkCommonData(data, resourceType, attributes, resData.id)
      return interceptRequest()
    })

    await cl[resourceType].update(resData, params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.update.stop */


  /* spec.delete.start */
  it(resourceType + '.delete', async () => {

    const id = TestData.id

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('DELETE')
      checkCommon(request, resourceType, id, currentAccessToken)
      return interceptRequest()
    })

    await cl[resourceType].delete(id, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.delete.stop */


  /* spec.list.start */
  it(resourceType + '.list', async () => {

    const params = CommonData.paramsList

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourceType)
      checkCommonParamsList(request, params)
      return interceptRequest()
    })

    await cl[resourceType].list(params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
    
  })
  /* spec.list.stop */


  /* spec.type.start */
  it(resourceType + '.type', async () => {

    const resource = { id: TestData.id, type: resourceType }
    expect(cl[resourceType].isPaypalPayment(resource)).toBeTruthy()

    const type = cl[resourceType].type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
  it(resourceType + '.relationship', async () => {

    const relId = cl[resourceType].relationship(TestData.id)
    expect(isEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = cl[resourceType].relationship({ id: TestData.id, type: resourceType })
    expect(isEqual(relResId, { id: TestData.id, type: resourceType}))

  })
  /* spec.relationship.stop */


  /* spec.parse.start */
  /*
  it(resourceType + '.parse', async () => {

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

    const res = cl[resourceType].parse(payload) as PaypalPayment

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  */
  /* spec.parse.stop */

  

	/* relationship.order start */
	it(resourceType + '.order', async () => {
	
		const id = TestData.id
		const params = { fields: { orders: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourceType, id, currentAccessToken, 'order')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourceType].order(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.order stop */
	

	/* relationship.payment_gateway start */
	it(resourceType + '.payment_gateway', async () => {
	
		const id = TestData.id
		const params = { fields: { payment_gateways: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourceType, id, currentAccessToken, 'payment_gateway')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourceType].payment_gateway(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.payment_gateway stop */
	

	/* relationship.versions start */
	it(resourceType + '.versions', async () => {
	
		const id = TestData.id
		const params = { fields: { versions: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourceType, id, currentAccessToken, 'versions')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await cl[resourceType].versions(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.versions stop */
	
  
})
