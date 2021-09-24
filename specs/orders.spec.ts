/* eslint-disable no-console */
import CommerceLayer from '../lib'
import getToken from '../utils/token'
import dotenv from 'dotenv'

dotenv.config()

const organization = process.env.ORGANIZATION_SLUG as string
const domain = process.env.DOMAIN as string
let accessToken = ''
let currentOrderId = ''

describe('Orders resource', () => {
  it('orders.list', async () => {
    accessToken = (await getToken('integration')).accessToken
    const cl = CommerceLayer({
      organization,
      accessToken,
      domain
    })
    try {
      const orders = await cl.orders.list({
        fields: {
          orders: ['id']
        }
      })
      expect(orders.length).toBe(10)
      orders.map((order) => {
        expect(order).toHaveProperty('id')
      })
    } catch (err) {
      if (cl.isApiError(err)) console.log(err.errors)
    }
  })

  it('orders.create', async () => {
    const cl = CommerceLayer({
      organization,
      accessToken,
      domain
    })
    const order = await cl.orders.create({})
    expect(order).toHaveProperty('id')
    currentOrderId = order.id
  })

  it('orders.retrieve', async () => {
    const cl = CommerceLayer({
      organization,
      accessToken,
      domain
    })
    const order = await cl.orders.retrieve(currentOrderId, { fields: { orders: ['reference', 'updated_at'] } })
    expect(order).toHaveProperty('reference')
    expect(order).toHaveProperty('updated_at')
  })

  it('orders.delete', async () => {
    const cl = CommerceLayer({
      organization,
      accessToken,
      domain
    })
    const mockDelete = jest.fn(() => cl.orders.delete(currentOrderId))
    await mockDelete()
    expect(mockDelete).toHaveBeenCalled()
    expect(mockDelete).toHaveBeenCalledTimes(1)
    await cl.orders.retrieve(currentOrderId).catch((e) => {
      if (cl.isApiError(e)) expect(e.status).toBe(404)
    })
  })
})
