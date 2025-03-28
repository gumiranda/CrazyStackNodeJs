/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadTweetlike } from "@/slices/social-network/tweetlike/useCases";

export class LoadTweetlikeController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadTweetlike: LoadTweetlike
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const tweetlikeLoaded = await this.loadTweetlike({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(tweetlikeLoaded);
  }
}
