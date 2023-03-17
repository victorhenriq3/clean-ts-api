import { Collection } from 'mongodb';
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app'

let surveyCollection: Collection

describe('Survey Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    })

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    describe('POST /surveys', () => {
    test('Should return 204 on AddSurvey success', async () => {
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
            .expect(204)
        })
    })
})