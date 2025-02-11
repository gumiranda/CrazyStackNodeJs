/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteTweetlike } from "@/slices/social-network/tweetlike/useCases";

export class DeleteTweetlikeController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteTweetlike: DeleteTweetlike
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const tweetlikeDeleteed = await this.deleteTweetlike({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(tweetlikeDeleteed);
  }
}
