import { HttpResponse } from '../protocols/hhtp'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
