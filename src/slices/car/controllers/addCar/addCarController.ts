/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddCar } from "@/slices/car/useCases";

export class AddCarController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addCar: AddCar
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const carCreated = await this.addCar({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(carCreated);
  }
}
