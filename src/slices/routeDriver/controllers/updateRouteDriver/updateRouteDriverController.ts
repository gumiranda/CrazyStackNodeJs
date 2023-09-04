/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadMapRoute } from "@/slices/mapRoute/useCases";
import { UpdateRouteDriver } from "@/slices/routeDriver/useCases";
import { DirectionsResponseData } from "@googlemaps/google-maps-services-js";

export class UpdateRouteDriverController extends Controller {
  constructor(
    private readonly validationQuery: Validation,
    private readonly validationBody: Validation,
    private readonly updateRouteDriver: UpdateRouteDriver,
    private readonly loadMapRoute: LoadMapRoute
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
    const [routeDriverOutput, routeOutput] = await Promise.all([
      this.updateRouteDriver(
        {
          fields: {
            ...httpRequest?.query,
          },
          options: {},
        },
        httpRequest?.body
      ),
      this.loadMapRoute({
        fields: {
          _id: httpRequest?.query?.routeId,
        },
        options: {},
      }),
    ]);
    const { routeDriver, countRouteDriver } = routeDriverOutput;
    const directions: DirectionsResponseData = JSON.parse(
      routeOutput?.directions as string
    );
    const lastPoint =
      directions.routes[0].legs[0].steps[directions.routes[0].legs[0].steps.length - 1];
    console.log({ end: lastPoint.end_location });
    if (countRouteDriver === 0) {
      console.log("corrida começou agora");
      return ok({ routeOutput, routeDriver, countRouteDriver });
    }
    if (
      lastPoint.end_location.lat == httpRequest?.query?.lat &&
      lastPoint.end_location.lng == httpRequest?.query?.lng
    ) {
      console.log("corrida terminou");
      return ok({ routeOutput, routeDriver, countRouteDriver });
    }
    console.log("motorista se movimentou", routeOutput);
    return ok({ routeOutput, routeDriver, countRouteDriver });
  }
}
