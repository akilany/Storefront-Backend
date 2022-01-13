import { UserStore } from '../../models/userModel'

const store = new UserStore()

describe('User Model', () => {
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
  it('should have an update password method', () => {
    expect(store.updatePassword).toBeDefined()
  })
  it('should have an authuntication method', () => {
    expect(store.auth).toBeDefined()
  })
  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result).toEqual([])
  })

  it('create method should add a user', async () => {
    const result = await store.create({
      first_name: 'first',
      last_name: 'last',
      email: 'test@ex.com',
      password: '12345',
    })
    expect(result).toEqual({
      id: 1,
      first_name: 'first',
      last_name: 'last',
      email: 'test@ex.com',
    })
  })

  it('show method should return the correct user', async () => {
    const result = await store.show(1)
    expect(result).toEqual({
      id: 1,
      first_name: 'first',
      last_name: 'last',
      email: 'test@ex.com',
      password: result.password,
    })
  })

  // it('user orders method should return user orders', async () => {
  //   const result = await store.userOrders(1)
  //   expect(result).toEqual([])
  // })

  it('auth method should return user', async () => {
    const result = await store.auth('test@ex.com', '12345')
    expect(result).toEqual({
      id: 1,
      first_name: 'first',
      last_name: 'last',
      email: 'test@ex.com',
      password: undefined,
    })
  })

  it('update method should update a user fisrtname, lastname and email', async () => {
    const result = await store.update(1, {
      first_name: 'first',
      last_name: 'last',
      email: 'test-update@ex.com',
    })
    expect(result).toEqual({
      id: 1,
      first_name: 'first',
      last_name: 'last',
      email: 'test-update@ex.com',
    })
  })

  it('update password method should change current password', async () => {
    const result = await store.updatePassword(1, '12345', '123456')
    expect(result).toEqual({
      id: 1,
      first_name: 'first',
      last_name: 'last',
      email: 'test-update@ex.com',
    })
  })

  it('delete method should remove the user', async () => {
    await store.delete(1)
    const result = await store.index()

    expect(result).toEqual([])
  })
})
