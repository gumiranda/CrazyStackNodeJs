/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteRouteDriver } from "@/slices/routeDriver/useCases";

export class DeleteRouteDriverController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteRouteDriver: DeleteRouteDriver
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const routeDriverDeleteed = await this.deleteRouteDriver({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(routeDriverDeleteed);
  }
}
