/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadService } from "@/slices/service/useCases";

export class LoadServiceController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadService: LoadService
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const serviceLoaded = await this.loadService({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(serviceLoaded);
  }
}
