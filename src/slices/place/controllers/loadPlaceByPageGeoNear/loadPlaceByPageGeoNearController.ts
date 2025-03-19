/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadPlaceByPageGeoNear } from "@/slices/place/useCases";

export class LoadPlaceByPageGeoNearController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadPlaceByPageGeoNear: LoadPlaceByPageGeoNear
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const {
      page,
      sortBy = "createdAt",
      typeSort = "asc",
      limitPerPage = 10,
      lat = null,
      lng = null,
      ...rest
    } = httpRequest?.query || {};
    const fields = {
      ...rest,
      lng:
        lng ??
        httpRequest?.userLogged?.coord?.coordinates?.[1] ??
        httpRequest?.userLogged?.coord?.lng,
      lat:
        lat ??
        httpRequest?.userLogged?.coord?.coordinates?.[0] ??
        httpRequest?.userLogged?.coord?.lat,
    };
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page, userLoggedId: httpRequest?.userId, limitPerPage };
    const placeLoaded = await this.loadPlaceByPageGeoNear({
      fields,
      options,
    });
    return ok(placeLoaded);
  }
}
