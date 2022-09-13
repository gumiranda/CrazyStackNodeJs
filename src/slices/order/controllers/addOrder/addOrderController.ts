/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddOrder } from "@/slices/order/useCases";

export class AddOrderController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addOrder: AddOrder
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const orderCreated = await this.addOrder({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(orderCreated);
  }
}
