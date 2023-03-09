import {SignUpController} from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import {BcryptAdapter} from '../../infra/criptography/bcrypt-adapter'
import {AccountMongoRepository} from '../../infra/db/mongodb/account-repository/account'
import env from '../config/env'

export const makeSingUpController = (): SignUpController => {
    const emailValidator = new EmailValidatorAdapter()
    const bcryptAdapter = new BcryptAdapter(env.salt)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    return new SignUpController(emailValidator, dbAddAccount)
}