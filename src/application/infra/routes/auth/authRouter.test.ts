import { makeElysiaInstance } from "@/index";
import { Collection } from "mongodb";
import { MongoHelper } from "@/application/infra";
import { userBody } from "@/application/helpers/mocks/userBody";

const BASE = "http://localhost/api";

const inject = async (app: any, opts: { method: string; url: string; payload?: any; headers?: any }) => {
  const init: RequestInit = {
    method: opts.method,
    headers: { "Content-Type": "application/json", ...opts.headers },
  };
  if (opts.payload) init.body = JSON.stringify(opts.payload);
  const res = await app.handle(new Request(`${BASE}${opts.url}`, init));
  return { statusCode: res.status, body: await res.json() };
};

let userCollection: Collection;

describe("Route api/auth", () => {
  let app: any;
  beforeAll(async () => {
    const client = await MongoHelper.connect(process.env.MONGO_URL as string);
    const result = await makeElysiaInstance(client);
    app = result!.app;
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
    app = null;
  });
  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection("users");
    await userCollection.deleteMany({});
  });
  describe("POST /api/auth/signup", () => {
    test("Should return 200 on signup", async () => {
      const { statusCode, body } = await inject(app, {
        method: "POST",
        url: "/auth/signup",
        payload: userBody,
      });
      expect(statusCode).toBe(200);
      expect(body.user).toBeTruthy();
      expect(body.accessToken).toBeTruthy();
      expect(body.refreshToken).toBeTruthy();
    });
    test("Should return 403 if email is already in use", async () => {
      await userCollection.insertOne(userBody);
      const { statusCode, body } = await inject(app, {
        method: "POST",
        url: "/auth/signup",
        payload: userBody,
      });
      expect(statusCode).toBe(403);
      expect(body).toEqual({
        error: "Forbidden",
        statusCode: 403,
        message: "The received email is already in use",
      });
    });
    test("Should return 400 if password and passwordConfirmation are different", async () => {
      const { statusCode, body } = await inject(app, {
        method: "POST",
        url: "/auth/signup",
        payload: { ...userBody, passwordConfirmation: "1234567" },
      });
      expect(statusCode).toBe(400);
      expect(body).toEqual([
        { mensagem: "Invalid param: passwordConfirmation", name: "InvalidParamError" },
      ]);
    });
    test("Should return 400 if email is invalid", async () => {
      const { statusCode, body } = await inject(app, {
        method: "POST",
        url: "/auth/signup",
        payload: { ...userBody, email: "gustavoteste41hotmail.com" },
      });
      expect(statusCode).toBe(400);
      expect(body).toEqual([
        { mensagem: "Invalid param: email", name: "InvalidParamError" },
      ]);
    });
  });

  describe("POST /api/auth/login", () => {
    test("Should return 403 on login if user does not exists", async () => {
      const { statusCode, body } = await inject(app, {
        method: "POST",
        url: "/auth/login",
        payload: userBody,
      });
      expect(statusCode).toBe(403);
      expect(body).toEqual({
        error: "Forbidden",
        statusCode: 403,
        message: "The received email is already in use",
      });
    });
    test("Should return 200 if user exists and password is correct", async () => {
      const password = await Bun.password.hash(userBody.password, { algorithm: "bcrypt", cost: 12 });
      await userCollection.insertOne({ ...userBody, password });
      const { statusCode, body } = await inject(app, {
        method: "POST",
        url: "/auth/login",
        payload: userBody,
      });
      expect(statusCode).toBe(200);
      expect(body.user).toBeTruthy();
      expect(body.accessToken).toBeTruthy();
      expect(body.refreshToken).toBeTruthy();
    });
    test("Should return 400 if password is different", async () => {
      const password = await Bun.password.hash(userBody.password, { algorithm: "bcrypt", cost: 12 });
      await userCollection.insertOne({ ...userBody, password });
      const { statusCode, body } = await inject(app, {
        method: "POST",
        url: "/auth/login",
        payload: { ...userBody, passwordConfirmation: "1234567", password: "1234567" },
      });
      expect(statusCode).toBe(401);
      expect(body).toEqual({
        error: "Unauthorized",
        statusCode: 401,
        message: "Unauthorized",
      });
    });
    test("Should return 400 if email is invalid", async () => {
      const { statusCode, body } = await inject(app, {
        method: "POST",
        url: "/auth/login",
        payload: { ...userBody, email: "gustavoteste41hotmail.com" },
      });
      expect(statusCode).toBe(400);
      expect(body).toEqual([
        { mensagem: "Invalid param: email", name: "InvalidParamError" },
      ]);
    });
  });
});
