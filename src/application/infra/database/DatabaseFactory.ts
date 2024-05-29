import { Repository } from "../contracts";
import { MongoRepository } from "./mongodb";
import { PostgresRepository } from "./postgres";

export const makeDatabaseInstance = async (
  database: Database,
  collectionOrTable: string
): Promise<Repository> => {
  return new databases[database](collectionOrTable);
};

const databases = {
  mongodb: MongoRepository,
  postgres: PostgresRepository,
} as const;

export type Database = keyof typeof databases;
