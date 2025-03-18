/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import type { RemoveTrend } from "@/slices/social-network/trend/useCases";
import { DeleteTweet, type LoadTweet } from "@/slices/social-network/tweet/useCases";

export class DeleteTweetController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteTweet: DeleteTweet,
    private readonly loadTweet: LoadTweet,
    private readonly removeTrend: RemoveTrend
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const currentTweet = await this.loadTweet({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    if (!currentTweet) {
      return badRequest("Tweet not found");
    }
    const tweetDeleted = await this.deleteTweet({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    const hashtags = currentTweet?.body.match(/#[a-zA-Z0-9_]+/g) || [];

    await Promise.all(hashtags.map((hashtag) => this.removeTrend({ hashtag })));
    return ok(tweetDeleted);
  }
}
