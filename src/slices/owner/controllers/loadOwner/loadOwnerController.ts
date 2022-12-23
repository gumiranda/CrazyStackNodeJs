/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadOwner } from "@/slices/owner/useCases";

export class LoadOwnerController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadOwner: LoadOwner
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const ownerLoaded = await this.loadOwner({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(ownerLoaded);
  }
}
