import {Decrypter} from '../../protocols/criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

interface SutTypes{
    sut: DbLoadAccountByToken
    decrypterStub: Decrypter
}

const makeDecrypter = (): Decrypter => {
    class DecryptedStub implements Decrypter{
        decrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('any_value'))
        }
    }
    return new DecryptedStub()
}

const makeSut = (): SutTypes => {
    const decrypterStub = makeDecrypter()
    const sut = new DbLoadAccountByToken(decrypterStub)

    return {
        sut,
        decrypterStub
    }
}

describe('DbLoadAccountByToken Usecases', () => {
    test('Should call Decrypter with correct values', async () => {
        const {sut, decrypterStub} = makeSut() 
        const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
        await sut.load('any_token')
        expect(decryptSpy).toHaveBeenCalledWith('any_token')
    })
})