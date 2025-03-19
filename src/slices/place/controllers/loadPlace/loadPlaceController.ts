/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadPlace } from "@/slices/place/useCases";

export class LoadPlaceController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadPlace: LoadPlace
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const placeLoaded = await this.loadPlace({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(placeLoaded);
  }
}
