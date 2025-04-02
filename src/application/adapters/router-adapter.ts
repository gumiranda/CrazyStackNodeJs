import { requestContext } from "@fastify/request-context";
import { HttpRequest } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";

export const adaptRoute = (controller: Controller) => {
  return async (request: any, reply: any) => {
    const { body, params, query, headers, cookies } = request;
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
      cookies,
    };
    const {
      statusCode,
      data,
      cookies: responseCookies,
    } = await controller.handle(httpRequest);
    if (responseCookies?.length) {
      responseCookies.forEach((cookie: any) => {
        const { name, value, options } = cookie;
        reply.setCookie(name, value, {
          ...options,
          path: options?.path || "/",
          httpOnly: options?.httpOnly !== false,
          secure: process.env.NODE_ENV === "production" && options?.secure !== false,
          sameSite: options?.sameSite || "lax",
        });
      });
    }
    reply.code(statusCode).send(data);
  };
};
