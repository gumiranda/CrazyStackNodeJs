import { adaptRoute } from "@/application/adapters";
import { makeSignupController } from "@/slices/user/controllers";

export const signupAdapter = () => adaptRoute(makeSignupController());
