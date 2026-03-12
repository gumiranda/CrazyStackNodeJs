/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadOwner } from "@/slices/owner/useCases";
import type { LoadServiceByPage } from "@/slices/service/useCases";

export class LoadOwnerController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadOwner: LoadOwner,
    private readonly loadServiceByPage: LoadServiceByPage
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const ownerLoaded = await this.loadOwner({
      fields: httpRequest?.query,
      options: {},
    });
    const defaultValues = { page: 1, sortBy: "createdAt", typeSort: "asc" };
    const { page, sortBy, typeSort } = defaultValues;
    const fields = {
      createdById: ownerLoaded?.createdById,
    };
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page, limitPerPage: 100 };
    const services = await this.loadServiceByPage({
      fields,
      options,
    });
    return ok({ ...ownerLoaded, services });
  }
}
