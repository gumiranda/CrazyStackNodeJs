/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddPhoto } from "@/slices/photo/useCases";

export class AddPhotoController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addPhoto: AddPhoto
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const photoCreated = await this.addPhoto({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(photoCreated);
  }
}
