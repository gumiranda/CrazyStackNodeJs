import { makeFastifyInstance } from "@/index";
import { Collection, ObjectId } from "mongodb";
import { MongoHelper, env } from "@/application/infra";
import { sign } from "jsonwebtoken";
jest.setTimeout(50000);

let userCollection: Collection;

const ownerBody = {
  email: "gustavo41@hotmail.com",
  name: "any_name",
  role: "owner",
  password: "111123",
  passwordConfirmation: "111123",
  coord: { type: "Point", coordinates: [-18.9512678, -41.1838365] },
  active: true,
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
};
const makeAccessToken = async (role: string, password: string): Promise<any> => {
  const result = await userCollection.insertOne({ ...ownerBody, password, role });
  const _id = result?.insertedId;
  return { _id, token: sign({ _id }, env.jwtSecret) };
};
describe("Route api/user", () => {
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
    await userCollection.createIndex({ coord: "2dsphere" });
    await userCollection.deleteMany({});
  });
  describe("POST /api/user/add", () => {
    test("Should return 200 on add", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/user/add",
        headers: { authorization: `Bearer ${token}` },
        payload: userBody,
      });
      const responseBodyAdd = JSON.parse(responseAdd.body);
      expect(responseAdd.statusCode).toBe(200);
      expect(responseBodyAdd._id).toBeTruthy();
    });
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const userWrongBody = { ...userBody, name: null };
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/user/add",
        headers: { authorization: `Bearer ${token}` },
        payload: userWrongBody,
      });
      expect(responseAdd.statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/user/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: userBody,
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/user/add",
        payload: userBody,
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("GET /api/user/load", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/user/load",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on load", async () => {
      const { insertedId } = await userCollection.insertOne(userBody);
      const { token } = await makeAccessToken("owner", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/user/load?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody._id).toEqual(insertedId.toString());
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/user/load?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/user/load",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("GET /api/user/loadByPage", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/user/loadByPage",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on loadByPage", async () => {
      await userCollection.insertOne(userBody);
      const { token } = await makeAccessToken("owner", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/user/loadByPage?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.users).toBeTruthy();
      expect(responseBody.total).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/user/loadByPage?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/user/loadByPage",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("DELETE /api/user/delete", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/user/delete",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on delete", async () => {
      const { token, _id } = await makeAccessToken("owner", "password");
      const { insertedId } = await userCollection.insertOne({
        ...userBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/user/delete?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody).toEqual(true);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/user/delete?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/user/delete",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("PATCH /api/user/update", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/user/update",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on update", async () => {
      const { token, _id } = await makeAccessToken("owner", "password");
      const { insertedId } = await userCollection.insertOne({
        ...userBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/user/update?_id=${insertedId.toString()}`,
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
        url: `/api/user/update?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
        body: { name: "new name" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/user/update",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("GET /api/user/loadByGeoNear", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("owner", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/user/loadByGeoNear",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on loadByGeoNear", async () => {
      await userCollection.insertOne(userBody);
      const { token } = await makeAccessToken("owner", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/user/loadByGeoNear?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.users).toBeTruthy();
      expect(responseBody.total).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/user/loadByGeoNear?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/user/loadByGeoNear",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
