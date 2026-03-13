import { Encrypter, HashComparer } from "@/application/infra/crypto/protocols";

export class BcryptAdapter implements Encrypter, HashComparer {
  constructor(private readonly salt: number) {}
  async encrypt(value: string): Promise<string> {
    return Bun.password.hash(value, { algorithm: "bcrypt", cost: this.salt });
  }
  async compare(password: string, hashedText: string): Promise<boolean> {
    return Bun.password.verify(password, hashedText);
  }
}
