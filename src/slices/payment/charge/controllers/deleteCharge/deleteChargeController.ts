/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteCharge } from "@/slices/payment/charge/useCases";

export class DeleteChargeController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteCharge: DeleteCharge
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const chargeDeleteed = await this.deleteCharge({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(chargeDeleteed);
  }
}
