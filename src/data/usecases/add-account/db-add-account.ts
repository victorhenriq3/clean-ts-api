import { AccountModel, AddAcountModel, AddAcount, Encrypter } from './db-add-account-protocols'
export class DbAddAccount implements AddAcount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAcountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => resolve(null))
  }
}
