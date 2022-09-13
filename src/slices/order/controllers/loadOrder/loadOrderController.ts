/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadOrder } from "@/slices/order/useCases";

export class LoadOrderController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadOrder: LoadOrder
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const orderLoaded = await this.loadOrder({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(orderLoaded);
  }
}
