import { throwError } from './../../../domain/test/test-helper'
import { LoginController } from './login-controller'
import { AuthenticationSpy } from './../../test/account/mock-account'
import { mockAuthenticationParams } from './../../../domain/test/mock-account'
import { serverError } from '../../helpers/http-helper'

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
})
