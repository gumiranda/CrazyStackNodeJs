import crypto from "crypto";

export function generateToken(): string {
  return crypto.randomBytes(64).toString("hex");
}
