/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { UpdateCategory } from "@/slices/category/useCases";

export class UpdateCategoryController extends Controller {
  constructor(
    private readonly validationQuery: Validation,
    private readonly validationBody: Validation,
    private readonly updateCategory: UpdateCategory
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errorsBody = this.validationBody.validate(httpRequest?.body);
    if (errorsBody?.length > 0) {
      return badRequest(errorsBody);
    }
    const errorsQuery = this.validationQuery.validate(httpRequest?.query);
    if (errorsQuery?.length > 0) {
      return badRequest(errorsQuery);
    }
    const categoryUpdated = await this.updateCategory(
      {
        fields: {
          ...httpRequest?.query,
          createdById: httpRequest?.userId,
        },
        options: {},
      },
      httpRequest?.body
    );
    return ok(categoryUpdated);
  }
}
