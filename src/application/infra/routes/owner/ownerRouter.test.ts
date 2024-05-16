import { makeFastifyInstance } from "@/index";
import { Collection, ObjectId } from "mongodb";
import { MongoHelper, env } from "@/application/infra";
import { sign } from "jsonwebtoken";
import { userBody } from "@/application/helpers/mocks/userBody";
jest.setTimeout(500000);

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
  const result = await userCollection.insertOne({ ...userBody, password, role });
  const _id = result?.insertedId;
  return { _id, token: sign({ _id }, env.jwtSecret) };
};
describe("Route api/owner", () => {
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
    ownerCollection = await MongoHelper.getCollection("owner");
    await userCollection.deleteMany({});
    await ownerCollection.deleteMany({});
  });
  describe("POST /api/owner/add", () => {
    test("Should return 200 on add", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/owner/add",
        headers: { authorization: `Bearer ${token}` },
        payload: ownerBody,
      });
      const responseBodyAdd = JSON.parse(responseAdd.body);
      expect(responseAdd.statusCode).toBe(200);
      expect(responseBodyAdd._id).toBeTruthy();
    });
    // test("Should return 400 for bad requests", async () => {
    //   const { token } = await makeAccessToken("admin", "password");
    //   const ownerWrongBody = { name: null };
    //   const responseAdd = await fastify.inject({
    //     method: "POST",
    //     url: "/api/owner/add",
    //     headers: { authorization: `Bearer ${token}` },
    //     payload: ownerWrongBody,
    //   });
    //   expect(responseAdd.statusCode).toBe(400);
    // });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/owner/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: ownerBody,
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/owner/add",
        payload: ownerBody,
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("GET /api/owner/load", () => {
    // test("Should return 400 for bad requests", async () => {
    //   const { token } = await makeAccessToken("admin", "password");
    //   const response = await fastify.inject({
    //     method: "GET",
    //     url: "/api/owner/load",
    //     headers: { authorization: `Bearer ${token}` },
    //   });
    //   expect(response.statusCode).toBe(400);
    // });
    test("Should return 200 on load", async () => {
      const { insertedId } = await ownerCollection.insertOne(ownerBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/owner/load?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody._id).toEqual(insertedId.toString());
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/owner/load?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/owner/load",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("GET /api/owner/loadByPage", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/owner/loadByPage",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on loadByPage", async () => {
      await ownerCollection.insertOne(ownerBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/owner/loadByPage?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.owners).toBeTruthy();
      expect(responseBody.total).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/owner/loadByPage?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/owner/loadByPage",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("DELETE /api/owner/delete", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/owner/delete",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on delete", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await ownerCollection.insertOne({
        ...ownerBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/owner/delete?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody).toEqual(true);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/owner/delete?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/owner/delete",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("PATCH /api/owner/update", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/owner/update",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on update", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await ownerCollection.insertOne({
        ...ownerBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/owner/update?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
        body: { name: "new name" },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.name).toEqual("new name");
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/owner/update?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
        body: { name: "new name" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/owner/update",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
