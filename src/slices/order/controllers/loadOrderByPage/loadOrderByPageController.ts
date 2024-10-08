/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadOrderByPage } from "@/slices/order/useCases";

export class LoadOrderByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadOrderByPage: LoadOrderByPage
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const {
      page,
      sortBy = "createdAt",
      typeSort = "asc",
      ...rest
    } = httpRequest?.query || {};
    const fields =
      httpRequest?.userLogged?.role === "admin"
        ? rest
        : {
            ...rest,
            createdById: httpRequest?.userId,
          };
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page };
    const orderLoaded = await this.loadOrderByPage({
      fields,
      options,
    });
    return ok(orderLoaded);
  }
}
