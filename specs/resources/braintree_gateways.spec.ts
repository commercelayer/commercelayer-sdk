/**
 * ©2025 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { expect, test, beforeAll, describe } from 'vitest'
import { CommerceLayerClient, BraintreeGateway, braintree_gateways, braintree_payments } from '../../lib'
import { isDeepStrictEqual } from 'node:util'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('BraintreeGateways resource', () => {

  const resourceType = 'braintree_gateways'
  const resourcePath = 'braintree_gateways'


  /* spec.create.start */
  test(resourceType + '.create', async () => {

    const createAttributes = {
			name: randomValue('string', 'name'),
			merchant_account_id: randomValue('string', 'merchant_account_id'),
			merchant_id: randomValue('string', 'merchant_id'),
			public_key: randomValue('string', 'public_key'),
			private_key: randomValue('string', 'private_key'),
			braintree_payments: [ braintree_payments.relationship(TestData.id) ],
		}

    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    cl.addRequestInterceptor((request) => {
      const data = JSON.parse(String(request.options.body))
      expect(request.options.method).toBe('POST')
      checkCommon(request, resourcePath)
      checkCommonData(data, resourceType, attributes)
      expect(braintree_gateways.isBraintreeGateway(data.data)).toBeTruthy()
      return interceptRequest()
    })

    await braintree_gateways.create(resData, params, CommonData.options)
      .then((res: BraintreeGateway) =>  expect(res).not.toBeNull())
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

    await braintree_gateways.retrieve(id, params, CommonData.options)
      .then((res: BraintreeGateway) =>  expect(res).not.toBeNull())
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

    await braintree_gateways.update(resData, params, CommonData.options)
      .then((res: BraintreeGateway) =>  expect(res).not.toBeNull())
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

    await braintree_gateways.delete(id, CommonData.options)
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

    await braintree_gateways.list(params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
    
  })
  /* spec.list.stop */


  /* spec.type.start */
  test(resourceType + '.type', async () => {

    const resource = { id: TestData.id, type: resourceType }
    expect(braintree_gateways.isBraintreeGateway(resource)).toBeTruthy()

    const type = braintree_gateways.type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
  test(resourceType + '.relationship', async () => {

    const relId = braintree_gateways.relationship(TestData.id)
    expect(isDeepStrictEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = braintree_gateways.relationship({ id: TestData.id, type: resourceType })
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

    const res = braintree_gateways.parse(payload) as BraintreeGateway

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  */
  /* spec.parse.stop */


  /* spec.instance start */
	test(resourceType + '.instance', async () => {
    expect(braintree_gateways)
		expect(braintree_gateways.type()).toBe(resourceType)
	})
	/* spec.instance stop */

  

	
	/* relationship.payment_methods start */
	test(resourceType + '.payment_methods', async () => {
	
		const id = TestData.id
		const params = { fields: { payment_methods: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'payment_methods')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await braintree_gateways.payment_methods(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.payment_methods stop */
	

	
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
	
		await braintree_gateways.versions(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.versions stop */
	

	
	/* relationship.braintree_payments start */
	test(resourceType + '.braintree_payments', async () => {
	
		const id = TestData.id
		const params = { fields: { braintree_payments: CommonData.paramsFields } }
	
		const intId = cl.addRequestInterceptor((request) => {
			expect(request.options.method).toBe('GET')
			checkCommon(request, resourcePath, id, currentAccessToken, 'braintree_payments')
			checkCommonParams(request, params)
			return interceptRequest()
		})
	
		await braintree_gateways.braintree_payments(id, params, CommonData.options)
			.catch(handleError)
			.finally(() => cl.removeInterceptor('request'))
	
	})
	/* relationship.braintree_payments stop */
	
  
})
