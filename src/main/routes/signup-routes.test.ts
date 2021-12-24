import request from 'supertest'
import app from '../config/app'

describe('Sigup routes', () => {
  test('Should return an accoutn on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'victor',
        email: 'victor@email.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
