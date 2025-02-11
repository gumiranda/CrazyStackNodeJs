import { ValidateAvailableTimes } from "@/slices/appointment/useCases";
/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { IUpdateRequestById } from "@/slices/request/useCases";

export class UpdateRequestController extends Controller {
  constructor(
    private readonly validationQuery: Validation,
    private readonly validationBody: Validation,
    private readonly updateRequest: IUpdateRequestById,
    private readonly validateAvailableTimes: ValidateAvailableTimes
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errorsBody = this.validationBody.validate(httpRequest?.body);
    if (errorsBody?.length > 0) {
      return badRequest(errorsBody);
    }
    const errorsQuery = this.validationQuery.validate(httpRequest?.query);
    if (errorsQuery?.length > 0) {
      return badRequest(errorsQuery);
    }
    const appointmentIsValid = await this.validateAvailableTimes({
      date: httpRequest?.body?.date,
      initDate: httpRequest?.body?.initDate,
      endDate: httpRequest?.body?.endDate,
      professionalId: httpRequest?.body?.professionalId,
      ownerId: httpRequest?.body?.ownerId,
      serviceId: httpRequest?.body?.serviceId,
    });
    let newStatus = httpRequest?.body?.status;
    const validStatusArray = [0, 5, 6];
    if (!appointmentIsValid && validStatusArray?.includes?.(newStatus)) {
      return badRequest(errorsBody);
    }
    const confirmedStatusArray = [1, 7];
    if (!appointmentIsValid && confirmedStatusArray?.includes?.(newStatus)) {
      newStatus = 4;
    }
    const requestToUpdate = httpRequest?.body;
    delete requestToUpdate.date;
    delete requestToUpdate.value;
    delete requestToUpdate.statusLabel;
    delete requestToUpdate.initDateFormatted;
    delete requestToUpdate.endDateFormatted;
    delete requestToUpdate.datePickerSelected;
    delete requestToUpdate.endHour;
    delete requestToUpdate.initHour;
    const requestUpdated = await this.updateRequest.updateRequestById(
      httpRequest?.query?._id,
      {
        ...httpRequest?.body,
        updatedById: httpRequest?.userId,
        updatedByRole: httpRequest?.userLogged?.role,
        status: newStatus,
      }
    );
    return ok(requestUpdated);
  }
}
