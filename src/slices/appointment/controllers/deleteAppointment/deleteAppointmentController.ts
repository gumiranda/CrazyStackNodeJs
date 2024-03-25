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
import { IUpdateRequestById, UpdateRequest } from "@/slices/request/useCases";

export class DeleteAppointmentController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteAppointment: DeleteAppointment,
    private readonly updateRequest: IUpdateRequestById,
    private readonly updateReq: UpdateRequest
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const requestUpdated = await this.updateReq(
      {
        fields: { _id: httpRequest?.query?.requestId },
        options: {},
      },
      {
        updatedById: httpRequest?.userId,
        updatedByRole: httpRequest?.userLogged?.role,
        status: httpRequest?.userLogged?.role === "owner" ? 2 : 3,
      } as any
    );
    if (!requestUpdated) {
      return badRequest("Request not found");
    }
    const appointmentDeleteed = await this.deleteAppointment({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    if (!appointmentDeleteed) {
      return badRequest("Appointment not found");
    }

    return ok(appointmentDeleteed);
  }
}
