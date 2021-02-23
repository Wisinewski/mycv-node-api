import { Authentication } from './../../../domain/usecases/account/authentication'
import { Controller } from './../../protocols/controller'
import { HttpResponse } from './../../protocols/http'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    await this.authentication.auth(request)
    return null
  }
}
