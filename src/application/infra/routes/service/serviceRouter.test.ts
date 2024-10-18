import { makeFastifyInstance } from "@/index";
import { Collection, ObjectId } from "mongodb";
import { MongoHelper, env } from "@/application/infra";
import { sign } from "jsonwebtoken";
import { userBody } from "@/application/helpers/mocks/userBody";
import { addDays } from "date-fns";
jest.setTimeout(500000);

let userCollection: Collection;
let serviceCollection: Collection;

const serviceBody = {
  name: "test",
  description: "test",
  price: 90.2,
  finalPrice: 90.2,
  comission: 99,
  havePromotionalPrice: false,
  hasFidelityGenerator: false,
  categoryId: "61e87f2e654cafe0ad408c14",
  duration: 15,
  productsQuantityNeeded: 1,
  canPayWithFidelityPoints: false,
  appointmentsTotal: 0,
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
describe("Route api/service", () => {
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
    serviceCollection = await MongoHelper.getCollection("service");
    await userCollection.deleteMany({});
    await serviceCollection.deleteMany({});
  });
  describe("POST /api/service/add", () => {
    test("Should return 200 on add", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/service/add",
        headers: { authorization: `Bearer ${token}` },
        payload: serviceBody,
      });
      const responseBodyAdd = JSON.parse(responseAdd.body);
      expect(responseAdd.statusCode).toBe(200);
      expect(responseBodyAdd._id).toBeTruthy();
    });
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const serviceWrongBody = { ...serviceBody, name: null };
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/service/add",
        headers: { authorization: `Bearer ${token}` },
        payload: serviceWrongBody,
      });
      expect(responseAdd.statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/service/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: serviceBody,
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/service/add",
        payload: serviceBody,
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("GET /api/service/load", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/service/load",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on load", async () => {
      const { insertedId } = await serviceCollection.insertOne(serviceBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/service/load?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody._id).toEqual(insertedId.toString());
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/service/load?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/service/load",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("GET /api/service/loadByPage", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/service/loadByPage",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on loadByPage", async () => {
      await serviceCollection.insertOne(serviceBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/service/loadByPage?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.services).toBeTruthy();
      expect(responseBody.total).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/service/loadByPage?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/service/loadByPage",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("DELETE /api/service/delete", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/service/delete",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on delete", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await serviceCollection.insertOne({
        ...serviceBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/service/delete?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody).toEqual(true);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/service/delete?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/service/delete",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("PATCH /api/service/update", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/service/update",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on update", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await serviceCollection.insertOne({
        ...serviceBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/service/update?_id=${insertedId.toString()}`,
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
        url: `/api/service/update?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}`,
        headers: { authorization: "Bearer invalid_token" },
        body: { name: "new name" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/service/update",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
