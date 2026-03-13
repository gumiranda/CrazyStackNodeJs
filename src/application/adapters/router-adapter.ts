import { HttpRequest } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";

export const adaptRoute = (controller: Controller) => {
  return async ({ body, params, query, headers, set, store }: any) => {
    const httpRequest: HttpRequest = {
      body,
      params,
      headers,
      query,
      userId: store?.userId ?? null,
      userLogged: store?.userLogged ?? null,
      daysToNextPayment: store?.daysToNextPayment ?? null,
    };
    const { statusCode, data } = await controller.handle(httpRequest);
    set.status = statusCode;
    return data;
  };
};
