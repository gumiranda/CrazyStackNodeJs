/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadCar } from "@/slices/car/useCases";

export class LoadCarController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadCar: LoadCar
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const carLoaded = await this.loadCar({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(carLoaded);
  }
}
