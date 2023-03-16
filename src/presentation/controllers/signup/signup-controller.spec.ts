import { SignUpController } from './signup-controller'
import { AddAccountModel, AccountModel, AddAccount, HttpRequest, Validation, Authentication, AuthenticationModel } from "./signup-controller-protocols";
import { EmailInUseError, MissingParamError, ServerError } from "../../errors";
import { badRequest, forbidden, ok, serverError } from '../../helpers/http/http-helper';

const makeFakeAccount = ():AccountModel => ({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
})

const makeFakeRequest = ():HttpRequest => ({
  body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
  }
})

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
      async auth(authentication: AuthenticationModel): Promise<string> {
          return new Promise(resolve => resolve(('any_token')))
      }
  }

  return new AuthenticationStub()
}


const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount{
    async add(account: AddAccountModel): Promise<AccountModel>{ 
      const fakeAccount = makeFakeAccount()

      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}


const makeValidation = (): Validation => {
  class ValidationStub implements Validation{
    validate(input: any): Error { 
      return null
    }
  }
  return new ValidationStub()
}
interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}


const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const authenticationStub = makeAuthentication()
  const sut =  new SignUpController(addAccountStub, validationStub, authenticationStub)

  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

describe('Signup Controller', function () {
  test('Should call AddAccount with correct values', async () => {
    const {sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
    })
  })
  
  test('Should return 500 if addAccount throws', async () => {
    const {sut, addAccountStub} =  makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 403 if addAccount returns null', async () => {
    const {sut, addAccountStub} = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const {sut} = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({accessToken: 'any_token'}))
  })

  test('Should call Validation with correct values', async () => {
    const {sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation return an error', async () => {
    const {sut, validationStub} = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call Authentication with correct values', async () => {
    const {sut, authenticationStub} = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith({
        email: 'any_email@mail.com', 
        password: 'any_password'
      })
  })
  
  test('Should return 500 if authentication throws', async () => {
      const {sut, authenticationStub} = makeSut()
      jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
  })
})
