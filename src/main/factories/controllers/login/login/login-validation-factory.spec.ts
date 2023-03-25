import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/validation/validators'
import { makeLoginValidation } from './login-validation-factory'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { mockEmailValidator } from '@/validation/test/mock-email-validator'

jest.mock('../../../../../validation/validators/validation-composite')


describe('LoginValidationFactory', () => {
    test('Should Call validation composite with all validations', () => {
        makeLoginValidation()
        const validations: Validation[] = []
        for (const field of ['email', 'password']){
            validations.push( new RequiredFieldValidation(field))
        }
        validations.push(new EmailValidation('email', mockEmailValidator()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})