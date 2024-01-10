/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteRecurrence } from "@/slices/recurrence/useCases";

export class DeleteRecurrenceController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteRecurrence: DeleteRecurrence
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const recurrenceDeleteed = await this.deleteRecurrence({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(recurrenceDeleteed);
  }
}
