import { makeFastifyInstance } from "@/index";
import { Collection } from "mongodb";
import { MongoHelper, env } from "@/application/infra";
import { sign } from "jsonwebtoken";
jest.setTimeout(50000);

let userCollection: Collection;
let categoryCollection: Collection;

const userBody = {
  email: "gustavoteste41@hotmail.com",
  name: "Gustavo",
  role: "client",
  password: "123456",
  passwordConfirmation: "123456",
  coord: { type: "Point", coordinates: [-46.693419, -23.568704] },
};
const categoryBody = {
  name: "test",
};
const makeAccessToken = async (role: string, password: string): Promise<any> => {
  const result = await userCollection.insertOne({ ...userBody, password, role });
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
    userCollection = await MongoHelper.getCollection("user");
    categoryCollection = await MongoHelper.getCollection("category");
    await userCollection.deleteMany({});
    await categoryCollection.deleteMany({});
  });
  describe("GET /api/category/refresh", () => {
    test("Should return 200 on refresh", async () => {
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
      await userCollection.insertOne(userBody);
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/category/add",
        headers: { authorization: `Bearer ${token}` },
        payload: categoryWrongBody,
      });
      expect(responseAdd.statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized access token", async () => {
      await userCollection.insertOne(userBody);
      const response = await fastify.inject({
        method: "POST",
        url: "/api/category/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: categoryBody,
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      await userCollection.insertOne(userBody);
      const response = await fastify.inject({
        method: "POST",
        url: "/api/category/add",
        payload: categoryBody,
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
