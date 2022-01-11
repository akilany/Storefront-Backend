import supertest from 'supertest'
import app from '../../server'

const req = supertest(app)

const token: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImlhdCI6MTY0MTg1MDg4MywiZXhwIjoxNjQ5NjI2ODgzfQ.G-0J9wyn6AIqCsv4_rp2xWTi8vCOqy8BAx1eHc2DXTo'

const url: string = '/api/products'

describe('Order endpoints responses', () => {
  //   it('gets all products', async () => {
  //     const res = await req.post(`${url}`)
  //     expect(res.status).toBe(200)
  //   })
  //   it('gets one product', async () => {
  //     const res = await req.get(`${url}/1`)
  //     expect(res.status).toBe(200)
  //   })
  //   it('gets one user endpoint', async () => {
  //     const res = await req.get('/api/users/1')
  //     expect(res.status).toBe(200)
  //   })
  //   it('deletes one user endpoint', async () => {
  //     const res = await req
  //       .post('/api/users/1')
  //       .set('Authorization', `Bearer ${token}`)
  //     expect(res.status).toBe(200)
  //   })
})
