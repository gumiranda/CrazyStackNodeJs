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

describe("Route api/auth", () => {
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
  describe("POST /api/auth/signup", () => {
    test("Should return 200 on signup", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: userBody,
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.user).toBeTruthy();
      expect(responseBody.accessToken).toBeTruthy();
      expect(responseBody.refreshToken).toBeTruthy();
    });
    test("Should return 403 if email is already in use", async () => {
      await userCollection.insertOne(userBody);
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: userBody,
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(403);
      expect(responseBody).toEqual({
        error: "Forbidden",
        statusCode: 403,
        message: "The received email is already in use",
      });
    });
    test("Should return 400 if password and passwordConfirmation are different", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: {
          ...userBody,
          passwordConfirmation: "1234567",
        },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(400);
      expect(responseBody).toEqual([
        { mensagem: "Invalid param: passwordConfirmation", name: "InvalidParamError" },
      ]);
    });
    test("Should return 400 if email is invalid", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: {
          ...userBody,
          email: "gustavoteste41hotmail.com",
        },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(400);
      expect(responseBody).toEqual([
        { mensagem: "Invalid param: email", name: "InvalidParamError" },
      ]);
    });
  });

  describe("POST /api/auth/login", () => {
    test("Should return 403 on login if user does not exists", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: userBody,
      });

      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(403);
      expect(responseBody).toEqual({
        error: "Forbidden",
        statusCode: 403,
        message: "The received email is already in use",
      });
    });
    test("Should return 200 if user exists and password is correct", async () => {
      const password = await hash(userBody.password, 12);
      await userCollection.insertOne({ ...userBody, password });
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: userBody,
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.user).toBeTruthy();
      expect(responseBody.accessToken).toBeTruthy();
      expect(responseBody.refreshToken).toBeTruthy();
    });
    test("Should return 400 if password is different", async () => {
      const password = await hash(userBody.password, 12);
      await userCollection.insertOne({ ...userBody, password });
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: {
          ...userBody,
          passwordConfirmation: "1234567",
          password: "1234567",
        },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(401);
      expect(responseBody).toEqual({
        error: "Unauthorized",
        statusCode: 401,
        message: "Unauthorized",
      });
    });
    test("Should return 400 if email is invalid", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: {
          ...userBody,
          email: "gustavoteste41hotmail.com",
        },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(400);
      expect(responseBody).toEqual([
        { mensagem: "Invalid param: email", name: "InvalidParamError" },
      ]);
    });
  });
});
