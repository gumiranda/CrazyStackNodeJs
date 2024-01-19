import { HttpRequest } from "@/application/helpers";
import { parseJSON } from "@/application/helpers/utils/parseJSON";
import { makeUpdateRouteDriverController } from "@/slices/routeDriver/controllers";
import { makeUpdateRouteDriverFactory } from "@/slices/routeDriver/useCases";

export const updatePositionConsumer = {
  topic: "updatePosition",
  callback: async (message: string) => {
    const parsedMessage = parseJSON(message);
    if (!parsedMessage) {
      return;
    }
    const { userId, routeDriverId, lat, lng, route_id } = parsedMessage || {};
    const controller = makeUpdateRouteDriverController();
    const httpRequest: HttpRequest = {
      body: { updatedAt: new Date() },
      params: {},
      headers: {},
      userId,
      query: {
        _id: routeDriverId,
        lat,
        lng,
        routeId: route_id,
      },
      userLogged: {},
    };
    const { statusCode, data } = await controller.handle(httpRequest);
    console.log({ statusCode, parsedMessage, data });
  },
};
export const routeDriverFinishedConsumer = {
  topic: "routeDriverFinished",
  callback: async (message: string) => {
    const parsedMessage = parseJSON(message);
    if (!parsedMessage) {
      return;
    }
    const { routeDriverId, routeId, newStatus, currentStatus, userId } =
      parsedMessage || {};
    if (currentStatus === "finished") {
      return;
    }
    const updateRouteDriver = makeUpdateRouteDriverFactory();
    const updatedRouteDriver = await updateRouteDriver(
      {
        fields: { _id: routeDriverId, routeId, createdById: userId },
        options: {},
      },
      { status: newStatus } as any
    );
    console.log({ parsedMessage, updatedRouteDriver });
  },
};
