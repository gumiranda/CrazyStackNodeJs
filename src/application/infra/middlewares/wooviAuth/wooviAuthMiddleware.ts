import {
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  unauthorized,
} from "@/application/helpers";
import { Middleware } from "@/application/infra/contracts";
import { env } from "@/application/infra/config";

export class WooviAuthMiddleware implements Middleware {
  constructor() {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const authHeader = httpRequest?.headers?.["x-openpix-authorization"];
      if (!authHeader) {
        return unauthorized();
      }
      if (authHeader == env.wooviWebhookKey) {
        return ok({});
      }
      return unauthorized();
    } catch (error) {
      return serverError(error);
    }
  }
}
