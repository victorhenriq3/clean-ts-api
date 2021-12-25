import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcrytpAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../presentation/utils/email-validator-adapter'

export const makeSignupController = (): SignUpController => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcrytpAdapter = new BcrytpAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcrytpAdapter, accountMongoRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
