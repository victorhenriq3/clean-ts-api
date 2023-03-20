import { CompareFieldsValidation, RequiredFieldValidation, EmailValidation, ValidationComposite  } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols'
import { EmailValidator } from '../../../../../validation/protocols/email-validator'
import { makeSingUpValidation } from './signup-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator{
      isValid(email: string): boolean{
        return true
      }
    }
    return new EmailValidatorStub()
  }

describe('SignupValidationFactory', () => {
    test('Should Call validation composite with all validations', () => {
        makeSingUpValidation()
        const validations: Validation[] = []
        for (const field of ['name', 'email', 'password', 'passwordConfirmation']){
            validations.push( new RequiredFieldValidation(field))
        }
        validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
        validations.push(new EmailValidation('email', makeEmailValidator()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})