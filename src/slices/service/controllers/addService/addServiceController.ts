/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddService } from "@/slices/service/useCases";

export class AddServiceController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addService: AddService
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const serviceCreated = await this.addService({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(serviceCreated);
  }
}
