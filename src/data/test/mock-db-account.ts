import { UpdateAccessTokenRepository } from './../protocols/db/account/update-access-token-repository'
import { AccountModel } from '../../domain/models/account'
import { mockAccountModel } from '../../domain/test/mock-account'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result: string
  async loadAccountByEmail (email: string): Promise<AccountModel> {
    this.email = email
    return mockAccountModel()
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  accessToken: string
  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    this.id = id
    this.accessToken = accessToken
    return null
  }
}
