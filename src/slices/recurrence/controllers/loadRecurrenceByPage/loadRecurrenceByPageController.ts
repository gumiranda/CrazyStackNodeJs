/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadRecurrenceByPage } from "@/slices/recurrence/useCases";

export class LoadRecurrenceByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadRecurrenceByPage: LoadRecurrenceByPage
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { page, sortBy, typeSort = "asc", ...rest } = httpRequest?.query || {};
    const fields = rest;
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page };
    const recurrenceLoaded = await this.loadRecurrenceByPage({
      fields,
      options,
    });
    return ok(recurrenceLoaded);
  }
}
