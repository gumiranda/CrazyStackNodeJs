import { Elysia } from "elysia";
import {
  signupAdapter,
  loginAdapter,
  verifyEmailAdapter,
  resendVerificationAdapter,
} from "./authAdapter";

const auth = new Elysia()
  .post("/auth/signup", signupAdapter())
  .post("/auth/verify-email", verifyEmailAdapter())
  .post("/auth/resend-email", resendVerificationAdapter())
  .post("/auth/login", loginAdapter());

export { auth };
