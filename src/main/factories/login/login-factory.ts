import { Controller } from "../../../presentation/protocols";
import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication"
import { LoginController } from "../../../presentation/controllers/login/login-controller"
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { makeLoginValidation } from './login-validation-factory'
import { AccountMongoRepository } from "../../../infra/db/mongodb/account/account-mongo-repository";
import { BcryptAdapter } from "../../../infra/criptography/bcryptAdapter/bcrypt-adapter";
import { JwtAdapter } from "../../../infra/criptography/jwtAtapter/jwt-adapter";
import env from "../../config/env";

export const makeLoginController = (): Controller => {
    const accountMongoRepository = new AccountMongoRepository()
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const bcryptAdapter = new BcryptAdapter(env.salt)
    const authentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
    const loginController = new LoginController(makeLoginValidation(), authentication)
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(loginController, logMongoRepository)
}