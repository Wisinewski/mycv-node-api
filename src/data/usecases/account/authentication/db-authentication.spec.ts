import { mockAuthenticationParams } from './../../../../domain/test/mock-account'
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
    await sut.auth(mockAuthenticationParams())
    expect(loadAccountByEmailRepositorySpy.email).toBe('any_email')
  })

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadAccountByEmail').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(mockAuthenticationParams())
    expect(promise).rejects.toThrow()
  })
})
