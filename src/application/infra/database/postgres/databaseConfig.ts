import { Pool } from "pg";
const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

export const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: Number(PGPORT),
  ssl: true,
});

export async function connect(): Promise<any> {
  try {
    const client = await pool.connect();
    console.log("Connected to database");
    return client;
  } catch (error) {
    console.error("Error connecting to database", error);
    throw error;
  }
}

export async function closePool() {
  try {
    await pool.end();
    console.log("Connection to database closed");
  } catch (error) {
    console.error("Error closing connection to database", error);
    throw error;
  }
}

pool.on("error", async (err) => {
  console.error("Unexpected error on idle client", err);
  await pool.end();
  process.exit(-1);
});
pool.on("connect", () => {
  console.log("Connected to database");
});
pool.on("remove", () => {
  console.log("Client removed from pool");
});
pool.on("release", () => {
  console.log("Client released from pool");
});
