/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadSubscriptionByPage } from "@/slices/payment/subscription/useCases";

export class LoadSubscriptionByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadSubscriptionByPage: LoadSubscriptionByPage
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const {
      page,
      sortBy = "createdAt",
      typeSort = "asc",
      ...rest
    } = httpRequest?.query || {};
    const fields = rest;
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page };
    const subscriptionLoaded = await this.loadSubscriptionByPage({
      fields,
      options,
    });
    return ok(subscriptionLoaded);
  }
}
