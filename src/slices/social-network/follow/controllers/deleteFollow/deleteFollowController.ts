/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteFollow } from "@/slices/follow/useCases";

export class DeleteFollowController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteFollow: DeleteFollow
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const followDeleteed = await this.deleteFollow({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(followDeleteed);
  }
}
