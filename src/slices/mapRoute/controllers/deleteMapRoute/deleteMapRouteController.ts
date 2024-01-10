/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteMapRoute } from "@/slices/mapRoute/useCases";

export class DeleteMapRouteController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteMapRoute: DeleteMapRoute
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const mapRouteDeleteed = await this.deleteMapRoute({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(mapRouteDeleteed);
  }
}
