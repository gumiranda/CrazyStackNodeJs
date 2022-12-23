import { Authentication } from "@/application/helpers/contracts";
import { HashComparer, TokenGenerator } from "@/application/infra";
import { LoadUserRepository } from "@/slices/user/repositories";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadUserRepository: LoadUserRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly refreshTokenGenerator: TokenGenerator
  ) {}
  async auth(email: string, password: string): Promise<any> {
    const user = await this.loadUserRepository.loadUser({
      fields: { email },
      options: { projection: {} },
    });
    if (user?._id && user?.password) {
      const isValid = await this.hashComparer.compare(password, user.password);
      if (isValid) {
        const { accessToken, refreshToken } =
          (await this.authRefreshToken(user._id)) || {};
        return { accessToken, refreshToken };
      }
    }
    return null;
  }
  async authRefreshToken(userId: string): Promise<any> {
    const accessToken = await this.tokenGenerator.generate(userId);
    const refreshToken = await this.refreshTokenGenerator.generate(userId);
    return { accessToken, refreshToken };
  }
}
