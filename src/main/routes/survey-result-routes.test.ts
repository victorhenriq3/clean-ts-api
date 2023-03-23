import { Collection } from 'mongodb';
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app'
import {sign} from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
    const res = await accountCollection.insertOne({
        name: 'Victor',
        email: 'victor@email.com',
        password: 'any_password',
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
    return accessToken
}

describe('Survey Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL || '');
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

    describe('PUT /surveys/:surveyId/results', () => {
        test('Should return 403 on save survey result without accessToken', async () => {
        await request(app)
            .put('/api/surveys/any_id/results')
            .send({answer: 'any_answer'})
            .expect(403)
        })

        test('Should return 200 on saveSurveyResult with valid token', async () => {
            const accessToken = await makeAccessToken()
            const res = await surveyCollection.insertOne(
                {
                    question: 'any_question',
                    answers: [
                        {
                            image: 'any_image',
                            answer: 'Answer 1'
                        },
                        {
                            answer: 'other_answer'
                        }
                    ],
                    date: new Date()
                })
            await request(app)
                .put(`/api/surveys/${String(res.insertedId)}/results`)
                .set('x-access-token', accessToken)
                .send({answer: 'Answer 1'})
                .expect(200)
        })
    })
})