import { UpdateAccessTokenRepositorySpy } from './../../../test/mock-db-account'
import { EncrypterSpy, HashComparerSpy } from './../../../test/mock-cryptography'
import { throwError } from './../../../../domain/test/test-helper'
import { mockAuthenticationParams } from './../../../../domain/test/mock-account'
import { LoadAccountByEmailRepositorySpy } from '../../../test/mock-db-account'
import { DbAuthentication } from './db-authentication'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new DbAuthentication(loadAccountByEmailRepositorySpy, hashComparerSpy, encrypterSpy, updateAccessTokenRepositorySpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('Name of the group', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(loadAccountByEmailRepositorySpy.email).toBe('any_email')
  })

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadAccountByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    expect(promise).rejects.toThrow()
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null
    const model = await sut.auth(mockAuthenticationParams())
    expect(model).toBeNull()
  })

  test('should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(hashComparerSpy.plaintext).toBe('any_password')
    expect(hashComparerSpy.digest).toBe('hashed_password')
  })

  test('should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    expect(promise).rejects.toThrow()
  })

  test('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.result = false
    const model = await sut.auth(mockAuthenticationParams())
    expect(model).toBeNull()
  })

  test('should call Encrypter with correct id', async () => {
    const { sut, encrypterSpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(encrypterSpy.plaintext).toBe('any_id')
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    expect(promise).rejects.toThrow()
  })

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(updateAccessTokenRepositorySpy.id).toBe('any_id')
    expect(updateAccessTokenRepositorySpy.accessToken).toBe('encrypted_plaintext')
  })
})
