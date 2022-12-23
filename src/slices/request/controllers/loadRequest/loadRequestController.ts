/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadRequest } from "@/slices/request/useCases";

export class LoadRequestController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadRequest: LoadRequest
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const requestLoaded = await this.loadRequest({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(requestLoaded);
  }
}
