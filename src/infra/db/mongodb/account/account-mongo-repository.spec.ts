import { mockAddAccountParams } from '@/domain/test';
import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository';

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

    describe('add()', () => {
        test('Should return an account on add success', async() => {
            const sut = makeSut()
            const account = await sut.add(mockAddAccountParams())
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toBe('any_name')
            expect(account.email).toBe('any_email@email.com')
            expect(account.password).toBe('any_password')
        })
    })

    describe('loadByEmail()', () => {
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
    
        test('Should return null if loadByEmail fails', async() => {
            const sut = makeSut()
            const account = await sut.loadByEmail('any_email')
            expect(account).toBeFalsy()
        })
    })

    describe('updateAccessToken()', () => {
        test('Should updated the account accessToken on updateAccessToken success', async() => {
            const sut = makeSut()
            const res = await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email',
                password: 'any_password'
            })
            await sut.updateAccessToken(res.insertedId.toString(), 'any_token')
            const account = await accountCollection.findOne({_id: res.insertedId})
            expect(account).toBeTruthy()
            expect(account.accessToken).toBe('any_token')
        })
    })

    describe('loadByToken()', () => {
        test('Should return an account on loadByToken without role', async() => {
            const sut = makeSut()
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
                accessToken: 'any_token'
            })
            const account = await sut.loadByToken('any_token')
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toBe('any_name')
            expect(account.email).toBe('any_email')
            expect(account.password).toBe('any_password')
        })

        test('Should return an account on loadByToken with admin role', async() => {
            const sut = makeSut()
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
                accessToken: 'any_token',
                role: 'admin'
            })
            const account = await sut.loadByToken('any_token', 'admin')
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toBe('any_name')
            expect(account.email).toBe('any_email')
            expect(account.password).toBe('any_password')
        })

        test('Should return null on loadByToken with invalid role', async() => {
            const sut = makeSut()
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
                accessToken: 'any_token',
            })
            const account = await sut.loadByToken('any_token', 'admin')
            expect(account).toBeFalsy()
        })

        test('Should return an account on loadByToken if user is admin', async() => {
            const sut = makeSut()
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
                accessToken: 'any_token',
                role: 'admin'
            })
            const account = await sut.loadByToken('any_token')
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toBe('any_name')
            expect(account.email).toBe('any_email')
            expect(account.password).toBe('any_password')
        })

        test('Should return null if loadByToken fails', async() => {
            const sut = makeSut()
            const account = await sut.loadByEmail('any_token')
            expect(account).toBeFalsy()
        })
    })
})