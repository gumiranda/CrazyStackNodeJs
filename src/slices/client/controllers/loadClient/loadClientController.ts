/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadClient } from "@/slices/client/useCases";

export class LoadClientController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadClient: LoadClient
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const clientLoaded = await this.loadClient({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(clientLoaded);
  }
}
