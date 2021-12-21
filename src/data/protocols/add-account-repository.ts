import { AccountModel, AddAcountModel } from '../usecases/add-account/db-add-account-protocols'

export interface AddAccountRepository{
  add: (accountData: AddAcountModel) => Promise<AccountModel>
}
