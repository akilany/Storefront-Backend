import supertest from 'supertest'
import client from '../../database'
import app from '../../server'

const req = supertest(app)

describe('Products endpoints responses', () => {
  const url: string = '/api/products'
  let token: string
  let productID: string | number
  beforeAll(async () => {
    const body = {
      first_name: 'product',
      last_name: 'test',
      email: 'product_test@example.com',
      password: '12345',
    }
    const res = await req.post('/api/users/signup').send(body)
    token = res.body.token
  })

  afterAll(async () => {
    const connection = await client.connect()
    const sql =
      'DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1; DELETE FROM products;'
    await connection.query(sql)
    connection.release()
  })

  it('gets all products endpoint', async () => {
    const res = await req.get(`${url}`)
    expect(res.status).toBe(200)
  })

  it('creates one product endpoint', async () => {
    const body = {
      name: 'product',
      price: 400,
      category: 'test',
    }
    const res = await req
      .post(`${url}`)
      .send(body)
      .set('Authorization', `Bearer ${token}`)
    productID = res.body.data.id
    expect(res.status).toBe(201)
  })

  it('gets all products by category endpoint', async () => {
    const res = await req.get(`${url}/category/test`)
    expect(res.status).toBe(200)
  })

  it('gets one product endpoint', async () => {
    const res = await req.get(`${url}/${productID}`)
    expect(res.status).toBe(200)
  })

  it('updates one product endpoint', async () => {
    const body = {
      name: 'product update',
      price: 400,
      category: 'test',
    }
    const res = await req
      .patch(`${url}/${productID}`)
      .send(body)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('deletes one product endpoint', async () => {
    const res = await req
      .delete(`${url}/${productID}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })
})
