import { HttpRequest, HttpResponse } from './hhtp'

export interface Controller{
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
