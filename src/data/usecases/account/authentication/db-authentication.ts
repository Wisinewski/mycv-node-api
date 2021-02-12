import { LoadAccountByEmailRepository } from './../../../protocols/db/account/load-account-by-email-repository'
import { Authentication, AuthenticationParams } from './../../../../domain/usecases/account/authentication'
import { HashComparer } from '../../../protocols/criptography/hash-comparer'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (params: AuthenticationParams): Promise<string> {
    const { email, password } = params
    const account = await this.loadAccountByEmailRepository.loadAccountByEmail(email)
    if (account) {
      await this.hashComparer.compare(password, account.password)
    }
    return null
  }
}
