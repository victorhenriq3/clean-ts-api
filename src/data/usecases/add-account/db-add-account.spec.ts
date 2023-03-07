import { DbAddAccount} from './db-add-account'

describe('DbAddAccount UseCase', () => {
    test('Should call Encrypter with correct password', async () => {
        class EncrypterStub{
            async encrypt(value: string): Promise<string>{
                return new Promise(resolve => resolve('hashed_password'))
            }
        }
        const encryptStub = new EncrypterStub()
        const sut = new DbAddAccount(encryptStub)
        const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email@email.com',
            password: 'valid_password'
        }
        await sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })
})