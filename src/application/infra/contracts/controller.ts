import { HttpRequest, HttpResponse, serverError } from "@/application/helpers";

export abstract class Controller {
  abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return this.execute(httpRequest);
    } catch (error) {
      return serverError(error);
    }
  }
}
