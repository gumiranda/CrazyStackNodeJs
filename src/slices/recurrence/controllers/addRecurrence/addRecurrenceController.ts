/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddRecurrence } from "@/slices/recurrence/useCases";

export class AddRecurrenceController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addRecurrence: AddRecurrence
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const recurrenceCreated = await this.addRecurrence({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(recurrenceCreated);
  }
}
