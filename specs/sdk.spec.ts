
import { sleep } from '../src/util'

describe('SDK suite', () => {
  
	it('util.sleep', async () => {
  
		const ms = 2000

		const start = Date.now()
		await sleep(ms)
		const stop = Date.now()

		const delay = stop - start

		expect(delay).toBeGreaterThanOrEqual(ms)
		expect(delay).toBeLessThan(ms + 10)

	})

})
