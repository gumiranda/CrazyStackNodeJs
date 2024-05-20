import { BcryptAdapter, env, JwtAdapter, MongoRepository } from "@/application/infra";
import { DbAuthentication, Authentication } from "@/application/helpers";
import { UserRepository } from "@/slices/user/repositories";
import { PostgresRepository } from "../infra/database/postgres/repository/pg-repository";
export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret, "60d");
  const jwtRefreshTokenAdapter = new JwtAdapter(env.jwtRefreshSecret, "90d");
  const userMongoRepository = new PostgresRepository("users");
  const userRepository = new UserRepository(userMongoRepository);
  return new DbAuthentication(
    userRepository,
    bcryptAdapter,
    jwtAdapter,
    jwtRefreshTokenAdapter
  );
};
