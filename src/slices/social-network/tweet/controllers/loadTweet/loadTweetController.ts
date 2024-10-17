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
    const tweetLoaded: any = await this.loadTweet({
      fields: httpRequest?.query,
      options: {
        include: {
          createdBy: true, //pg
          tweet: true, //pg
          tweetlike: true, //pg
        },
      },
    });
    if (Array.isArray(tweetLoaded) && tweetLoaded?.[0]) {
      const tweetWithLikes = {
        ...tweetLoaded?.[0],
        tweetlike:
          tweetLoaded?.[0]?.tweetlikeId?.length > 0
            ? tweetLoaded?.map?.(({ tweetlikeId, userId }: any) => ({
                userId,
                tweetlikeId,
              }))
            : null,
      };
      delete tweetWithLikes?.tweetlikeId;
      return ok(tweetWithLikes);
    }
    return ok(tweetLoaded);
  }
}
