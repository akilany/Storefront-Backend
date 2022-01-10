import { ProductStore } from '../../models/productModel'

const store = new ProductStore()

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })
  it('should have an show method', () => {
    expect(store.show).toBeDefined()
  })
  it('should have an create method', () => {
    expect(store.create).toBeDefined()
  })
  it('should have an update method', () => {
    expect(store.update).toBeDefined()
  })
  it('should have an delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('index method should return a list of products', async () => {
    const result = await store.index()
    expect(result).toEqual([])
  })

  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'test product',
      price: 499,
      category: 'test',
    })
    expect(result).toEqual({
      id: 1,
      name: 'test product',
      //@ts-ignore
      price: '499',
      category: 'test',
    })
  })

  //   it('update method should update a user name and email', async () => {
  //     const result = await store.create({
  //       name: 'test user update',
  //       email: 'test-update@ex.com',
  //     })
  //     expect(result).toEqual({
  //       id: result.id,
  //       name: 'test user update',
  //       email: 'test-update@ex.com',
  //       password: result.password,
  //     })
  //   })

  it('show method should return the correct product', async () => {
    const result = await store.show(1)
    expect(result).toEqual({
      id: 1,
      name: 'test product',
      //@ts-ignore
      price: '499',
      category: 'test',
    })
  })

  it('delete method should remove the product', async () => {
    await store.delete(1)
    const result = await store.index()

    expect(result).toEqual([])
  })
})
