import { HttpRequest, HttpResponse } from "@/application/helpers";
export interface Middleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
