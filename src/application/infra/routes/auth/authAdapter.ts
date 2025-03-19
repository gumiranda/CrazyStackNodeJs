import { adaptRoute } from "@/application/adapters";
import {
  makeSignupController,
  makeLoginController,
  makeVerifyEmailController,
  makeResendVerificationEmailController,
} from "@/slices/user/controllers";

export const signupAdapter = () => adaptRoute(makeSignupController());
export const verifyEmailAdapter = () => adaptRoute(makeVerifyEmailController());
export const resendVerificationAdapter = () =>
  adaptRoute(makeResendVerificationEmailController());
export const loginAdapter = () => adaptRoute(makeLoginController());
