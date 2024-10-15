/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddFollow } from "@/slices/social-network/follow/useCases";

export class AddFollowController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addFollow: AddFollow
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const followCreated = await this.addFollow({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(followCreated);
  }
}
