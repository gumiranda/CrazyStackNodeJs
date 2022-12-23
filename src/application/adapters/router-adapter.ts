import { requestContext } from "@fastify/request-context";
import { HttpRequest } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";

export const adaptRoute = (controller: Controller) => {
  return async (request: any, reply: any) => {
    const { body, params, query, headers } = request;
    const { userId = null, userLogged = null } = requestContext.get("context") || {};
    const httpRequest: HttpRequest = {
      body,
      params,
      headers,
      userId,
      query,
      userLogged,
    };
    const { statusCode, data } = await controller.handle(httpRequest);
    reply.code(statusCode).send(data);
  };
};
