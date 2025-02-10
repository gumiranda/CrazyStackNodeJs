/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import type { UpsertTrend } from "@/slices/social-network/trend/useCases";
import { AddTweet } from "@/slices/social-network/tweet/useCases";

export class AddTweetController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addTweet: AddTweet,
    private readonly upsertTrend: UpsertTrend
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const tweetCreated = await this.addTweet({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    const hashtags = tweetCreated?.body.match(/#[a-zA-Z0-9_]+/g);
    if (hashtags) {
      for (const hashtag of hashtags) {
        if (hashtag?.length >= 2) {
          await this.upsertTrend({
            hashtag,
          });
        }
      }
    }
    return ok(tweetCreated);
  }
}
