/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadUserByPage } from "@/slices/user/useCases";

export class LoadUserByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUserByPage: LoadUserByPage
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
      !httpRequest?.userLogged?.role ||
      httpRequest?.userLogged?.role === "admin" ||
      httpRequest?.userLogged?.role === "client"
        ? rest
        : {
            ...rest,
            createdById: httpRequest?.userId,
          };
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page };
    const userLoaded = await this.loadUserByPage({
      fields,
      options,
    });
    return ok(userLoaded);
  }
}
