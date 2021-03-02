import { unauthorized, ok, serverError } from './../../helpers/http-helper'
import { Authentication } from './../../../domain/usecases/account/authentication'
import { Controller } from './../../protocols/controller'
import { HttpResponse } from './../../protocols/http'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const accessToken = await this.authentication.auth(request)
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
