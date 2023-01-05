/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
  serverError,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddOwner, LoadOwner } from "@/slices/owner/useCases";
import { daysValidator, handleHoursErrors } from "@/slices/owner/validations";
import { UpdateUser } from "@/slices/user/useCases";

export class AddOwnerController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addOwner: AddOwner,
    private readonly loadOwner: LoadOwner,
    private readonly updateUser: UpdateUser
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    daysValidator({ errors, body: httpRequest?.body });
    handleHoursErrors({ errors, body: httpRequest?.body });
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const ownerExists = await this.loadOwner({
      fields: { createdById: httpRequest?.userId },
      options: {},
    });
    if (ownerExists && httpRequest?.userLogged?.role !== "admin") {
      return badRequest([{ field: "createdById", message: "Owner already exists" }]);
    }
    const ownerCreated = await this.addOwner({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    if (ownerCreated) {
      const userUpdated = await this.updateUser(
        {
          fields: { _id: httpRequest?.userId },
          options: {},
        },
        { ownerId: ownerCreated._id }
      );
      if (userUpdated) {
        return serverError(new Error("User not updated"));
      }
    }
    return ok(ownerCreated);
  }
}
