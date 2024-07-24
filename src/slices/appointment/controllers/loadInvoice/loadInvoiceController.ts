/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadInvoice } from "@/slices/appointment/useCases";

export class LoadInvoiceController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadInvoice: LoadInvoice
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const appointmentLoaded = await this.loadInvoice({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(appointmentLoaded);
  }
}
