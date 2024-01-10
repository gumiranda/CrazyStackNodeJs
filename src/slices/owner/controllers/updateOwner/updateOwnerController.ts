/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { UpdateOwner } from "@/slices/owner/useCases";
import { daysValidator, handleHoursErrors } from "@/slices/owner/validations";

export class UpdateOwnerController extends Controller {
  constructor(
    private readonly validationQuery: Validation,
    private readonly validationBody: Validation,
    private readonly updateOwner: UpdateOwner
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errorsBody = this.validationBody.validate(httpRequest?.body);
    if (httpRequest?.body?.days1) {
      daysValidator({ errors: errorsBody, body: httpRequest?.body });
    }
    if (
      httpRequest?.body?.hourStart1 ||
      httpRequest?.body?.hourEnd1 ||
      httpRequest?.body?.hourStart2 ||
      httpRequest?.body?.hourEnd2 ||
      httpRequest?.body?.hourStart3 ||
      httpRequest?.body?.hourEnd3 ||
      httpRequest?.body?.hourLunchStart1 ||
      httpRequest?.body?.hourLunchEnd1 ||
      httpRequest?.body?.hourLunchStart2 ||
      httpRequest?.body?.hourLunchEnd2 ||
      httpRequest?.body?.hourLunchStart3 ||
      httpRequest?.body?.hourLunchEnd3
    ) {
      handleHoursErrors({ errors: errorsBody, body: httpRequest?.body });
    }
    if (errorsBody?.length > 0) {
      return badRequest(errorsBody);
    }
    const errorsQuery = this.validationQuery.validate(httpRequest?.query);
    if (errorsQuery?.length > 0) {
      return badRequest(errorsQuery);
    }
    const ownerUpdated = await this.updateOwner(
      {
        fields: {
          ...httpRequest?.query,
          createdById: httpRequest?.userId,
        },
        options: {},
      },
      httpRequest?.body
    );
    return ok(ownerUpdated);
  }
}
