import { Elysia } from "elysia";

const health = new Elysia()
  .get("/", () => ({ hello: "world" }));

export { health };
