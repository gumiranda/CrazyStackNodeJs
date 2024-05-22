import { Repository } from "../contracts";
import { MongoRepository } from "./mongodb";
import { PostgresRepository } from "./postgres/repository/pg-repository";

export const makeDatabaseInstance = (
  database: Database,
  collectionOrTable: string
): Repository => {
  return new databases[database](collectionOrTable);
};

const databases = {
  mongodb: MongoRepository,
  postgres: PostgresRepository,
} as const;

type Database = keyof typeof databases;
