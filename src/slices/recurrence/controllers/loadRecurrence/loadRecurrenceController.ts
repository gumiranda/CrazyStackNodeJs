/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadRecurrence } from "@/slices/recurrence/useCases";

export class LoadRecurrenceController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadRecurrence: LoadRecurrence
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const recurrenceLoaded = await this.loadRecurrence({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(recurrenceLoaded);
  }
}
