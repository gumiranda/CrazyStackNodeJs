/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddPlace } from "@/slices/place/useCases";

export class AddPlaceController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addPlace: AddPlace
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const placeCreated = await this.addPlace({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(placeCreated);
  }
}
