/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteCategoryPlace } from "@/slices/categoryPlace/useCases";

export class DeleteCategoryPlaceController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteCategoryPlace: DeleteCategoryPlace
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const categoryPlaceDeleteed = await this.deleteCategoryPlace({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(categoryPlaceDeleteed);
  }
}
