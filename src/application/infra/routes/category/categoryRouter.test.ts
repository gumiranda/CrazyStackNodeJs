import { makeElysiaInstance } from "@/index";
import { Collection, ObjectId } from "mongodb";
import { MongoHelper, env } from "@/application/infra";
import { SignJWT } from "jose";
import { userBody } from "@/application/helpers/mocks/userBody";
import { addDays } from "date-fns";

const BASE = "http://localhost/api";
const secretKey = new TextEncoder().encode(env.jwtSecret);

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
let categoryCollection: Collection;

const categoryBody = { name: "test" };

const makeAccessToken = async (role: string, password: string): Promise<any> => {
  const result = await userCollection.insertOne({
    ...userBody,
    password,
    payDay: addDays(new Date(), 30),
    role,
  });
  const _id = result?.insertedId;
  const token = await new SignJWT({ _id: _id.toString() })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secretKey);
  return { _id, token };
};

describe("Route api/category", () => {
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
    categoryCollection = await MongoHelper.getCollection("category");
    await userCollection.deleteMany({});
    await categoryCollection.deleteMany({});
  });
  describe("POST /api/category/add", () => {
    test("Should return 200 on add", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode, body } = await inject(app, {
        method: "POST",
        url: "/category/add",
        headers: { authorization: `Bearer ${token}` },
        payload: categoryBody,
      });
      expect(statusCode).toBe(200);
      expect(body._id).toBeTruthy();
    });
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode } = await inject(app, {
        method: "POST",
        url: "/category/add",
        headers: { authorization: `Bearer ${token}` },
        payload: { ...categoryBody, name: null },
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "POST",
        url: "/category/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: categoryBody,
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "POST",
        url: "/category/add",
        payload: categoryBody,
      });
      expect(statusCode).toBe(400);
    });
  });
  describe("GET /api/category/load", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/category/load",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 200 on load", async () => {
      const { insertedId } = await categoryCollection.insertOne(categoryBody);
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode, body } = await inject(app, {
        method: "GET",
        url: `/category/load?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(200);
      expect(body._id).toEqual(insertedId.toString());
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: `/category/load?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/category/load",
      });
      expect(statusCode).toBe(400);
    });
  });
  describe("GET /api/category/loadByPage", () => {
    test("Should return 200 on loadByPage", async () => {
      await categoryCollection.insertOne(categoryBody);
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode, body } = await inject(app, {
        method: "GET",
        url: `/category/loadByPage?page=1`,
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(200);
      expect(body.categorys).toBeTruthy();
      expect(body.total).toBeTruthy();
    });
  });
  describe("DELETE /api/category/delete", () => {
    test("Should return 200 on delete", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await categoryCollection.insertOne({
        ...categoryBody,
        createdById: _id,
      });
      const { statusCode, body } = await inject(app, {
        method: "DELETE",
        url: `/category/delete?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(200);
      expect(body).toEqual(true);
    });
  });
  describe("PATCH /api/category/update", () => {
    test("Should return 200 on update", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await categoryCollection.insertOne({
        ...categoryBody,
        createdById: _id,
      });
      const { statusCode, body } = await inject(app, {
        method: "PATCH",
        url: `/category/update?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
        payload: { name: "new name" },
      });
      expect(statusCode).toBe(200);
      expect(body.name).toEqual("new name");
    });
  });
});
