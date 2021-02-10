import { DbAuthentication } from './db-authentication'
import { AccountModel } from '../../../../domain/models/account'
import { LoadAccountByEmailRepository } from './../../../protocols/db/account/load-account-by-email-repository'

describe('Name of the group', () => {
  test('should call LoadAccountByEmailRepository with correct values', async () => {
    class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
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
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const sut = new DbAuthentication(loadAccountByEmailRepositorySpy)
    await sut.auth({
      email: 'any_email',
      password: 'any_password'
    })
    expect(loadAccountByEmailRepositorySpy.email).toBe('any_email')
  })
})
