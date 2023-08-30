/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddRide } from "@/slices/ride/useCases";

export class AddRideController extends Controller {
  constructor(private readonly validation: Validation, private readonly addRide: AddRide) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const rideCreated = await this.addRide({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(rideCreated);
  }
}
