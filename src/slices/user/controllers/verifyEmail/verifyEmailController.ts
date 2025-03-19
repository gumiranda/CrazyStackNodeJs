/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  forbidden,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadUser, type UpdateUser } from "@/slices/user/useCases";
import { InvalidParamError } from "@/application/errors";

export class VerifyEmailController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateUser: UpdateUser,
    private readonly loadUser: LoadUser
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { email, code } = httpRequest?.body;
    const user = await this.loadUser({
      fields: { email },
      options: { projection: { password: 0 } },
    });
    if (!user) {
      return forbidden(new InvalidParamError("email"));
    }
    if (user?.token !== code) {
      return forbidden(new InvalidParamError("code"));
    }
    const userUpdated = await this.updateUser(
      {
        fields: { _id: user?._id },
      },
      { token: null, confirmedEmail: true }
    );
    if (!userUpdated) {
      return forbidden(new InvalidParamError("code"));
    }
    return ok({ message: "Email verified" });
  }
}
