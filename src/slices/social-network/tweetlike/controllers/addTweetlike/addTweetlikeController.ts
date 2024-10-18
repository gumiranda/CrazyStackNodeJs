/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddTweetlike } from "@/slices/tweetlike/useCases";

export class AddTweetlikeController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addTweetlike: AddTweetlike
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const tweetlikeCreated = await this.addTweetlike({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(tweetlikeCreated);
  }
}
