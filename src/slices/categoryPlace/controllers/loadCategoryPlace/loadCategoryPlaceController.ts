/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadCategoryPlace } from "@/slices/categoryPlace/useCases";

export class LoadCategoryPlaceController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadCategoryPlace: LoadCategoryPlace
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const categoryPlaceLoaded = await this.loadCategoryPlace({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(categoryPlaceLoaded);
  }
}
