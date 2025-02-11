/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddTrend } from "@/slices/social-network/trend/useCases";

export class AddTrendController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addTrend: AddTrend
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const trendCreated = await this.addTrend({
      ...httpRequest?.body,
    });
    return ok(trendCreated);
  }
}
