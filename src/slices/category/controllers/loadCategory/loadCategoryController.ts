/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadCategory } from "@/slices/category/useCases";

export class LoadCategoryController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadCategory: LoadCategory
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const categoryLoaded = await this.loadCategory({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(categoryLoaded);
  }
}
