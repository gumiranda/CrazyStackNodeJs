/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeletePhoto } from "@/slices/photo/useCases";

export class DeletePhotoController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deletePhoto: DeletePhoto
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const photoDeleteed = await this.deletePhoto({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(photoDeleteed);
  }
}
