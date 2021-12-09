import { HttpRequest, HttpResponse } from '../protocols/hhtp'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let response: HttpResponse = {
      body: {},
      statusCode: 0
    }

    if (!httpRequest.body.name) {
      response = {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
    if (!httpRequest.body.email) {
      response = {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
    return response
  }
}
