import jwt from "jsonwebtoken";
import { TokenDecrypter, TokenGenerator } from "@/application/infra/crypto/protocols";

export class JwtAdapter implements TokenDecrypter, TokenGenerator {
  constructor(private readonly secret: string, private readonly expirationTime: string) {
    this.secret = secret;
    this.expirationTime = expirationTime;
  }
  async decrypt(value: string): Promise<string> {
    return jwt.verify(value, this.secret) as any;
  }
  async generate(_id: string): Promise<string> {
    return jwt.sign({ _id }, this.secret, { expiresIn: this.expirationTime });
  }
}
