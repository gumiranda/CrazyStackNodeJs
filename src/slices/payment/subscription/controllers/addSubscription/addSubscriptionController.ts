/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddSubscription } from "@/slices/payment/subscription/useCases";

export class AddSubscriptionController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSubscription: AddSubscription
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const subscriptionCreated = await this.addSubscription({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(subscriptionCreated);
  }
}
