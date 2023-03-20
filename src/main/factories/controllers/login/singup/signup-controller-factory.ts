import { Controller } from '../../../../../presentation/protocols'
import { makeSingUpValidation } from './signup-validation-factory'
import { SignUpController } from '../../../../../presentation/controllers/login/signup/signup-controller'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'


export const makeSingUpController = (): Controller => {
    return makeLogControllerDecorator(new SignUpController(makeDbAddAccount(), makeSingUpValidation(), makeDbAuthentication()))
}