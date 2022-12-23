import { adaptMiddleware } from "@/application/adapters";
import { Middleware } from "@/application/infra/contracts";
import { makeLoadUserFactory } from "@/slices/user/useCases/loadUser/loadUserFactory";
import { RefreshTokenMiddleware } from "@/application/infra/middlewares";
export const makeRefreshTokenMiddleware = (roles: string[]): Middleware => {
  return new RefreshTokenMiddleware(makeLoadUserFactory(), roles);
};

//roles

export const authClient = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["client", "admin"]));
export const authAdmin = () => adaptMiddleware(makeRefreshTokenMiddleware(["admin"]));
export const authOwner = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["owner", "admin"]));
export const authProfessional = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["owner", "professional", "admin"]));
export const authVisitor = () =>
  adaptMiddleware(
    makeRefreshTokenMiddleware(["owner", "professional", "client", "visitor", "admin"])
  );
export const authLogged = () =>
  adaptMiddleware(
    makeRefreshTokenMiddleware(["owner", "professional", "client", "admin"])
  );
