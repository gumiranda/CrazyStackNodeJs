/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteTweet } from "@/slices/social-network/tweet/useCases";

export class DeleteTweetController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteTweet: DeleteTweet
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const tweetDeleteed = await this.deleteTweet({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(tweetDeleteed);
  }
}
