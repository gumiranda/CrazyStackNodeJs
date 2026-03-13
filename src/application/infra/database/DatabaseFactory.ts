import type { Repository } from "../contracts";

export type Database = "mongodb" | "postgres";

export const makeDatabaseInstance = (
  database: Database,
  collectionOrTable: string
): Repository => {
  if (database === "mongodb") {
    const { MongoRepository } = require("./mongodb");
    return new MongoRepository(collectionOrTable);
  }
  const { PostgresRepository } = require("./postgres");
  return new PostgresRepository(collectionOrTable);
};
