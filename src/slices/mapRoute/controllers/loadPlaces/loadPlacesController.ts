/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { Places } from "@/application/infra/maps";

export class LoadPlacesController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadPlaces: Places
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const placesLoaded = await this.loadPlaces.findPlace(httpRequest?.query?.text);
    return ok(placesLoaded);
  }
}
