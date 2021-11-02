/* eslint-disable no-console */
import { inspect } from 'util'
import CommerceLayer, { RequestObj } from './src'
import axios from 'axios'


const ORGANIZATION = 'sdk-test-org'
const ACCESS_TOKEN = ''


async function test() {

	const cl = CommerceLayer({
		organization: process.env.CL_SDK_ORGANIZATION || process.env.CL_CLI_ORGANIZATION || ORGANIZATION,
		accessToken: process.env.CL_SDK_ACCESS_TOKEN || process.env.CL_CLI_ACCESS_TOKEN || ACCESS_TOKEN
	})

	const order = await cl.orders.retrieve('qnlKhWrmRZ', {include: ['market']})

	console.log(inspect(order, false, null, true))

}


test()
