import { HttpRequest, HttpResponse } from '../protocols/hhtp'
import { MissingParamError } from '../errors/missing-params-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let response: HttpResponse = {
      body: {},
      statusCode: 0
    }

    if (!httpRequest.body.name) {
      response = {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      response = {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
    return response
  }
}
