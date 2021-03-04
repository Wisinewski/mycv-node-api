import { Validation } from './../../protocols/validation'
import { unauthorized, ok, serverError, badRequest } from './../../helpers/http-helper'
import { Authentication } from './../../../domain/usecases/account/authentication'
import { Controller } from './../../protocols/controller'
import { HttpResponse } from './../../protocols/http'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
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
