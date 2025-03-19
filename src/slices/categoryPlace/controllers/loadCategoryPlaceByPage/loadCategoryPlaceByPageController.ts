/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadCategoryPlaceByPage } from "@/slices/categoryPlace/useCases";

export class LoadCategoryPlaceByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadCategoryPlaceByPage: LoadCategoryPlaceByPage
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { page, sortBy = "createdAt", typeSort = "asc", ...rest } = httpRequest?.query || {};
    const fields = rest;
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page };
    const categoryPlaceLoaded = await this.loadCategoryPlaceByPage({
      fields,
      options,
    });
    return ok(categoryPlaceLoaded);
  }
}
