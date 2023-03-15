import {SignUpController} from '../../../presentation/controllers/signup/signup-controller'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import {BcryptAdapter} from '../../../infra/criptography/bcryptAdapter/bcrypt-adapter'
import {AccountMongoRepository} from '../../../infra/db/mongodb/account/account-mongo-repository'
import env from '../../config/env'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { makeSingUpValidation } from './signup-validation-factory'


export const makeSingUpController = (): Controller => {
    const bcryptAdapter = new BcryptAdapter(env.salt)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    const signUpController = new SignUpController(dbAddAccount, makeSingUpValidation())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(signUpController, logMongoRepository)
}