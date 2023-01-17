import { makeFastifyInstance } from "@/index";
import { Collection, ObjectId } from "mongodb";
import { MongoHelper, env } from "@/application/infra";
import { sign } from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";

jest.setTimeout(50000);

let userCollection: Collection;
let ratingCollection: Collection;

const userBody = {
  email: "gustavoteste41@hotmail.com",
  name: "Gustavo",
  role: "client",
  password: "123456",
  passwordConfirmation: "123456",
  coord: { type: "Point", coordinates: [-46.693419, -23.568704] },
};
const ratingBody = {
  ratings: [
    {
      rating: "Ótimo",
      stars: 5,
    },
    {
      rating: "Bom",
      stars: 4,
    },
    {
      rating: "Mais ou menos",
      stars: 3,
    },
    {
      rating: "Meia boca",
      stars: 2,
    },
    {
      rating: "Péssimo",
      stars: 1,
    },
  ],
  ratingType: "Atendimento",
};
const makeAccessToken = async (role: string, password: string): Promise<any> => {
  const result = await userCollection.insertOne({ ...userBody, password, role });
  const _id = result?.insertedId;
  return { _id, token: sign({ _id }, env.jwtSecret) };
};
describe("Route api/rating", () => {
  let fastify: any;
  let mongo = null;
  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    const client = await MongoHelper.connect(uri as string);
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
    ratingCollection = await MongoHelper.getCollection("rating");
    await userCollection.deleteMany({});
    await ratingCollection.deleteMany({});
  });
  describe("POST /api/rating/add", () => {
    test("Should return 200 on add", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/rating/add",
        headers: { authorization: `Bearer ${token}` },
        payload: ratingBody,
      });
      const responseBodyAdd = JSON.parse(responseAdd.body);
      expect(responseAdd.statusCode).toBe(200);
      expect(responseBodyAdd._id).toBeTruthy();
    });
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const ratingWrongBody = { ...ratingBody, ratings: null };
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/rating/add",
        headers: { authorization: `Bearer ${token}` },
        payload: ratingWrongBody,
      });
      expect(responseAdd.statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/rating/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: ratingBody,
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/rating/add",
        payload: ratingBody,
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("GET /api/rating/load", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/rating/load",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on load", async () => {
      const { insertedId } = await ratingCollection.insertOne(ratingBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/rating/load?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody._id).toEqual(insertedId.toString());
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/rating/load?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/rating/load",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("GET /api/rating/loadByPage", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/rating/loadByPage",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on loadByPage", async () => {
      await ratingCollection.insertOne(ratingBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/rating/loadByPage?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.ratings).toBeTruthy();
      expect(responseBody.total).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/rating/loadByPage?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/rating/loadByPage",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("DELETE /api/rating/delete", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/rating/delete",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on delete", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await ratingCollection.insertOne({
        ...ratingBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/rating/delete?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody).toEqual(true);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/rating/delete?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/rating/delete",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("PATCH /api/rating/update", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/rating/update",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on update", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await ratingCollection.insertOne({
        ...ratingBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/rating/update?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
        body: {
          ratings: [
            {
              rating: "Maravilha",
              stars: 5,
            },
            {
              rating: "Bom",
              stars: 4,
            },
            {
              rating: "Mais ou menos",
              stars: 3,
            },
            {
              rating: "Meia boca",
              stars: 2,
            },
            {
              rating: "Péssimo",
              stars: 1,
            },
          ],
        },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.ratings).toEqual([
        {
          rating: "Maravilha",
          stars: 5,
        },
        {
          rating: "Bom",
          stars: 4,
        },
        {
          rating: "Mais ou menos",
          stars: 3,
        },
        {
          rating: "Meia boca",
          stars: 2,
        },
        {
          rating: "Péssimo",
          stars: 1,
        },
      ]);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/rating/update?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
        body: {
          ratings: [
            {
              rating: "Maravilha",
              stars: 5,
            },
            {
              rating: "Bom",
              stars: 4,
            },
            {
              rating: "Mais ou menos",
              stars: 3,
            },
            {
              rating: "Meia boca",
              stars: 2,
            },
            {
              rating: "Péssimo",
              stars: 1,
            },
          ],
        },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/rating/update",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
