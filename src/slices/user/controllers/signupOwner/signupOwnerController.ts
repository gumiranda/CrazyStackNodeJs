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
import { AddUser, LoadUser } from "@/slices/user/useCases";
import { AddAccount } from "@/slices/account/useCases";
import { EmailInUseError, InvalidParamError } from "@/application/errors";
import emailValidator from "deep-email-validator";
import { AddCategory } from "@/slices/category/useCases";
import { AddService } from "@/slices/service/useCases";
import { AddOwner } from "@/slices/owner/useCases";

export class SignupOwnerController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addUser: AddUser,
    private readonly loadUser: LoadUser,
    private readonly authentication: Authentication,
    private readonly addAccount: AddAccount,
    private readonly addCategory: AddCategory,
    private readonly addService: AddService,
    private readonly addOwner: AddOwner
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { email, password } = httpRequest?.body;

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
    const userExists = await this.loadUser({
      fields: { email },
      options: { projection: { password: 0 } },
    });
    if (userExists) {
      return forbidden(new EmailInUseError());
    }
    delete httpRequest?.body?.passwordConfirmation;
    const userCreated = await this.addUser(httpRequest?.body);
    const { accessToken = null, refreshToken = null } =
      (await this.authentication.auth(email, password)) || {};
    if (!accessToken || !refreshToken) {
      return unauthorized();
    }
    await this.addAccount({
      createdById: userCreated?._id as string,
      name: userCreated?.name as string,
      refreshToken,
      active: true,
      expiresAt: addDays(new Date(), 1) as unknown as string,
    });
    const categoryData: any = await this.addCategory({
      name: "Beleza e Estética",
      createdById: userCreated?._id as string,
      active: true,
    });
    const serviceData: any = await this.addService({
      name: "Corte de Cabelo",
      categoryId: categoryData?._id,
      duration: 30,
      createdById: userCreated?._id as string,
      active: true,
    });
    const ownerData: any = await this.addOwner({
      createdById: userCreated?._id as string,
      minimumTimeForReSchedule: 30,
      name: userCreated?.name as string,
      hourStart1: "9:00",
      hourEnd1: "18:00",
      hourStart2: "08:00",
      hourEnd2: "18:00",
      hourStart3: "08:00",
      hourEnd3: "18:00",
      hourLunchStart1: "12:00",
      hourLunchEnd1: "13:00",
      days1: {
        monday1: true,
        tuesday1: true,
        wednesday1: true,
        thursday1: true,
        friday1: true,
        saturday1: false,
        sunday1: false,
      },
      days2: {
        monday2: false,
        tuesday2: false,
        wednesday2: false,
        thursday2: false,
        friday2: false,
        saturday2: false,
        sunday2: false,
      },
      days3: {
        monday3: false,
        tuesday3: false,
        wednesday3: false,
        thursday3: false,
        friday3: false,
        saturday3: false,
        sunday3: false,
      },
      haveDelivery: false,
      appointmentsTotal: 0,
      ratingsTotal: 0,
      typeTax: "fixed",
      active: true,
    });
    const professionalData: any = await this.addUser({
      name: userCreated?.name as string,
      createdById: userCreated?._id as string,
      serviceIds: [serviceData?._id?.toString?.()],
      email: ("profissional" + userCreated?.email) as string,
      role: "professional",
      password: password as string,
      ownerId: userCreated?._id as string,
      myOwnerId: ownerData?._id as string,
      active: true,
    });
    const clientData: any = await this.addUser({
      name: userCreated?.name as string,
      createdById: userCreated?._id as string,
      email: ("cliente" + userCreated?.email) as string,
      role: "client",
      password: password as string,
      active: true,
    });
    console.log({ professionalData, clientData, categoryData, serviceData, ownerData });
    return ok({ user: userCreated, accessToken, refreshToken });
  }
}
