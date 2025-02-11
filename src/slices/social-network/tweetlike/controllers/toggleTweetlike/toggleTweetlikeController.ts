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
  AddTweetlike,
  type DeleteTweetlike,
  type LoadTweetlike,
} from "@/slices/social-network/tweetlike/useCases";

export class ToggleTweetlikeController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addTweetlike: AddTweetlike,
    private readonly loadTweetlike: LoadTweetlike,
    private readonly deleteTweetlike: DeleteTweetlike
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const hasLiked = await this.loadTweetlike({
      fields: { tweetId: httpRequest?.body?.tweetId, createdById: httpRequest?.userId },
    });
    if (hasLiked) {
      await this.deleteTweetlike({
        fields: { tweetId: httpRequest?.body?.tweetId, createdById: httpRequest?.userId },
      });
      return ok({ message: "Tweet disliked successfully" });
    }
    const tweetlikeCreated = await this.addTweetlike({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(tweetlikeCreated);
  }
}
