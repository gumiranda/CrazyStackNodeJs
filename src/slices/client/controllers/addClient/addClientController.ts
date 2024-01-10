/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddClient } from "@/slices/client/useCases";

export class AddClientController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addClient: AddClient
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const clientCreated = await this.addClient({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(clientCreated);
  }
}
