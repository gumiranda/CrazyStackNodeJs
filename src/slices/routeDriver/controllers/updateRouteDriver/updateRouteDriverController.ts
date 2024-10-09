/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { UpdateRouteDriver } from "@/slices/routeDriver/useCases";
import { LoadMapRoute } from "@/slices/mapRoute/useCases";
import { DirectionsResponseData } from "@googlemaps/google-maps-services-js";
import { sendMessage } from "@/application/infra/messaging";

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
            createdById: httpRequest?.userId,
          },
          options: {},
        },
        httpRequest?.body
      ),
      this.loadMapRoute({ fields: { _id: httpRequest?.query?.routeId }, options: {} }),
    ]);
    const { routeDriver, countRouteDriver } = routeDriverOutput;
    const directions: DirectionsResponseData = JSON.parse(
      routeOutput?.directions as string
    );
    const lastSteps = directions?.routes?.[0]?.legs?.[0]?.steps;
    const lastPoint = lastSteps?.[lastSteps?.length - 1];
    if (countRouteDriver === 0) {
      console.log("corrida começou agora");
      return ok({ routeDriverOutput, routeDriver, countRouteDriver });
    }
    if (
      lastPoint?.end_location?.lat === httpRequest?.query?.lat &&
      lastPoint?.end_location?.lng === httpRequest?.query?.lng
    ) {
      console.log(
        "corrida terminou justamente na coordenada exata do último ponto, olha que coincidencia"
      );
      sendMessage({
        topic: "routeDriverFinished",
        message: JSON.stringify({
          routeDriverId: routeDriver?._id,
          routeId: routeDriver?.routeId,
          newStatus: "finished",
          currentStatus: routeDriver?.status,
          userId: httpRequest?.userId,
        }),
      });
      return ok({ routeDriverOutput, routeDriver, countRouteDriver });
    }
    console.log("motorista se movimentou");
    return ok({ routeDriverOutput, routeDriver, countRouteDriver });
  }
}
