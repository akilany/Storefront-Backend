import supertest from 'supertest'
import app from '../../server'

const req = supertest(app)

describe('Users endpoints responses', () => {
  let token: string
  let userID: string | number
  it('sign up user endpoint', async () => {
    const body = {
      first_name: 'first',
      last_name: 'last',
      email: 'test@example.com',
      password: '12345',
    }
    const res = await req.post('/api/users/signup').send(body)
    expect(res.status).toBe(201)
  })

  it('login user endpoint', async () => {
    const body = {
      email: 'test@example.com',
      password: '12345',
    }
    const res = await req.post('/api/users/login').send(body)
    token = res.body.token
    userID = res.body.data.user.id
    expect(res.status).toBe(200)
  })

  it('unauthorized create new user with invalid token', async () => {
    const body = {
      first_name: 'invalid',
      last_name: 'invalid',
      email: 'invalid',
      password: 'invalid',
    }
    const res = await req
      .post('/api/users')
      .send(body)
      .set('Authorization', `Bearer InvalidToken`)
    expect(res.status).toBe(401)
  })

  it('gets a list of users endpoint', async () => {
    const res = await req
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('gets one user endpoint', async () => {
    const res = await req
      .get(`/api/users/${userID}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('gets user orders endpoint', async () => {
    const res = await req
      .get(`/api/users/${userID}/orders/active`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('updates one user endpoint', async () => {
    const body = {
      first_name: 'first update',
      last_name: 'last',
      email: 'test@example.com',
    }
    const res = await req
      .patch(`/api/users/${userID}`)
      .send(body)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('changes user password endpoint', async () => {
    const body = {
      oldPassword: '12345',
      newPassword: '123456',
      newPasswordConfirm: '123456',
    }
    const res = await req
      .patch(`/api/users/${userID}/change-password`)
      .send(body)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('deletes one user endpoint', async () => {
    const res = await req
      .delete(`/api/users/${userID}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })
})
