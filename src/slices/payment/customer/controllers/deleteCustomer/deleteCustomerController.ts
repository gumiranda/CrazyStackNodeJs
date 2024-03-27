/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteCustomer } from "@/slices/payment/customer/useCases";

export class DeleteCustomerController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteCustomer: DeleteCustomer
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const customerDeleteed = await this.deleteCustomer({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(customerDeleteed);
  }
}
