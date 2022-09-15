/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddOwner } from "@/slices/owner/useCases";

export class AddOwnerController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addOwner: AddOwner
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const ownerCreated = await this.addOwner({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(ownerCreated);
  }
}
