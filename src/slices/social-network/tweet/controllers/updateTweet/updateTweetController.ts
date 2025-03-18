/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import type { RemoveTrend, UpsertTrend } from "@/slices/social-network/trend/useCases";
import { UpdateTweet, type LoadTweet } from "@/slices/social-network/tweet/useCases";

export class UpdateTweetController extends Controller {
  constructor(
    private readonly validationQuery: Validation,
    private readonly validationBody: Validation,
    private readonly updateTweet: UpdateTweet,
    private readonly loadTweet: LoadTweet,
    private readonly upsertTrend: UpsertTrend,
    private readonly removeTrend: RemoveTrend
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errorsBody = this.validationBody.validate(httpRequest?.body);
    if (errorsBody?.length > 0) {
      return badRequest(errorsBody);
    }
    const errorsQuery = this.validationQuery.validate(httpRequest?.query);
    if (errorsQuery?.length > 0) {
      return badRequest(errorsQuery);
    }
    const oldTweet: any = await this.loadTweet({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    const oldTweetBody = oldTweet?.body ?? oldTweet?.[0]?.body;
    if (!oldTweetBody) {
      return badRequest("Tweet not found");
    }
    const newTweet = await this.updateTweet(
      {
        fields: {
          ...httpRequest?.query,
          createdById: httpRequest?.userId,
        },
        options: {},
      },
      httpRequest?.body
    );
    const oldHashtags: string[] = oldTweetBody.match(/#[a-zA-Z0-9_]+/g) || [];
    const newHashtags: string[] = newTweet?.body.match(/#[a-zA-Z0-9_]+/g) || [];

    // Process hashtags removed or added
    const removedHashtags = oldHashtags.filter((ht) => !newHashtags.includes(ht));
    const addedHashtags = newHashtags.filter((ht) => !oldHashtags.includes(ht));

    // for (const hashtag of removedHashtags) {
    //   await this.removeTrend({ hashtag });
    // }

    // for (const hashtag of addedHashtags) {
    //   await this.upsertTrend({ hashtag });
    // }
    await Promise.all([
      ...removedHashtags.map((hashtag) => this.removeTrend({ hashtag })),
      ...addedHashtags.map((hashtag) => this.upsertTrend({ hashtag })),
    ]);
    return ok(newTweet);
  }
}
