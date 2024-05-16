import { Pool } from "pg";
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export const pool = new Pool({
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  port: 5432,
  host: PGHOST,
  ssl: true,
  max: 20,
  // idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
});
export const query = (sql: any, params: any, callback: any) => {
  return pool.query(sql, params, callback);
};
pool.on("error", async (err) => {
  console.error("Unexpected error on idle client", err);
  await pool.end();
  process.exit(-1);
});
pool.on("release", async (err, client) => {
  console.log("Unexpected release on idle client", err, client);
});
pool.on("connect", (client) => {
  console.log("client connected", client);
});
