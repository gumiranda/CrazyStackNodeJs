import { makeFastifyInstance } from "@/index";
import { Collection } from "mongodb";
import { MongoHelper } from "@/application/infra";
import { hash } from "bcrypt";
jest.setTimeout(50000);

let userCollection: Collection;

const userBody = {
  email: "gustavoteste41@hotmail.com",
  name: "Gustavo",
  role: "client",
  password: "123456",
  passwordConfirmation: "123456",
  coord: { type: "Point", coordinates: [-46.693419, -23.568704] },
};

describe("Route api/account", () => {
  let fastify: any;
  beforeAll(async () => {
    const client = await MongoHelper.connect(process.env.MONGO_URL as string);
    fastify = await makeFastifyInstance(client);
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  });
  afterAll(async () => {
    await fastify.close();
    await MongoHelper.disconnect();
    fastify = null;
  });
  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection("user");
    await userCollection.deleteMany({});
  });
  describe("GET /api/account/refresh", () => {
    test("Should return 200 on refresh", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: userBody,
      });
      const responseBody = JSON.parse(response.body);
      const refreshtoken = responseBody.refreshToken;
      expect(response.statusCode).toBe(200);
      expect(responseBody.user).toBeTruthy();
      expect(responseBody.accessToken).toBeTruthy();
      expect(responseBody.refreshToken).toBeTruthy();
      const responseRefresh = await fastify.inject({
        method: "GET",
        url: "/api/account/refresh",
        headers: { refreshtoken },
      });
      const responseBodyRefresh = JSON.parse(responseRefresh.body);
      expect(responseRefresh.statusCode).toBe(200);
      expect(responseBodyRefresh.accessToken).toBeTruthy();
      expect(responseBodyRefresh.refreshToken).toBeTruthy();
    });
    test("Should return 400 for bad requests", async () => {
      await userCollection.insertOne(userBody);
      const response = await fastify.inject({
        method: "GET",
        url: "/api/account/refresh",
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized refresh token", async () => {
      await userCollection.insertOne(userBody);
      const response = await fastify.inject({
        method: "GET",
        url: "/api/account/refresh",
        headers: { refreshtoken: "invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
  });

  describe("GET /api/account/whoAmI", () => {
    test("Should return 200 on refresh", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: userBody,
      });
      const responseBody = JSON.parse(response.body);
      const refreshtoken = responseBody.refreshToken;
      expect(response.statusCode).toBe(200);
      expect(responseBody.user).toBeTruthy();
      expect(responseBody.accessToken).toBeTruthy();
      expect(responseBody.refreshToken).toBeTruthy();
      const responseRefresh = await fastify.inject({
        method: "GET",
        url: "/api/account/whoami",
        headers: { refreshtoken },
      });
      const responseBodyRefresh = JSON.parse(responseRefresh.body);
      expect(responseRefresh.statusCode).toBe(200);
      expect(responseBodyRefresh.user).toBeTruthy();
    });
    test("Should return 400 for bad requests", async () => {
      await userCollection.insertOne(userBody);
      const response = await fastify.inject({
        method: "GET",
        url: "/api/account/whoami",
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized refresh token", async () => {
      await userCollection.insertOne(userBody);
      const response = await fastify.inject({
        method: "GET",
        url: "/api/account/whoami",
        headers: { refreshtoken: "invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
  });
});
