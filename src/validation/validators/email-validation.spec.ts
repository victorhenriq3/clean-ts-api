
import { InvalidParamError } from '@/presentation/errors';
import { EmailValidator } from '../protocols/email-validator';
import { mockEmailValidator } from '../test/mock-email-validator';
import { EmailValidation } from './email-validation';

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}


const makeSut = (): SutTypes => {

  const emailValidatorStub = mockEmailValidator()
  const sut =  new EmailValidation('email', emailValidatorStub)

  return {
    sut,
    emailValidatorStub,
  }
}

describe('Email Validation', function () {
  test('Should return an error if EmailValidator returns false', async () => {
    const {sut, emailValidatorStub} = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({email: 'any_email@mail.com'})
    expect(error).toEqual(new InvalidParamError('email'))
  })
  
  test('Should call EmailValidator with correct email', async () => {
    const {sut, emailValidatorStub} = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({email: 'any_email@mail.com'})
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw EmailValidator throws', async () => {
    const {sut, emailValidatorStub} =  makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
