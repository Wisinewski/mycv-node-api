import { LoadAccountByEmailRepositorySpy } from '../../../test/mock-db-account'
import { DbAuthentication } from './db-authentication'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
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
