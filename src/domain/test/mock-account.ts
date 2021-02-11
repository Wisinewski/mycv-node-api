import { AuthenticationParams } from './../usecases/account/authentication'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email',
  password: 'any_password'
})
