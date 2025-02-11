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
    const tweetUpdated = await this.updateTweet(
      {
        fields: {
          ...httpRequest?.query,
          createdById: httpRequest?.userId,
        },
        options: {},
      },
      httpRequest?.body
    );
    return ok(tweetUpdated);
  }
}
