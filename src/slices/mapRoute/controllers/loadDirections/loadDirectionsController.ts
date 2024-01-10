/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { Directions } from "@/application/infra/maps";

export class LoadDirectionsController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadDirections: Directions
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const directionsLoaded = await this.loadDirections.getDirections(
      httpRequest?.query?.originId,
      httpRequest?.query?.destinationId
    );
    return ok(directionsLoaded);
  }
}
