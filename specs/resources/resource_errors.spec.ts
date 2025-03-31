/**
 * ©2025 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen
 **/

import { expect, test, beforeAll, describe } from 'vitest'
import { CommerceLayerClient, ResourceError, resource_errors } from '../../lib'
import { isDeepStrictEqual } from 'node:util'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getClient, TestData, CommonData, handleError, interceptRequest, checkCommon, checkCommonData, checkCommonParamsList, checkCommonParams, currentAccessToken, randomValue } from '../../test/common'



let cl: CommerceLayerClient


beforeAll(async () => { cl = await getClient() })


describe('ResourceErrors resource', () => {

  const resourceType = 'resource_errors'
  const resourcePath = 'resource_errors'


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

    await resource_errors.retrieve(id, params, CommonData.options)
      .then((res: ResourceError) =>  expect(res).not.toBeNull())
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))

  })
  /* spec.retrieve.stop */


  /* spec.list.start */
  test(resourceType + '.list', async () => {

    const params = CommonData.paramsList

    cl.addRequestInterceptor((request) => {
      expect(request.options.method).toBe('GET')
      checkCommon(request, resourcePath)
      checkCommonParamsList(request, params)
      return interceptRequest()
    })

    await resource_errors.list(params, CommonData.options)
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
    
  })
  /* spec.list.stop */


  /* spec.type.start */
  test(resourceType + '.type', async () => {

    const resource = { id: TestData.id, type: resourceType }
    expect(resource_errors.isResourceError(resource)).toBeTruthy()

    const type = resource_errors.type()
    expect(type).toBe(resourceType)

  })
  /* spec.type.stop */


  /* spec.relationship.start */
  test(resourceType + '.relationship', async () => {

    const relId = resource_errors.relationship(TestData.id)
    expect(isDeepStrictEqual(relId, { id: TestData.id, type: resourceType}))

    const relResId = resource_errors.relationship({ id: TestData.id, type: resourceType })
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

    const res = resource_errors.parse(payload) as ResourceError

    expect(res.type).toBe(resourceType)
    expect(res.reference).toBe(reference)

  })
  */
  /* spec.parse.stop */


  /* spec.instance start */
	test(resourceType + '.instance', async () => {
    expect(resource_errors)
		expect(resource_errors.type()).toBe(resourceType)
	})
	/* spec.instance stop */

  
  
})
