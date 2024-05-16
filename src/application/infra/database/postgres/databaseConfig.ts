import { Pool } from "pg";
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
// export const pool = new Pool({
//   // user: PGUSER,
//   // password: PGPASSWORD,
//   // database: PGDATABASE,
//   // port: 5432,
//   // host: PGHOST,
//   // ssl: true,
//   // max: 20,
//   connectionString: POSTGRES_URL,
//   // idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 20000,
// });
export const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: true,
});
export const query = (sql: any, params: any, callback: any) => {
  return pool.query(sql, params, callback);
};
export async function connect(): Promise<any> {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error("Erro ao conectar ao pool de conexões:", error);
    throw error; // Propaga o erro para quem chamou o método connect()
  }
}
export async function closePool() {
  try {
    await pool.end();
  } catch (error) {
    console.error("Erro ao fechar o pool de conexões:", error);
    throw error; // Propaga o erro para quem chamou a função closePool()
  }
}

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
