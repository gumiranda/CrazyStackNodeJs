/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddTransaction } from "@/slices/payment/transaction/useCases";

export class AddTransactionController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addTransaction: AddTransaction
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const transactionCreated = await this.addTransaction({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(transactionCreated);
  }
}
