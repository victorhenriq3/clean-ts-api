import { mockAccountModel } from "@/domain/test"
import { AccountModel, AddAccount, AddAccountParams } from "../controllers/login/signup/signup-controller-protocols"
import { LoadAccountByToken } from "../middlewares/auth-middleware-protocols"

export const mockAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount{
      async add(account: AddAccountParams): Promise<AccountModel>{ 
        const fakeAccount = mockAccountModel()
  
        return Promise.resolve(fakeAccount)
      }
    }
    return new AddAccountStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
      load(accessToken: string, role?: string | undefined): Promise<AccountModel> {
          return Promise.resolve(mockAccountModel())
      }
  }
  return new LoadAccountByTokenStub()
}