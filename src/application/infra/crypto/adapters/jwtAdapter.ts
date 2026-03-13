import { SignJWT, jwtVerify } from "jose";
import { TokenDecrypter, TokenGenerator } from "@/application/infra/crypto/protocols";

export class JwtAdapter implements TokenDecrypter, TokenGenerator {
  private secretKey: Uint8Array;
  constructor(secret: string, private readonly expirationTime: string) {
    this.secretKey = new TextEncoder().encode(secret);
  }
  async decrypt(value: string): Promise<string> {
    const { payload } = await jwtVerify(value, this.secretKey);
    return payload as any;
  }
  async generate(_id: string): Promise<string> {
    return new SignJWT({ _id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(this.expirationTime)
      .sign(this.secretKey);
  }
}
