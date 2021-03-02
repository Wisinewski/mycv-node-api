import { unauthorized, ok, serverError } from './../../helpers/http-helper'
import { throwError } from './../../../domain/test/test-helper'
import { LoginController } from './login-controller'
import { AuthenticationSpy } from './../../test/account/mock-account'
import { mockAuthenticationParams } from './../../../domain/test/mock-account'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  sut: LoginController
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const sut = new LoginController(authenticationSpy)
  return {
    sut,
    authenticationSpy
  }
}

describe('Login Controller', () => {
  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockAuthenticationParams()
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual(request)
  })

  test('should returns 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockAuthenticationParams())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(null)
    const httpRequest = mockAuthenticationParams()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockAuthenticationParams()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })
})
