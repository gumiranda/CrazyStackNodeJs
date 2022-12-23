/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteFidelity } from "@/slices/fidelity/useCases";

export class DeleteFidelityController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteFidelity: DeleteFidelity
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const fidelityDeleteed = await this.deleteFidelity({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(fidelityDeleteed);
  }
}
