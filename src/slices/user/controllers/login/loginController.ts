/* eslint-disable no-unsafe-optional-chaining */
import {
  Authentication,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  forbidden,
  unauthorized,
  addDays,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadUser } from "@/slices/user/useCases";
import { AddAccount } from "@/slices/account/useCases";
import { EmailInUseError } from "@/application/errors";

export class LoginController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUser: LoadUser,
    private readonly authentication: Authentication,
    private readonly addAccount: AddAccount
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { email, password } = httpRequest?.body;

    const userExists = await this.loadUser({
      fields: { email },
      options: { projection: { password: 0 } },
    });
    if (!userExists) {
      return forbidden(new EmailInUseError());
    }
    delete httpRequest?.body?.passwordConfirmation;
    const { accessToken = null, refreshToken = null } =
      (await this.authentication.auth(email, password)) || {};
    if (!accessToken || !refreshToken) {
      return unauthorized();
    }
    await this.addAccount({
      createdById: userExists?._id as string,
      name: userExists?.name as string,
      refreshToken,
      active: true,
      expiresAt: addDays(new Date(), 1) as unknown as string,
    });
    return ok({ user: userExists, accessToken, refreshToken });
  }
}
