import { makeElysiaInstance } from "@/index";
import { Collection, ObjectId } from "mongodb";
import { MongoHelper, env } from "@/application/infra";
import { SignJWT } from "jose";
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

const ownerBody = {
  email: "gustavo41@hotmail.com",
  name: "any_name",
  role: "owner",
  password: "111123",
  passwordConfirmation: "111123",
  coord: { type: "Point", coordinates: [-18.9512678, -41.1838365] },
  active: true,
  payDay: addDays(new Date(), 30),
};
const userBody = {
  email: "any_email2@mail.com",
  name: "zzzz",
  role: "professional",
  password: "111123",
  passwordConfirmation: "111123",
  serviceIds: ["61dd880e81d2b01178d5962d"],
  coord: { type: "Point", coordinates: [-22.9512678, -43.1838365] },
  active: true,
  payDay: addDays(new Date(), 30),
};
const makeAccessToken = async (role: string, password: string): Promise<any> => {
  const result = await userCollection.insertOne({ ...ownerBody, password, role });
  const _id = result?.insertedId;
  const token = await new SignJWT({ _id: _id.toString() })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secretKey);
  return { _id, token };
};
describe("Route api/user", () => {
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
    await userCollection.createIndex({ coord: "2dsphere" });
    await userCollection.deleteMany({});
  });
  describe("POST /api/user/add", () => {
    test("Should return 200 on add", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const { statusCode, body } = await inject(app, {
        method: "POST",
        url: "/user/add",
        headers: { authorization: `Bearer ${token}` },
        payload: userBody,
      });
      expect(statusCode).toBe(200);
      expect(body._id).toBeTruthy();
    });
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const userWrongBody = { ...userBody, name: null };
      const { statusCode } = await inject(app, {
        method: "POST",
        url: "/user/add",
        headers: { authorization: `Bearer ${token}` },
        payload: userWrongBody,
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "POST",
        url: "/user/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: userBody,
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "POST",
        url: "/user/add",
        payload: userBody,
      });
      expect(statusCode).toBe(400);
    });
  });
  describe("GET /api/user/load", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/user/load",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 200 on load", async () => {
      const { insertedId } = await userCollection.insertOne(userBody);
      const { token } = await makeAccessToken("owner", "password");
      const { statusCode, body } = await inject(app, {
        method: "GET",
        url: `/user/load?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(200);
      expect(body._id).toEqual(insertedId.toString());
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: `/user/load?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/user/load",
      });
      expect(statusCode).toBe(400);
    });
  });
  describe("GET /api/user/loadByPage", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/user/loadByPage",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 200 on loadByPage", async () => {
      await userCollection.insertOne(userBody);
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode, body } = await inject(app, {
        method: "GET",
        url: `/user/loadByPage?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(200);
      expect(body.users).toBeTruthy();
      expect(body.total).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: `/user/loadByPage?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/user/loadByPage",
      });
      expect(statusCode).toBe(400);
    });
  });
  describe("DELETE /api/user/delete", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const { statusCode } = await inject(app, {
        method: "DELETE",
        url: "/user/delete",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 200 on delete", async () => {
      const { token, _id } = await makeAccessToken("owner", "password");
      const { insertedId } = await userCollection.insertOne({
        ...userBody,
        createdById: _id,
      });
      const { statusCode, body } = await inject(app, {
        method: "DELETE",
        url: `/user/delete?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(200);
      expect(body).toEqual(true);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "DELETE",
        url: `/user/delete?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "DELETE",
        url: "/user/delete",
      });
      expect(statusCode).toBe(400);
    });
  });
  describe("PATCH /api/user/update", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const { statusCode } = await inject(app, {
        method: "PATCH",
        url: "/user/update",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 200 on update", async () => {
      const { token, _id } = await makeAccessToken("owner", "password");
      const { insertedId } = await userCollection.insertOne({
        ...userBody,
        createdById: _id,
      });
      const { statusCode, body } = await inject(app, {
        method: "PATCH",
        url: `/user/update?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
        payload: { name: "new name" },
      });
      expect(statusCode).toBe(200);
      expect(body.name).toEqual("new name");
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "PATCH",
        url: `/user/update?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}`,
        headers: { authorization: "Bearer invalid_token" },
        payload: { name: "new name" },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "PATCH",
        url: "/user/update",
      });
      expect(statusCode).toBe(400);
    });
  });

  describe("GET /api/user/loadByGeoNear", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/user/loadByGeoNear",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 200 on loadByGeoNear", async () => {
      await userCollection.insertOne(userBody);
      const { token } = await makeAccessToken("owner", "password");
      const { statusCode, body } = await inject(app, {
        method: "GET",
        url: `/user/loadByGeoNear?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(200);
      expect(body.users).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: `/user/loadByGeoNear?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/user/loadByGeoNear",
      });
      expect(statusCode).toBe(400);
    });
  });
});
