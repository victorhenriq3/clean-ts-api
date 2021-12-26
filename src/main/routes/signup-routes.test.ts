import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountCollection: Collection

describe('Sigup routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    // jest.setTimeout(30000)
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
