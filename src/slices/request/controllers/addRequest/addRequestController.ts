/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddRequest } from "@/slices/request/useCases";

export class AddRequestController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addRequest: AddRequest
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const requestCreated = await this.addRequest({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(requestCreated);
  }
}
