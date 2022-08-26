import { ForbiddenError, UnauthorizedError, ServerError } from "@/application/errors";
export type HttpResponse<T = any> = { statusCode: number; data: T };
export type HttpRequest<T = any> = {
  body?: T;
  headers?: T;
  params?: T;
  query?: T;
  userLogged?: T;
  userId?: string;
};

export const ok = <T = any>(data: T): HttpResponse<T> => ({ statusCode: 200, data });
export const badRequest = <T = any>(error: T): HttpResponse<T> => ({
  statusCode: 400,
  data: error,
});
export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  data: new UnauthorizedError(),
});
export const forbidden = (error: any): HttpResponse<Error> => ({
  statusCode: 403,
  data: new ForbiddenError(error),
});
export const serverError = (error: any): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error),
});
