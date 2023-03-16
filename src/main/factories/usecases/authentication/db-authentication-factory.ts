import { DbAuthentication } from "../../../../data/usecases/authentication/db-authentication"
import { Authentication } from "../../../../domain/usecases/authentication"
import { BcryptAdapter } from "../../../../infra/criptography/bcryptAdapter/bcrypt-adapter"
import { JwtAdapter } from "../../../../infra/criptography/jwtAtapter/jwt-adapter"
import { AccountMongoRepository } from "../../../../infra/db/mongodb/account/account-mongo-repository"
import env from "../../../config/env"

export const makeDbAuthentication = (): Authentication => {
    const accountMongoRepository = new AccountMongoRepository()
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const bcryptAdapter = new BcryptAdapter(env.salt)
    return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}