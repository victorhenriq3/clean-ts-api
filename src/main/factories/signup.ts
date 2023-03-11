import {SignUpController} from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import {BcryptAdapter} from '../../infra/criptography/bcrypt-adapter'
import {AccountMongoRepository} from '../../infra/db/mongodb/account-repository/account'
import env from '../config/env'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { makeSingUpValidation } from './signup-validation'


export const makeSingUpController = (): Controller => {
    const emailValidator = new EmailValidatorAdapter()
    const bcryptAdapter = new BcryptAdapter(env.salt)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    const signUpController = new SignUpController(emailValidator, dbAddAccount, makeSingUpValidation())
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(signUpController, logMongoRepository)
}