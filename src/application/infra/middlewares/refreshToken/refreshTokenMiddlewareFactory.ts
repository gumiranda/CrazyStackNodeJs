import { adaptMiddleware } from "@/application/adapters";
import { Middleware } from "@/application/infra/contracts";
import { makeLoadUserFactory } from "@/slices/user/useCases";
import { RefreshTokenMiddleware } from "@/application/infra/middlewares";
export const makeRefreshTokenMiddleware = (roles: string[]): Middleware => {
  return new RefreshTokenMiddleware(makeLoadUserFactory(), roles);
};

//roles

export const refreshtokenClient = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["client", "admin"]));
export const refreshtokenAdmin = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["admin"]));
export const refreshtokenOwner = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["owner", "admin"]));
export const refreshtokenProfessional = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["owner", "professional", "admin"]));
export const refreshtokenVisitor = () =>
  adaptMiddleware(
    makeRefreshTokenMiddleware(["owner", "professional", "client", "visitor", "admin"])
  );
export const refreshtokenLogged = () =>
  adaptMiddleware(
    makeRefreshTokenMiddleware(["owner", "professional", "client", "admin"])
  );
