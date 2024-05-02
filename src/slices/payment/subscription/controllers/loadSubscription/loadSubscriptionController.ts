/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadChargeByCustomer } from "@/slices/payment/charge/useCases/loadChargeByCustomer";
import { LoadSubscription } from "@/slices/payment/subscription/useCases";

export class LoadSubscriptionController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadSubscription: LoadSubscription,
    private readonly loadChargeByCustomer: LoadChargeByCustomer
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }

    const subscriptionLoaded = await this.loadSubscription({
      fields: {
        globalID: httpRequest?.userLogged?.globalID,
        createdById: httpRequest?.userId,
      },
      options: {},
    });
    const chargeByCustomer = await this.loadChargeByCustomer({
      fields: {
        correlationID: subscriptionLoaded?.gatewayDetails?.customer?.correlationID,
      },
      options: {},
    });
    return ok({ ...subscriptionLoaded, chargeByCustomer });
  }
}
