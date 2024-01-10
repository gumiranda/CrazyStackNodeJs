/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadRatingResult } from "@/slices/ratingResult/useCases";

export class LoadRatingResultController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadRatingResult: LoadRatingResult
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const ratingResultLoaded = await this.loadRatingResult({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(ratingResultLoaded);
  }
}
