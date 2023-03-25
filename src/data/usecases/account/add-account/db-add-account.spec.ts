import { AccountModel, Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'
import { mockAccountModel, mockAddAccountParams, throwError } from '@/domain/test'
import { DbAddAccount} from './db-add-account'
import { mockAddAccountRepository, mockHasher, mockLoadAccountByEmailRepository } from '@/data/test'

type SutTypes = {
    sut: DbAddAccount
    hasherStub: Hasher
    addAccountRepositoryStub: AddAccountRepository
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(Promise.resolve(null))
    const hasherStub = mockHasher()
    const addAccountRepositoryStub = mockAddAccountRepository()
    const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)

    return {
        sut,
        hasherStub,
        addAccountRepositoryStub,
        loadAccountByEmailRepositoryStub
    }
}

describe('DbAddAccount UseCase', () => {
    test('Should call Hasher with correct password', async () => {
        const {sut, hasherStub} = makeSut()
        const encryptSpy = jest.spyOn(hasherStub, 'hash')
        const accountData = {
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password'
        }
        await sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('any_password')
    })

    test('Should throw if Hasher throws', async () => {
        const {sut, hasherStub} = makeSut()
        jest.spyOn(hasherStub, 'hash')
            .mockImplementationOnce(throwError)
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const {sut, addAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        await sut.add(mockAddAccountParams())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'hashed_password'
        })
    })

    test('Should throw if AddAccountRepository throws', async () => {
        const {sut, addAccountRepositoryStub} = makeSut()
        jest.spyOn(addAccountRepositoryStub, 'add')
            .mockImplementationOnce(throwError)
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should return an account on success', async () => {
        const { sut } = makeSut()
        const account = await sut.add(mockAddAccountParams())
        expect(account).toEqual(mockAccountModel())
    })
    
    test('Should return null if loadAccountByEmailRepository not returns null', async () => {
        const {sut, loadAccountByEmailRepositoryStub} = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
        const account = await sut.add(mockAddAccountParams())
        expect(account).toBeNull()
    })

    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const {sut, loadAccountByEmailRepositoryStub} = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
        await sut.add(mockAddAccountParams())
        expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
    })
})