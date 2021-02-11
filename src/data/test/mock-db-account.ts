import { AccountModel } from '../../domain/models/account'
import { mockAccountModel } from '../../domain/test/mock-account'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email
  async loadAccountByEmail (email: string): Promise<AccountModel> {
    this.email = email
    return mockAccountModel()
  }
}
