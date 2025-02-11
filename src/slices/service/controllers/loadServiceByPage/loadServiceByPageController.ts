/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadServiceByPage } from "@/slices/service/useCases";

export class LoadServiceByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadServiceByPage: LoadServiceByPage
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
      limitPerPage = 10,
      ...rest
    } = httpRequest?.query || {};
    const fields =
      !httpRequest?.userLogged?.role ||
      httpRequest?.userLogged?.role === "admin" ||
      httpRequest?.userLogged?.role === "client"
        ? rest
        : {
            ...rest,
            createdById: httpRequest?.userId,
          };
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page, limitPerPage };
    const serviceLoaded = await this.loadServiceByPage({
      fields,
      options,
    });
    return ok(serviceLoaded);
  }
}
