import { requestContext } from "@fastify/request-context";
import { HttpRequest } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";

export const adaptRoute = (controller: Controller) => {
  return async (request: any, reply: any) => {
    const { body, params, query, headers } = request;
    const {
      userId = null,
      userLogged = null,
      daysToNextPayment = null,
    }: any = (requestContext as any).get("context" as any) || {};
    const httpRequest: HttpRequest = {
      body,
      params,
      headers,
      userId,
      query,
      userLogged,
      daysToNextPayment,
    };
    const { statusCode, data } = await controller.handle(httpRequest);
    reply.code(statusCode).send(data);
  };
};
