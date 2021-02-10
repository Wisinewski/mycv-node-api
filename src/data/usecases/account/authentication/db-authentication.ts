import { LoadAccountByEmailRepository } from './../../../protocols/db/account/load-account-by-email-repository'
import { Authentication, AuthenticationParams } from './../../../../domain/usecases/account/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (params: AuthenticationParams): Promise<string> {
    const { email } = params
    this.loadAccountByEmailRepository.loadAccountByEmail(email)
    return null
  }
}
