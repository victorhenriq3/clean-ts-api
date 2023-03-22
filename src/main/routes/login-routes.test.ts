import { Collection } from 'mongodb';
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import app from '@/main/config/app'
import {hash} from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    })

    beforeEach(async () => {
        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
        await request(app)
            .post('/api/signup')
            .send({
                name: 'Victor',
                email: 'victor@email.com',
                password: '123456',
                passwordConfirmation: '123456'
            })
            .expect(200)
        })
    })

    describe('POST /login', () => {
        test('Should return 200 on login', async () => {
            const password = await hash('123456', 12)
            await accountCollection.insertOne({
                name: 'Victor',
                email: 'victor@email.com',
                password
            })
            await request(app)
                .post('/api/login')
                .send({
                    email: 'victor@email.com',
                    password: '123456',
            })
            .expect(200)
        })
        
        test('Should return 401 with invalid credentials', async () => {
            const password = await hash('123456', 12)
            await request(app)
                .post('/api/login')
                .send({
                    email: 'victor@email.com',
                    password: '123456',
            })
            .expect(401)
        })
    })
})