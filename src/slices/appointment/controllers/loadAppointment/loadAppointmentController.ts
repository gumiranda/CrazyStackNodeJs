/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadAppointment } from "@/slices/appointment/useCases";

export class LoadAppointmentController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadAppointment: LoadAppointment
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const appointmentLoaded = await this.loadAppointment({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(appointmentLoaded);
  }
}
