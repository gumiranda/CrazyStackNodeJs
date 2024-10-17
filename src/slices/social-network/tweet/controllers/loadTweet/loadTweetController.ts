/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadTweet } from "@/slices/social-network/tweet/useCases";

export class LoadTweetController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadTweet: LoadTweet
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const tweetLoaded = await this.loadTweet({
      fields: httpRequest?.query,
      options: {
        include: { createdBy: true, tweet: true, tweetlike: true },
      },
    });
    return ok(tweetLoaded);
  }
}
