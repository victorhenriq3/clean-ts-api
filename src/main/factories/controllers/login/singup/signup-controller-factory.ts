import { Controller } from '@/presentation/protocols'
import { makeSingUpValidation } from './signup-validation-factory'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'


export const makeSingUpController = (): Controller => {
    return makeLogControllerDecorator(new SignUpController(makeDbAddAccount(), makeSingUpValidation(), makeDbAuthentication()))
}