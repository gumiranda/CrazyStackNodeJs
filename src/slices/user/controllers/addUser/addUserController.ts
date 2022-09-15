/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddUser } from "@/slices/user/useCases";

export class AddUserController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addUser: AddUser
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const userCreated = await this.addUser({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(userCreated);
  }
}
