import { Repository } from "../contracts";
import { MongoRepository } from "./mongodb";
import { PostgresRepository } from "./postgres";

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

export type Database = keyof typeof databases;
