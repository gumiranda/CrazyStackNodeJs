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

    const fields =
      httpRequest?.userLogged?.role === "admin"
        ? httpRequest?.query
        : {
            ...httpRequest?.query,
            createdById: httpRequest?.userId,
          };
    const appointmentLoaded = await this.loadInvoice({
      fields,
      options: {},
    });
    return ok(appointmentLoaded);
  }
}
