/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteSubscription } from "@/slices/payment/subscription/useCases";

export class DeleteSubscriptionController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteSubscription: DeleteSubscription
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const subscriptionDeleteed = await this.deleteSubscription({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(subscriptionDeleteed);
  }
}
