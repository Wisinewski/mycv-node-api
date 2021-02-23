import { ServerError } from './../errors/server-errror'
import { HttpResponse } from './../protocols/http'

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
