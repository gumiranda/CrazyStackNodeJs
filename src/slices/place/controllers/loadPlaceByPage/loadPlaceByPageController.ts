/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadPlaceByPage } from "@/slices/place/useCases";

export class LoadPlaceByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadPlaceByPage: LoadPlaceByPage
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const {
      page,
      sortBy = "createdAt",
      typeSort = "asc",
      limitPerPage = 10,
      ...rest
    } = httpRequest?.query || {};
    const fields = rest;
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page, limitPerPage };
    const placeLoaded = await this.loadPlaceByPage({
      fields,
      options,
    });
    return ok(placeLoaded);
  }
}
