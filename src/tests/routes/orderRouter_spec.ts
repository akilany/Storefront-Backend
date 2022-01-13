import supertest from 'supertest'
import client from '../../database'
import app from '../../server'

const req = supertest(app)

describe('Orders endpoints responses', () => {
  const url: string = '/api/orders'
  let token: string
  let userID: string | number
  let orderID: string | number
  beforeAll(async () => {
    const body = {
      first_name: 'order',
      last_name: 'test',
      email: 'order_test@example.com',
      password: '12345',
    }
    const res = await req.post('/api/users/signup').send(body)
    token = res.body.token
    userID = res.body.data.user.id
  })

  afterAll(async () => {
    const connection = await client.connect()
    const sql =
      'DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1; DELETE FROM products;'
    await connection.query(sql)
    connection.release()
  })

  it('gets all orders endpoint', async () => {
    const res = await req.get(`${url}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('creates one order endpoint', async () => {
    const body = {
      status: 'active',
      user_id: `${userID}`,
    }
    const res = await req
      .post(`${url}`)
      .send(body)
      .set('Authorization', `Bearer ${token}`)
    orderID = res.body.data.id
    expect(res.status).toBe(201)
  })

  it('gets one order endpoint', async () => {
    const res = await req
      .get(`${url}/${orderID}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('gets all products in order endpoint', async () => {
    const res = await req
      .get(`${url}/${orderID}/products`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('unauthorized add one product to order with invalid token', async () => {
    const body = {
      quantity: 20,
      product_id: 1,
    }
    const res = await req
      .post(`${url}/${orderID}/products`)
      .send(body)
      .set('Authorization', `Bearer InvalidToken`)
    expect(res.status).toBe(401)
  })

  it('updates one order endpoint', async () => {
    const body = {
      status: 'complete',
    }
    const res = await req
      .patch(`${url}/${orderID}`)
      .send(body)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('deletes one order endpoint', async () => {
    const res = await req
      .delete(`${url}/${orderID}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })
})
