/* eslint-disable no-unsafe-optional-chaining */
import {
  Authentication,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  forbidden,
  unauthorized,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddUser, CompleteOwner, LoadUser } from "@/slices/user/useCases";
import { EmailInUseError, InvalidParamError } from "@/application/errors";
import emailValidator from "deep-email-validator";
import slug from "slug";
import { generateToken } from "@/application/helpers/utils/generateToken";
export class SignupController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addUser: AddUser,
    private readonly loadUser: LoadUser,
    private readonly authentication: Authentication,
    private readonly completeOwner: CompleteOwner
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { email, password, role, cpf, cnpj } = httpRequest?.body;
    //  if (env.environment !== "test") {
    const { validators = null } = (await emailValidator(email)) || {};
    const {
      regex = null,
      typo = null,
      disposable = null,
      smtp = null,
      mx = null,
    } = validators || {};
    if (
      !regex?.valid ||
      !typo?.valid ||
      !disposable?.valid ||
      (!smtp?.valid && smtp?.reason !== "Timeout") ||
      !mx?.valid
    ) {
      return badRequest([new InvalidParamError("email")]);
    }
    // }
    const userValidation = [
      this.loadUser({
        fields: { email },
        options: { projection: { password: 0 } },
      }),
    ];
    if (cpf?.length > 0) {
      userValidation.push(
        this.loadUser({
          fields: { cpf },
          options: { projection: { password: 0 } },
        })
      );
    }
    if (cnpj?.length > 0) {
      userValidation.push(
        this.loadUser({
          fields: { cnpj },
          options: { projection: { password: 0 } },
        })
      );
    }
    const userValidationResult = await Promise.all(userValidation);
    for (const user of userValidationResult) {
      if (user) {
        return forbidden(new EmailInUseError());
      }
    }
    delete httpRequest?.body?.passwordConfirmation;
    let genSlug = true;
    let userSlug = slug(httpRequest?.body?.name);
    while (genSlug) {
      const hasSlug = await this.loadUser({
        fields: { slug: userSlug },
        options: { projection: { password: 0 } },
      });
      if (hasSlug) {
        const slugSuffix = Math.floor(Math.random() * 9999999).toString();
        userSlug = slug(`${httpRequest?.body?.name} ${slugSuffix}`);
      } else {
        genSlug = false;
      }
    }
    const token = generateToken();
    const userCreated = await this.addUser({
      ...httpRequest?.body,
      slug: userSlug,
      token,
    });
    const { accessToken = null, refreshToken = null } =
      (await this.authentication.auth(email, password)) || {};
    if (!accessToken || !refreshToken) {
      return unauthorized();
    }
    if (role === "owner") {
      await this.completeOwner({
        _id: userCreated?._id as string,
        email,
        password,
        name: userCreated?.name as string,
        phone: userCreated?.phone as string,
        cpf: userCreated?.cpf ?? "",
        cnpj: userCreated?.cnpj ?? "",
      });
    }
    return ok({ user: userCreated, accessToken, refreshToken });
  }
}
