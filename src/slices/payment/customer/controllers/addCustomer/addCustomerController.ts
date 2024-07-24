/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddCustomer } from "@/slices/payment/customer/useCases";

export class AddCustomerController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addCustomer: AddCustomer
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const customerCreated = await this.addCustomer({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(customerCreated);
  }
}
