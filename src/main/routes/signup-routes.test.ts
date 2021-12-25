import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Sigup routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

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
