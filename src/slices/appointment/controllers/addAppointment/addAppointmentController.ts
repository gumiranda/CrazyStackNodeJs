/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddAppointment } from "@/slices/appointment/useCases";

export class AddAppointmentController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAppointment: AddAppointment
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const appointmentCreated = await this.addAppointment({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(appointmentCreated);
  }
}
