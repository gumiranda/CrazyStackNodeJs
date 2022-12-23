/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadFidelity } from "@/slices/fidelity/useCases";

export class LoadFidelityController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadFidelity: LoadFidelity
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const fidelityLoaded = await this.loadFidelity({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(fidelityLoaded);
  }
}
