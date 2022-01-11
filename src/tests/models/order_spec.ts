import { OrderStore } from '../../models/orderModel'
import { UserStore } from '../../models/userModel'

const store = new OrderStore()

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })
  it('should have an show method', () => {
    expect(store.show).toBeDefined()
  })
  it('should have an create method', () => {
    expect(store.create).toBeDefined()
  })
  it('should have an delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('index method should return a list of orders', async () => {
    const result = await store.index()
    expect(result).toEqual([])
  })

  //   it('create method should add an order', async () => {
  //     const user = await new UserStore().create({
  //       name: 'test',
  //       email: 'test@example.com',
  //       password: '1',
  //     })
  //     const result = await store.create({
  //       status: 'active',
  //       //@ts-ignore
  //       user_id: user.id,
  //     })
  //     expect(result).toEqual({
  //       id: 1,
  //       status: 'active',
  //       //@ts-ignore
  //       user_id: user.id,
  //     })
  //   })

  //   it('show method should return the correct order', async () => {
  //     const user = await new UserStore().create({
  //       name: 'test',
  //       email: 'test@example.com',
  //       password: '1',
  //     })
  //     const result = await store.show(1)
  //     expect(result).toEqual({
  //       id: 1,
  //       status: 'active',
  //       //@ts-ignore
  //       user_id: user.id,
  //     })
  //   })

  //   it('delete method should remove the order', async () => {
  //     await store.delete(1)
  //     const result = await store.index()

  //     expect(result).toEqual([])
  //   })
})
