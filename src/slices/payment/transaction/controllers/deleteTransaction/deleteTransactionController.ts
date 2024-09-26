/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteTransaction } from "@/slices/payment/transaction/useCases";

export class DeleteTransactionController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteTransaction: DeleteTransaction
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const transactionDeleteed = await this.deleteTransaction({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(transactionDeleteed);
  }
}
