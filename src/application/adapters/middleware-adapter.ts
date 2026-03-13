import { Middleware } from "@/application/infra/contracts";
import { HttpRequest } from "@/application/helpers";

export const adaptMiddleware = (middleware: Middleware) => {
  return async ({ headers, set, store }: any) => {
    const httpRequest: HttpRequest = { headers };
    const httpResponse = await middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      store.userId = httpResponse.data?.userId;
      store.userLogged = httpResponse.data?.userLogged;
      store.daysToNextPayment = httpResponse.data?.daysToNextPayment;
    } else if (httpResponse?.data) {
      set.status = httpResponse.statusCode;
      return httpResponse.data;
    } else {
      set.status = 500;
      return { error: "Internal Server Error" };
    }
  };
};
