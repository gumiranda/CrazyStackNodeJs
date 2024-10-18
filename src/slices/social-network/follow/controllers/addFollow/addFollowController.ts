/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import {
  AddFollow,
  type DeleteFollow,
  type LoadFollow,
} from "@/slices/social-network/follow/useCases";

export class AddFollowController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addFollow: AddFollow,
    private readonly loadFollow: LoadFollow,
    private readonly deleteFollow: DeleteFollow
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const hasFollowed = await this.loadFollow({
      fields: { userId: httpRequest?.body?.userId, createdById: httpRequest?.userId },
    });
    if (hasFollowed) {
      await this.deleteFollow({
        fields: { userId: httpRequest?.body?.userId, createdById: httpRequest?.userId },
      });
      return ok({ message: "User unfollowed successfully" });
    }
    const followCreated = await this.addFollow({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(followCreated);
  }
}
