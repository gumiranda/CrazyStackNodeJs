import { adaptMiddleware } from "@/application/adapters";
import { Middleware } from "@/application/infra/contracts";
import { makeLoadUserFactory } from "@/slices/user/useCases/loadUser";
import { AuthMiddleware } from "@/application/infra/middlewares";
export const makeAuthMiddleware = (roles: string[]): Middleware => {
  return new AuthMiddleware(makeLoadUserFactory(), roles);
};

//roles

export const authClient = () => adaptMiddleware(makeAuthMiddleware(["client", "admin"]));
export const authAdmin = () => adaptMiddleware(makeAuthMiddleware(["admin"]));
export const authOwner = () => adaptMiddleware(makeAuthMiddleware(["owner", "admin"]));
export const authProfessional = () =>
  adaptMiddleware(makeAuthMiddleware(["owner", "professional", "admin"]));
export const authVisitor = () =>
  adaptMiddleware(
    makeAuthMiddleware(["owner", "professional", "client", "visitor", "admin"])
  );
export const authLogged = () =>
  adaptMiddleware(makeAuthMiddleware(["owner", "professional", "client", "admin"]));
