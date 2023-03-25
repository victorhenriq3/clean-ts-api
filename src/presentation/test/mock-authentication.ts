import { Authentication, AuthenticationParams } from "../controllers/login/login/login-controller-protocols"

export const mockAuthentication = (): Authentication => {
    class AuthenticationStub implements Authentication {
        async auth(authentication: AuthenticationParams): Promise<string> {
            return Promise.resolve(('any_token'))
        }
    }

    return new AuthenticationStub()
}