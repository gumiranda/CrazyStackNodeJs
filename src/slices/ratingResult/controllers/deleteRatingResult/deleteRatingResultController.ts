/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteRatingResult } from "@/slices/ratingResult/useCases";

export class DeleteRatingResultController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteRatingResult: DeleteRatingResult
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const ratingResultDeleteed = await this.deleteRatingResult({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(ratingResultDeleteed);
  }
}
