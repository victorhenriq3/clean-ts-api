import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account';

let accountCollection: Collection

describe('Account Mongo Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    })

    beforeEach(async () => {
        accountCollection =  await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    const makeSut = (): AccountMongoRepository => {
        return new AccountMongoRepository()
    }

    test('Should return an account on add success', async() => {
        const sut = makeSut()
        const account = await sut.add({
            name: 'any_name',
            email: 'any_email',
            password: 'any_password'
        })
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email')
        expect(account.password).toBe('any_password')
    })

    test('Should return an account on loadByEmailSuccess', async() => {
        const sut = makeSut()
        await accountCollection.insertOne({
            name: 'any_name',
            email: 'any_email',
            password: 'any_password'
        })
        const account = await sut.loadByEmail('any_email')
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email')
        expect(account.password).toBe('any_password')
    })

    test('Should return null if loadByEmailFails', async() => {
        const sut = makeSut()
        const account = await sut.loadByEmail('any_email')
        expect(account).toBeFalsy()
    })
})