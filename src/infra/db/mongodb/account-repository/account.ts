import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAcountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAcountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('account')
    await accountCollection.insertOne(accountData)
    return MongoHelper.map(accountData)
  }
}
