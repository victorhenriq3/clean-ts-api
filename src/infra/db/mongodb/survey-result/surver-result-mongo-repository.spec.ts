import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import MockDate from 'mockdate'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection


const makeSut = (): SurveyResultMongoRepository => {
    return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<any> => {
    const resData = await surveyCollection.insertOne( {
        question: 'any_question',
        answers: [
            {
                image: 'any_image',
                answer: 'any_answer'
            },
            {
                answer: 'other_answer'
            }
        ],
        date: new Date()
    })
    const res = await surveyCollection.findOne({_id: resData.insertedId})
    return res
}

const makeAccount = async (): Promise<any> => {
    const resData = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
    })

    const res = await accountCollection.findOne({_id: resData.insertedId})
    return res
}

describe('Survey Mongo Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL || '');
        MockDate.set(new Date())
    })

    beforeEach(async () => {
        surveyCollection =  await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})
        surveyResultCollection =  await MongoHelper.getCollection('surveyResult')
        await surveyCollection.deleteMany({})
        accountCollection =  await MongoHelper.getCollection('accounts')
        await surveyCollection.deleteMany({})
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
        MockDate.reset()
    })

    describe('save()', () => {
        test('Should add a surveyResult if its new', async() => {
            const survey = await makeSurvey()
            const account = await makeAccount()
            const sut = makeSut()
            const surveyResult = await sut.save({
                surveyId: survey._id,
                accountId: account._id,
                answer: survey.answers[0].answer,
                date: new Date()
            })
            expect(surveyResult).toBeTruthy()
            expect(surveyResult.id).toBeTruthy()
            expect(surveyResult.answer).toBe(survey.answers[0].answer)
        })

        test('Should update survey if its not new', async() => {
            const survey = await makeSurvey()
            const account = await makeAccount()
            const res = await surveyResultCollection.insertOne({
                surveyId: survey._id,
                accountId: account._id,
                answer: survey.answers[0].answer,
                date: new Date()
            })

            const sut = makeSut()
            const surveyResult = await sut.save({
                surveyId: survey._id,
                accountId: account._id,
                answer: survey.answers[1].answer,
                date: new Date()
            })
            expect(surveyResult).toBeTruthy()
            expect(surveyResult.id).toEqual(res.insertedId)
            expect(surveyResult.answer).toBe(survey.answers[1].answer)
        })
    })
})