/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadTransaction } from "@/slices/payment/transaction/useCases";

export class LoadTransactionController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadTransaction: LoadTransaction
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const transactionLoaded = await this.loadTransaction({
      fields: { createdById: httpRequest?.userId },
      options: {},
    });
    return ok(transactionLoaded);
  }
}
