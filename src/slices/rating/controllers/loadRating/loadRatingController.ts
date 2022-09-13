/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadRating } from "@/slices/rating/useCases";

export class LoadRatingController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadRating: LoadRating
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const ratingLoaded = await this.loadRating({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(ratingLoaded);
  }
}
