/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadTrend } from "@/slices/trend/useCases";

export class LoadTrendController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadTrend: LoadTrend
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const trendLoaded = await this.loadTrend({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(trendLoaded);
  }
}
