import { makeFastifyInstance } from "@/index";
import { Collection, ObjectId } from "mongodb";
import { MongoHelper, env } from "@/application/infra";
import { sign } from "jsonwebtoken";
jest.setTimeout(50000);

let userCollection: Collection;
let ratingResultCollection: Collection;

const userBody = {
  email: "gustavoteste41@hotmail.com",
  name: "Gustavo",
  role: "client",
  password: "123456",
  passwordConfirmation: "123456",
  coord: { type: "Point", coordinates: [-46.693419, -23.568704] },
};
const ratingResultBody = {
  ratingId: "61cdcb36f3b57355823528b0",
  requestId: "61dd8d09e7d6fd5019a7fa13",
  ratingForId: "61dd879881d2b01178d5962a",
  ratingType: "Atendimento",
  rating: "Bom",
  comment: { ratingText: "uma merda" },
};
const makeAccessToken = async (role: string, password: string): Promise<any> => {
  const result = await userCollection.insertOne({ ...userBody, password, role });
  const _id = result?.insertedId;
  return { _id, token: sign({ _id }, env.jwtSecret) };
};
describe("Route api/ratingResult", () => {
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
    ratingResultCollection = await MongoHelper.getCollection("ratingResult");
    await userCollection.deleteMany({});
    await ratingResultCollection.deleteMany({});
  });
  describe("POST /api/ratingResult/add", () => {
    test("Should return 200 on add", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/ratingResult/add",
        headers: { authorization: `Bearer ${token}` },
        payload: ratingResultBody,
      });
      const responseBodyAdd = JSON.parse(responseAdd.body);
      expect(responseAdd.statusCode).toBe(200);
      expect(responseBodyAdd._id).toBeTruthy();
    });
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const ratingResultWrongBody = { ...ratingResultBody, rating: null };
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/ratingResult/add",
        headers: { authorization: `Bearer ${token}` },
        payload: ratingResultWrongBody,
      });
      expect(responseAdd.statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/ratingResult/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: ratingResultBody,
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/ratingResult/add",
        payload: ratingResultBody,
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("GET /api/ratingResult/load", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/ratingResult/load",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on load", async () => {
      const { insertedId } = await ratingResultCollection.insertOne(ratingResultBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/ratingResult/load?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody._id).toEqual(insertedId.toString());
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/ratingResult/load?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/ratingResult/load",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("GET /api/ratingResult/loadByPage", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/ratingResult/loadByPage",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on loadByPage", async () => {
      await ratingResultCollection.insertOne(ratingResultBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/ratingResult/loadByPage?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.ratingResults).toBeTruthy();
      expect(responseBody.total).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/ratingResult/loadByPage?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/ratingResult/loadByPage",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("DELETE /api/ratingResult/delete", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/ratingResult/delete",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on delete", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await ratingResultCollection.insertOne({
        ...ratingResultBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/ratingResult/delete?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody).toEqual(true);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/ratingResult/delete?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/ratingResult/delete",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("PATCH /api/ratingResult/update", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/ratingResult/update",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on update", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await ratingResultCollection.insertOne({
        ...ratingResultBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/ratingResult/update?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
        body: { rating: "new rating" },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.rating).toEqual("new rating");
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/ratingResult/update?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
        body: { rating: "new rating" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/ratingResult/update",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
