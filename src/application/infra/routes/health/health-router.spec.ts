import { describe, it, expect } from "bun:test";
import { health } from "./health-router";

describe("healthRouter", () => {
  it("should be an Elysia instance", () => {
    expect(health).toBeDefined();
    expect(health.handle).toBeDefined();
  });

  it("should have a GET / route", () => {
    const routes = (health as any).routes;
    const getRoot = routes?.find(
      (r: any) => r.method === "GET" && r.path === "/"
    );
    expect(getRoot).toBeDefined();
  });

  it("should return { hello: 'world' } from GET /", async () => {
    const response = await health.handle(
      new Request("http://localhost/")
    );
    const body = await response.json();
    expect(body).toEqual({ hello: "world" });
  });

  it("should return 200 status", async () => {
    const response = await health.handle(
      new Request("http://localhost/")
    );
    expect(response.status).toBe(200);
  });
});
