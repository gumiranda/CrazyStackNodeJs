/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddRating } from "@/slices/rating/useCases";

export class AddRatingController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addRating: AddRating
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const ratingCreated = await this.addRating({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(ratingCreated);
  }
}
