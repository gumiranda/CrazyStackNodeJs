/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddRatingResult } from "@/slices/ratingResult/useCases";

export class AddRatingResultController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addRatingResult: AddRatingResult
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const ratingResultCreated = await this.addRatingResult({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(ratingResultCreated);
  }
}
