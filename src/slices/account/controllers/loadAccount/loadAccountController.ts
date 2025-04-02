/* eslint-disable no-unsafe-optional-chaining */
import {
  Authentication,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  unauthorized,
  addDays,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadAccount, AddAccount } from "@/slices/account/useCases";
import { env } from "@/application/infra";

export class LoadAccountController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadAccount: LoadAccount,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const fields = {
      createdById: httpRequest?.userId,
      refreshToken: httpRequest?.cookies?.refreshToken,
    };
    if (env.database === "mongodb") {
      Object.assign(fields, {
        isFutureexpiresAt: new Date(),
      });
    }
    const accountExists = await this.loadAccount({
      fields,
      options: {},
    });
    if (!accountExists || !accountExists?.expiresAt) {
      return unauthorized();
    }
    if (new Date(accountExists?.expiresAt) < new Date()) {
      return unauthorized();
    }
    const { accessToken = null, refreshToken = null } =
      (await this.authentication.authRefreshToken(httpRequest?.userId as string)) || {};
    if (!accessToken || !refreshToken) {
      return unauthorized();
    }
    await this.addAccount({
      createdById: httpRequest?.userId as string,
      name: accountExists?.name as string,
      refreshToken,
      active: true,
      expiresAt: addDays(new Date(), 1) as unknown as string,
    });
    const response = ok({ accessToken });
    response.cookies = [
      {
        name: "refreshToken",
        value: refreshToken,
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax", // Alterado para lax para permitir requisições cross-origin
          path: "/",
          maxAge: 1 * 24 * 60 * 60 * 1000, // 90 dias em milissegundos
        },
      },
    ];
    return response;
  }
}
