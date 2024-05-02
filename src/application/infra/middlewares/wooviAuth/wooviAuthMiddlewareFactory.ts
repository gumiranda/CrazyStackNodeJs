import { adaptMiddleware } from "@/application/adapters";
import { Middleware } from "@/application/infra/contracts";
import { WooviAuthMiddleware } from "./wooviAuthMiddleware";

export const makeWooviAuthMiddleware = (): Middleware => {
  return new WooviAuthMiddleware();
};

export const wooviAuthWebhook = () => adaptMiddleware(makeWooviAuthMiddleware());
