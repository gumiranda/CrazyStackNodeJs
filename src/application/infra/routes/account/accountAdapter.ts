import { adaptRoute } from "@/application/adapters";
import {
  makeLoadAccountController,
  makeWhoAmIController,
} from "@/slices/account/controllers";

export const refreshAdapter = () => adaptRoute(makeLoadAccountController());
export const whoAmIAdapter = () => adaptRoute(makeWhoAmIController());
