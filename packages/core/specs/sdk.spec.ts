import { isResourceType } from '@runtime/resource'
import type { ObjectType } from '@runtime/types'
import { sleep, sortObjectFields } from '@runtime/util'
import { beforeAll, describe, expect, test } from 'vitest'
import { type CommerceLayerSingleClient, type Customer, customers } from '../src/single-client'
import { checkParam, getClient, handleError, interceptRequest, TestData } from '../test/common'

let cl: CommerceLayerSingleClient

beforeAll(async () => {
  cl = await getClient()
  const _version = cl.apiSchemaVersion // avoid not used var issue
})

describe('SDK suite', () => {
  test('util.sleep', async () => {
    const ms = 2000

    const start = Date.now()
    await sleep(ms)
    const stop = Date.now()

    const delay = stop - start

    expect(delay).toBeGreaterThanOrEqual(ms - 10)
    expect(delay).toBeLessThan(ms + 50)
  })

  test('util.sortObjectFields', async () => {
    const obj: ObjectType = {
      beta: 'beta',
      delta: 'delta',
      alfa: 'alfa',
      gamma: 'gamma',
    }

    const exp: ObjectType = {
      alfa: 'alfa',
      beta: 'beta',
      gamma: 'gamma',
      delta: 'delta',
    }

    const sorted = sortObjectFields(obj)

    expect(sorted).toEqual(exp)
  })

  test('common.type', async () => {
    const customer: Customer = {
      id: TestData.id,
      type: 'customers',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      email: 'user@test.org',
      status: 'prospect',
    }

    expect(isResourceType(customer)).toBeTruthy()
  })

  test('loadBalancer.optimization', async () => {
    const cl = await getClient()

    cl.addRequestInterceptor((request) => {
      const url = new URL(request.url)
      checkParam(url, 'page[number]', 1)
      return interceptRequest()
    })

    await customers
      .list({})
      .catch(handleError)
      .finally(() => cl.removeInterceptor('request'))
  })

  /*
	test('sdk.version', async () => {

		const cl = await getClient()

    const sdkVersion = cl.version
		const staticVersion = CommerceLayerStatic.sdkVersion

		const pkgJson = readFileSync(resolve('.', 'package.json'), { encoding: 'utf-8' })
		const pkg = JSON.parse(pkgJson)
		const packageVersion = pkg.version

		expect(packageVersion).not.toBeUndefined()
		expect(sdkVersion).toBe(packageVersion)
		expect(staticVersion).toBe(packageVersion)
    
  })
		*/
})
