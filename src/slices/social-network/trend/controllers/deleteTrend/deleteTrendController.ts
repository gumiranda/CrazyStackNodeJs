/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteTrend } from "@/slices/social-network/trend/useCases";

export class DeleteTrendController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteTrend: DeleteTrend
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const trendDeleteed = await this.deleteTrend({
      fields: { ...httpRequest?.query },
      options: {},
    });
    return ok(trendDeleteed);
  }
}
