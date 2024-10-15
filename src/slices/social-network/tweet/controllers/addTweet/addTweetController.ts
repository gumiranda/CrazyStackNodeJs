/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddTweet } from "@/slices/social-network/tweet/useCases";

export class AddTweetController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addTweet: AddTweet
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
    return ok(tweetCreated);
  }
}
