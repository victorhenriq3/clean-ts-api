import { mockAccountModel } from "@/domain/test"
import { AccountModel, AddAccount, AddAccountParams } from "../controllers/login/signup/signup-controller-protocols"

export const mockAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount{
      async add(account: AddAccountParams): Promise<AccountModel>{ 
        const fakeAccount = mockAccountModel()
  
        return new Promise(resolve => resolve(fakeAccount))
      }
    }
    return new AddAccountStub()
  }