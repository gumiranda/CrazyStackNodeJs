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
import { type UpdateUser } from "@/slices/user/useCases";
import { InvalidParamError } from "@/application/errors";
import { generateToken } from "@/application/helpers/utils/generateToken";
import { sendMessage } from "@/application/infra/messaging";

export class ResendVerificationEmailController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateUser: UpdateUser
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { email } = httpRequest?.body;
    const token = generateToken();

    const userUpdated = await this.updateUser(
      {
        fields: { email },
      },
      { token }
    );
    if (!userUpdated) {
      return forbidden(new InvalidParamError("email"));
    }
    const msg = {
      userCreated: {
        email,
      },
    };
    const message = JSON.stringify(msg);
    await sendMessage({
      topic: "resendEmailVerification",
      message,
    });
    return ok({ message: "Email sent successfully" });
  }
}
