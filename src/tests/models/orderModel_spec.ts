import client from '../../database'
import { OrderStore } from '../../models/orderModel'
import { UserStore } from '../../models/userModel'

const store = new OrderStore()

describe('Order Model', () => {
  let userID: string
  beforeAll(async () => {
    const user = await new UserStore().create({
      first_name: 'John',
      last_name: 'test',
      email: 'test@ex.co',
      password: '12345',
    })
    userID = user.id as string
  })

  afterAll(async () => {
    const connection = await client.connect()
    const sql =
      'DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1; DELETE FROM products;'
    await connection.query(sql)
    connection.release()
  })

  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })
  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })
  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })
  it('should have an update method', () => {
    expect(store.update).toBeDefined()
  })
  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('index method should return a list of orders', async () => {
    const result = await store.index()
    expect(result).toEqual([])
  })

  it('create method should add an order', async () => {
    const result = await store.create({
      status: 'active',
      user_id: userID,
    })
    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_id: `${userID}`,
    })
  })

  it('show method should return the correct order', async () => {
    const result = await store.show(1)
    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_id: `${userID}`,
    })
  })

  it('update method should update order status', async () => {
    const result = await store.update(1, {
      status: 'complete',
      user_id: userID,
    })
    expect(result).toEqual({
      id: 1,
      status: 'complete',
      user_id: `${userID}`,
    })
  })

  it('delete method should remove the order', async () => {
    await store.delete(1)
    const result = await store.index()

    expect(result).toEqual([])
  })
})
