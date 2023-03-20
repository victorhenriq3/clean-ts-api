import { Collection } from 'mongodb';
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app'
import {sign} from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    })

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})
        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    describe('POST /surveys', () => {
        test('Should return 403 on AddSurvey without accessToken', async () => {
        await request(app)
            .post('/api/surveys')
            .send({
               question: 'Question',
               answers: [{
                image: 'http://imagename.com',
                answer: 'answer 1'
               }, {
                answer: 'answer 1'
               }]
            })
            .expect(403)
        })
        test('Should return 204 on AddSurvey with valid token', async () => {
            const res = await accountCollection.insertOne({
                name: 'Victor',
                email: 'victor@email.com',
                password: 'any_password',
                role: 'admin'
            })
            const id = res.insertedId
            const accessToken = sign({id}, env.jwtSecret)
            await accountCollection.updateOne({
                _id: id
            }, {
                $set: {
                    accessToken
                }
            })
            await request(app)
                .post('/api/surveys')
                .set('x-access-token', accessToken)
                .send({
                   question: 'Question',
                   answers: [{
                    image: 'http://imagename.com',
                    answer: 'answer 1'
                   }, {
                    answer: 'answer 1'
                   }]
                })
                .expect(403)
            })
    })
})