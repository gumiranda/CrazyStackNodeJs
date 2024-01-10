/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteAppointment } from "@/slices/appointment/useCases";

export class DeleteAppointmentController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteAppointment: DeleteAppointment
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const appointmentDeleteed = await this.deleteAppointment({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(appointmentDeleteed);
  }
}
