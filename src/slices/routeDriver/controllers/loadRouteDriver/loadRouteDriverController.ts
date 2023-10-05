/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadRouteDriver } from "@/slices/routeDriver/useCases";

export class LoadRouteDriverController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadRouteDriver: LoadRouteDriver
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const routeDriverLoaded = await this.loadRouteDriver({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(routeDriverLoaded);
  }
}
