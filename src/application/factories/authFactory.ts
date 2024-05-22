import { BcryptAdapter, env, JwtAdapter } from "@/application/infra";
import { DbAuthentication, Authentication } from "@/application/helpers";
import { UserRepository } from "@/slices/user/repositories";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makeDatabaseInstance } from "@/application/infra/database/DatabaseFactory";

export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret, "60d");
  const jwtRefreshTokenAdapter = new JwtAdapter(env.jwtRefreshSecret, "90d");
  const userDatabaseRepository = makeDatabaseInstance(whiteLabel.database, "users");
  const userRepository = new UserRepository(userDatabaseRepository);
  return new DbAuthentication(
    userRepository,
    bcryptAdapter,
    jwtAdapter,
    jwtRefreshTokenAdapter
  );
};
