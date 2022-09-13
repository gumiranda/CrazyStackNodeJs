/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddFidelity } from "@/slices/fidelity/useCases";

export class AddFidelityController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addFidelity: AddFidelity
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const fidelityCreated = await this.addFidelity({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(fidelityCreated);
  }
}
