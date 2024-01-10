/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddProduct } from "@/slices/product/useCases";

export class AddProductController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addProduct: AddProduct
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const productCreated = await this.addProduct({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(productCreated);
  }
}
