import { AccountModel } from '../../domain/models/account'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email
  async loadAccountByEmail (email: string): Promise<AccountModel> {
    this.email = email
    return {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
  }
}
