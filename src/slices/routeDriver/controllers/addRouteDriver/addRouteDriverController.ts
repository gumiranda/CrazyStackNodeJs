/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddRouteDriver } from "@/slices/routeDriver/useCases";

export class AddRouteDriverController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addRouteDriver: AddRouteDriver
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const routeDriverCreated = await this.addRouteDriver({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(routeDriverCreated);
  }
}
