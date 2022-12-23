import { adaptRoute } from "@/application/adapters";
import { makeLoadAccountController } from "@/slices/account/controllers";

export const refreshAdapter = () => adaptRoute(makeLoadAccountController());
