/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadSubscription } from "@/slices/payment/subscription/useCases";

export class LoadSubscriptionController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadSubscription: LoadSubscription
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const subscriptionLoaded = await this.loadSubscription({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(subscriptionLoaded);
  }
}
