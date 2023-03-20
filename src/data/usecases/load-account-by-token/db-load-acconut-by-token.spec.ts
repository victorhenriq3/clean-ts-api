import {Decrypter} from '../../protocols/criptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'


describe('DbLoadAccountByToken Usecases', () => {
    test('Should call Decrypter with correct values', async () => {
        class DecryptedStub implements Decrypter{
            decrypt(value: string): Promise<string> {
                return new Promise(resolve => resolve('any_value'))
            }
        }
        const decrypterStub = new DecryptedStub()
        const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
        const sut = new DbLoadAccountByToken(decrypterStub)
        await sut.load('any_token')
        expect(decryptSpy).toHaveBeenCalledWith('any_token')
    })
})