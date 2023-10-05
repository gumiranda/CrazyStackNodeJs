/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddMapRoute } from "@/slices/mapRoute/useCases";

export class AddMapRouteController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addMapRoute: AddMapRoute
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const mapRouteCreated = await this.addMapRoute({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(mapRouteCreated);
  }
}
