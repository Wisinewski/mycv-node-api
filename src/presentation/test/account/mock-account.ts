import { Authentication, AuthenticationParams } from './../../../domain/usecases/account/authentication'

export class AuthenticationSpy implements Authentication {
  params: AuthenticationParams
  result: string = 'any_token'

  async auth (params: AuthenticationParams): Promise<string> {
    this.params = params
    return this.result
  }
}
