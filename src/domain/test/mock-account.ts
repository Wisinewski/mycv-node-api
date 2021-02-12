import { AccountModel } from './../models/account'
import { AuthenticationParams } from './../usecases/account/authentication'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'hashed_password'
})
