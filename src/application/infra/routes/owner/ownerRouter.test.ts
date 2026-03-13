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
let ownerCollection: Collection;

const ownerBody = {
  name: "test",
  description: "test",
  haveDelivery: false,
  minimumTimeForReSchedule: 40,
  days1: {
    monday1: true,
    sunday1: false,
    thursday1: false,
    wednesday1: false,
    tuesday1: false,
    friday1: false,
    saturday1: false,
  },
  hourStart1: "8:00",
  hourEnd1: "18:00",
};
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
describe("Route api/owner", () => {
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
    ownerCollection = await MongoHelper.getCollection("owner");
    await userCollection.deleteMany({});
    await ownerCollection.deleteMany({});
  });
  describe("POST /api/owner/add", () => {
    test("Should return 200 on add", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode, body } = await inject(app, {
        method: "POST",
        url: "/owner/add",
        headers: { authorization: `Bearer ${token}` },
        payload: ownerBody,
      });
      expect(statusCode).toBe(200);
      expect(body._id).toBeTruthy();
    });
    // test("Should return 400 for bad requests", async () => {
    //   const { token } = await makeAccessToken("admin", "password");
    //   const ownerWrongBody = { name: null };
    //   const { statusCode } = await inject(app, {
    //     method: "POST",
    //     url: "/owner/add",
    //     headers: { authorization: `Bearer ${token}` },
    //     payload: ownerWrongBody,
    //   });
    //   expect(statusCode).toBe(400);
    // });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "POST",
        url: "/owner/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: ownerBody,
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "POST",
        url: "/owner/add",
        payload: ownerBody,
      });
      expect(statusCode).toBe(400);
    });
  });
  describe("GET /api/owner/load", () => {
    // test("Should return 400 for bad requests", async () => {
    //   const { token } = await makeAccessToken("admin", "password");
    //   const { statusCode } = await inject(app, {
    //     method: "GET",
    //     url: "/owner/load",
    //     headers: { authorization: `Bearer ${token}` },
    //   });
    //   expect(statusCode).toBe(400);
    // });
    test("Should return 200 on load", async () => {
      const { insertedId } = await ownerCollection.insertOne(ownerBody);
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode, body } = await inject(app, {
        method: "GET",
        url: `/owner/load?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(200);
      expect(body._id).toEqual(insertedId.toString());
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: `/owner/load?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/owner/load",
      });
      expect(statusCode).toBe(400);
    });
  });

  describe("GET /api/owner/loadByPage", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/owner/loadByPage",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 200 on loadByPage", async () => {
      await ownerCollection.insertOne(ownerBody);
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode, body } = await inject(app, {
        method: "GET",
        url: `/owner/loadByPage?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(200);
      expect(body.owners).toBeTruthy();
      expect(body.total).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: `/owner/loadByPage?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/owner/loadByPage",
      });
      expect(statusCode).toBe(400);
    });
  });
  describe("DELETE /api/owner/delete", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode } = await inject(app, {
        method: "DELETE",
        url: "/owner/delete",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 200 on delete", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await ownerCollection.insertOne({
        ...ownerBody,
        createdById: _id,
      });
      const { statusCode, body } = await inject(app, {
        method: "DELETE",
        url: `/owner/delete?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(200);
      expect(body).toEqual(true);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "DELETE",
        url: `/owner/delete?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "DELETE",
        url: "/owner/delete",
      });
      expect(statusCode).toBe(400);
    });
  });
  describe("PATCH /api/owner/update", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode } = await inject(app, {
        method: "PATCH",
        url: "/owner/update",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 200 on update", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await ownerCollection.insertOne({
        ...ownerBody,
        createdById: _id,
      });
      const { statusCode, body } = await inject(app, {
        method: "PATCH",
        url: `/owner/update?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
        payload: { name: "new name" },
      });
      expect(statusCode).toBe(200);
      expect(body.name).toEqual("new name");
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "PATCH",
        url: `/owner/update?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}`,
        headers: { authorization: "Bearer invalid_token" },
        payload: { name: "new name" },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "PATCH",
        url: "/owner/update",
      });
      expect(statusCode).toBe(400);
    });
  });
});
