/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadCustomer } from "@/slices/payment/customer/useCases";

export class LoadCustomerController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadCustomer: LoadCustomer
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const customerLoaded = await this.loadCustomer({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(customerLoaded);
  }
}
