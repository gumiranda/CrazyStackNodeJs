import { adaptRoute } from "@/application/adapters";
import { makeSignupController, makeLoginController } from "@/slices/user/controllers";

export const signupAdapter = () => adaptRoute(makeSignupController());
export const loginAdapter = () => adaptRoute(makeLoginController());
