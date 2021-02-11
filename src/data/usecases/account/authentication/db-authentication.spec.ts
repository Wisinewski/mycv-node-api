import { LoadAccountByEmailRepositorySpy } from './../../../test/mock-load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'
import { AccountModel } from '../../../../domain/models/account'
import { LoadAccountByEmailRepository } from './../../../protocols/db/account/load-account-by-email-repository'

const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepositorySpy => {
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
  return new LoadAccountByEmailRepositorySpy()
}

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = mockLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositorySpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy
  }
}

describe('Name of the group', () => {
  test('should call LoadAccountByEmailRepository with correct values', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.auth({
      email: 'any_email',
      password: 'any_password'
    })
    expect(loadAccountByEmailRepositorySpy.email).toBe('any_email')
  })
})
