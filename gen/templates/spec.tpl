/**
 * ©##__CURRENT_YEAR__## Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { expect, test, beforeAll, describe } from 'vitest'
import { CommerceLayerClient, ##__RESOURCE_MODEL__##, ##__IMPORT_INSTANCES__## } from '../../lib'
import { isDeepStrictEqual } from 'node:util'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('##__RESOURCE_CLASS__## resource', () => {

  const resourceType = '##__RESOURCE_TYPE__##'
  const resourcePath = '##__RESOURCE_PATH__##'


  /* spec.create.start */
  test(resourceType + '.create', async () => {

    const createAttributes = ##__RESOURCE_ATTRIBUTES_CREATE__##
    const attributes = { ...createAttributes, reference: TestData.reference }
    const params = { fields: { [resourceType]: CommonData.paramsFields } }
    const resData = attributes

    cl.addRequestInterceptor((request) => {
      const data = JSON.parse(String(request.options.body))
      expect(request.options.method).toBe('POST')
      checkCommon(request, resourcePath)
      checkCommonData(data, resourceType, attributes)
      expect(##__RESOURCE_PATH__##.is##__RESOURCE_MODEL__##(data.data)).toBeTruthy()
      return interceptRequest()
    })

    await ##__RESOURCE_PATH__##.create(resData, params, CommonData.options)
      .then((res: ##__RESOURCE_MODEL__##) =>  expect(res).not.toBeNull())
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

    await ##__RESOURCE_PATH__##.retrieve(id, params, CommonData.options)
      .then((res: ##__RESOURCE_MODEL__##) =>  expect(res).not.toBeNull())
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

    await ##__RESOURCE_PATH__##.update(resData, params, CommonData.options)
      .then((res: ##__RESOURCE_MODEL__##) =>  expect(res).not.toBeNull())
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

    await ##__RESOURCE_PATH__##.delete(id, CommonData.options)
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

    await ##__RESOURCE_PATH__##.list(params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
    
  })
  /* spec.list.stop */


  /* spec.singleton.start */
  test(resourceType + '.singleton', async () => {

    const params = { fields: { [resourceType]: CommonData.paramsFields } }

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourcePath)
      checkCommonParams(request, params)
      return interceptRequest()
    })

    await ##__RESOURCE_PATH__##.retrieve(params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
    
  })
  /* spec.singleton.stop */


  /* spec.type.start */
  test(resourceType + '.type', async () => {

    const resource = { id: TestData.id, type: resourceType }
    expect(##__RESOURCE_PATH__##.is##__RESOURCE_MODEL__##(resource)).toBeTruthy()

    const type = ##__RESOURCE_PATH__##.type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
  test(resourceType + '.relationship', async () => {

    const relId = ##__RESOURCE_PATH__##.relationship(TestData.id)
    expect(isDeepStrictEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = ##__RESOURCE_PATH__##.relationship({ id: TestData.id, type: resourceType })
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

    const res = ##__RESOURCE_PATH__##.parse(payload) as ##__RESOURCE_MODEL__##

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  */
  /* spec.parse.stop */


  /* spec.instance start */
	test(resourceType + '.instance', async () => {
    expect(##__RESOURCE_INSTANCE__##)
		expect(##__RESOURCE_INSTANCE__##.type()).toBe(resourceType)
	})
	/* spec.instance stop */

  ##__RELATIONSHIP_SPECS__##
  ##__TRIGGER_SPECS__##
})
