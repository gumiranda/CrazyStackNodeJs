/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadRouteDriverByPage } from "@/slices/routeDriver/useCases";

export class LoadRouteDriverByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadRouteDriverByPage: LoadRouteDriverByPage
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { page, sortBy, typeSort = "asc", ...rest } = httpRequest?.query || {};
    const fields = rest;
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page };
    const routeDriverLoaded = await this.loadRouteDriverByPage({
      fields,
      options,
    });
    return ok(routeDriverLoaded);
  }
}
