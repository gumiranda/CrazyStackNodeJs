import { adaptRoute } from "@/application/adapters";
import {
  makeSignupController,
  makeLoginController,
  makeSignupOwnerController,
} from "@/slices/user/controllers";

export const signupOwnerAdapter = () => adaptRoute(makeSignupOwnerController());
export const signupAdapter = () => adaptRoute(makeSignupController());
export const loginAdapter = () => adaptRoute(makeLoginController());
