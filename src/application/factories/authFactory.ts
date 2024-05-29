import { BcryptAdapter, env, JwtAdapter, makeDatabaseInstance } from "@/application/infra";
import { DbAuthentication, Authentication } from "@/application/helpers";
import { UserRepository } from "@/slices/user/repositories";
export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret, "60d");
  const jwtRefreshTokenAdapter = new JwtAdapter(env.jwtRefreshSecret, "90d");
  const userMongoRepository = makeDatabaseInstance("mongodb", "users");
  const userRepository = new UserRepository(userMongoRepository);
  return new DbAuthentication(
    userRepository,
    bcryptAdapter,
    jwtAdapter,
    jwtRefreshTokenAdapter
  );
};
