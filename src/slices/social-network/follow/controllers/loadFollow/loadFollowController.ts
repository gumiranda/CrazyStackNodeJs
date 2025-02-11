/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadFollow } from "@/slices/social-network/follow/useCases";

export class LoadFollowController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadFollow: LoadFollow
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const followLoaded = await this.loadFollow({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(followLoaded);
  }
}
