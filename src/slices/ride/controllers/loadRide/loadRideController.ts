/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadRide } from "@/slices/ride/useCases";

export class LoadRideController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadRide: LoadRide
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const rideLoaded = await this.loadRide({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(rideLoaded);
  }
}
