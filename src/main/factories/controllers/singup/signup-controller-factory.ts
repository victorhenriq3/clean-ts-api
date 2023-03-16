import { Controller } from '../../../../presentation/protocols'
import { makeSingUpValidation } from './signup-validation-factory'
import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'


export const makeSingUpController = (): Controller => {
    return makeLogControllerDecorator(new SignUpController(makeDbAddAccount(), makeSingUpValidation(), makeDbAuthentication()))
}