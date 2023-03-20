import { DbAddAccount } from "../../../../../data/usecases/add-account/db-add-account"
import { AddAccount } from "../../../../../domain/usecases/add-account"
import { BcryptAdapter } from "../../../../../infra/criptography/bcryptAdapter/bcrypt-adapter"
import { AccountMongoRepository } from "../../../../../infra/db/mongodb/account/account-mongo-repository"
import env from "../../../../config/env"

export const makeDbAddAccount = (): AddAccount => {
    const bcryptAdapter = new BcryptAdapter(env.salt)
    const accountMongoRepository = new AccountMongoRepository()
    return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}