import { makeFastifyInstance } from "@/index";
import { Collection, ObjectId } from "mongodb";
import { MongoHelper, env } from "@/application/infra";
import { sign } from "jsonwebtoken";
import { userBody } from "@/application/helpers/mocks/userBody";
import { addDays } from "date-fns";
jest.setTimeout(500000);

let userCollection: Collection;
let categoryCollection: Collection;

const categoryBody = {
  name: "test",
};
const makeAccessToken = async (role: string, password: string): Promise<any> => {
  const result = await userCollection.insertOne({
    ...userBody,
    password,
    payDay: addDays(new Date(), 30),
    role,
  });
  const _id = result?.insertedId;
  return { _id, token: sign({ _id }, env.jwtSecret) };
};
describe("Route api/category", () => {
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
    userCollection = await MongoHelper.getCollection("users");
    categoryCollection = await MongoHelper.getCollection("category");
    await userCollection.deleteMany({});
    await categoryCollection.deleteMany({});
  });
  describe("POST /api/category/add", () => {
    test("Should return 200 on add", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/category/add",
        headers: { authorization: `Bearer ${token}` },
        payload: categoryBody,
      });
      const responseBodyAdd = JSON.parse(responseAdd.body);
      expect(responseAdd.statusCode).toBe(200);
      expect(responseBodyAdd._id).toBeTruthy();
    });
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const categoryWrongBody = { ...categoryBody, name: null };
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/category/add",
        headers: { authorization: `Bearer ${token}` },
        payload: categoryWrongBody,
      });
      expect(responseAdd.statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/category/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: categoryBody,
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/category/add",
        payload: categoryBody,
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("GET /api/category/load", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/category/load",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on load", async () => {
      const { insertedId } = await categoryCollection.insertOne(categoryBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/category/load?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody._id).toEqual(insertedId.toString());
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/category/load?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/category/load",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("GET /api/category/loadByPage", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/category/loadByPage",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on loadByPage", async () => {
      await categoryCollection.insertOne(categoryBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/category/loadByPage?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.categorys).toBeTruthy();
      expect(responseBody.total).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/category/loadByPage?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/category/loadByPage",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("DELETE /api/category/delete", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/category/delete",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on delete", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await categoryCollection.insertOne({
        ...categoryBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/category/delete?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody).toEqual(true);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/category/delete?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/category/delete",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("PATCH /api/category/update", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/category/update",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on update", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await categoryCollection.insertOne({
        ...categoryBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/category/update?_id=${insertedId.toString()}`,
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
        url: `/api/category/update?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}`,
        headers: { authorization: "Bearer invalid_token" },
        body: { name: "new name" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/category/update",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
