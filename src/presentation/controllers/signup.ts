import { HttpRequest, HttpResponse } from '../protocols/hhtp'
import { MissingParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helpers'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return {
      body: httpRequest.body,
      statusCode: 200
    }
  }
}
