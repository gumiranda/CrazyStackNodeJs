/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { UpdateCategoryPlace } from "@/slices/categoryPlace/useCases";

export class UpdateCategoryPlaceController extends Controller {
  constructor(
    private readonly validationQuery: Validation,
    private readonly validationBody: Validation,
    private readonly updateCategoryPlace: UpdateCategoryPlace
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
    const categoryPlaceUpdated = await this.updateCategoryPlace(
      {
        fields: {
          ...httpRequest?.query,
          createdById: httpRequest?.userId,
        },
        options: {},
      },
      httpRequest?.body
    );
    return ok(categoryPlaceUpdated);
  }
}
