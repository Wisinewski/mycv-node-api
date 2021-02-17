import { MongoHelper } from './mongo-helper'
import { AccountModel } from './../../../domain/models/account'
import { LoadAccountByEmailRepository } from './../../../data/protocols/db/account/load-account-by-email-repository'

export class AccountMongoRepository implements LoadAccountByEmailRepository {
  async loadAccountByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    })
    return account && MongoHelper.map(account)
  }
}
