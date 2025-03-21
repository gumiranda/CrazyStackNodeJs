/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddCategoryPlace } from "@/slices/categoryPlace/useCases";

export class AddCategoryPlaceController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addCategoryPlace: AddCategoryPlace
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const categoryPlaceCreated = await this.addCategoryPlace({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(categoryPlaceCreated);
  }
}
