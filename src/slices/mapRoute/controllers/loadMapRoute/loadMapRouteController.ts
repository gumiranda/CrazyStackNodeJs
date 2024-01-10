/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadMapRoute } from "@/slices/mapRoute/useCases";

export class LoadMapRouteController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadMapRoute: LoadMapRoute
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const mapRouteLoaded = await this.loadMapRoute({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(mapRouteLoaded);
  }
}
