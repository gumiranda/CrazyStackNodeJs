/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddCharge } from "@/slices/payment/charge/useCases";

export class AddChargeController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addCharge: AddCharge
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const chargeCreated = await this.addCharge({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(chargeCreated);
  }
}
