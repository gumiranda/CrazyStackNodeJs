import bcrypt from "bcrypt";
import { Encrypter, HashComparer } from "@/application/infra/crypto/protocols";

export class BcryptAdapter implements Encrypter, HashComparer {
  constructor(private readonly salt: number) {
    this.salt = salt;
  }
  encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }
  compare(password: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(password, hashedText);
  }
}
