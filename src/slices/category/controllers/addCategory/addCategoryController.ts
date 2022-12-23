/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddCategory } from "@/slices/category/useCases";

export class AddCategoryController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addCategory: AddCategory
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const categoryCreated = await this.addCategory({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(categoryCreated);
  }
}
