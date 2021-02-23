import { serverError } from '../../helpers/http-helper'
import { Authentication } from './../../../domain/usecases/account/authentication'
import { Controller } from './../../protocols/controller'
import { HttpResponse } from './../../protocols/http'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      await this.authentication.auth(request)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
