/* eslint-disable no-unsafe-optional-chaining */
import {
  Authentication,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  unauthorized,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadAccount } from "@/slices/account/useCases";
import { LoadUser } from "@/slices/user/useCases";

export class WhoAmIController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadAccount: LoadAccount,
    private readonly loadUser: LoadUser,
    private readonly authentication: Authentication
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const accountExists = await this.loadAccount({
      fields: {
        createdById: httpRequest?.userId,
        refreshToken: httpRequest?.cookies?.refreshToken,
        isFutureexpiresAt: new Date(),
      },
      options: {},
    });
    if (!accountExists) {
      return unauthorized();
    }
    const { accessToken = null, refreshToken = null } =
      (await this.authentication.authRefreshToken(httpRequest?.userId as string)) || {};
    if (!accessToken || !refreshToken) {
      return unauthorized();
    }
    const user = await this.loadUser({
      fields: { _id: httpRequest?.userId as string },
      options: {},
    });
    if (!user) {
      return unauthorized();
    }

    // Configura o novo refresh token como cookie
    const response = ok({ user });
    response.cookies = [
      {
        name: "refreshToken",
        value: refreshToken,
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax", // Alterado para lax para permitir requisições cross-origin
          path: "/",
          maxAge: 90 * 24 * 60 * 60 * 1000, // 90 dias em milissegundos
        },
      },
    ];

    return response;
  }
}
