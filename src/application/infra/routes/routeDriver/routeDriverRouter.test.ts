import { makeFastifyInstance } from "@/index";
import { Collection, ObjectId } from "mongodb";
import { MongoHelper, env } from "@/application/infra";
import { sign } from "jsonwebtoken";
import { userBody } from "@/application/helpers/mocks/userBody";
jest.setTimeout(500000);

let userCollection: Collection;
let routeDriverCollection: Collection;

const routeDriverBody = {
  name: "test",
  status: "initialized",
  routeId: new ObjectId().toString(),
  points: [],
};
const makeAccessToken = async (role: string, password: string): Promise<any> => {
  const result = await userCollection.insertOne({ ...userBody, password, role });
  const _id = result?.insertedId;
  return { _id, token: sign({ _id }, env.jwtSecret) };
};
const mapRouteBody = {
  name: "test",
  source_id: "ChIJN1t_tDeuEmsRUsoyG83frY4",
  destination_id: "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
};
describe("Route api/routeDriver", () => {
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
    routeDriverCollection = await MongoHelper.getCollection("routeDriver");
    await userCollection.deleteMany({});
    await routeDriverCollection.deleteMany({});
  });
  describe("POST /api/routeDriver/add", () => {
    test("Should return 200 on add", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/routeDriver/add",
        headers: { authorization: `Bearer ${token}` },
        payload: routeDriverBody,
      });
      const responseBodyAdd = JSON.parse(responseAdd.body);
      expect(responseAdd.statusCode).toBe(200);
      expect(responseBodyAdd._id).toBeTruthy();
    });
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const routeDriverWrongBody = { ...routeDriverBody, name: null };
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/routeDriver/add",
        headers: { authorization: `Bearer ${token}` },
        payload: routeDriverWrongBody,
      });
      expect(responseAdd.statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/routeDriver/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: routeDriverBody,
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/routeDriver/add",
        payload: routeDriverBody,
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("GET /api/routeDriver/load", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/routeDriver/load",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on load", async () => {
      const { insertedId } = await routeDriverCollection.insertOne(routeDriverBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/routeDriver/load?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody._id).toEqual(insertedId.toString());
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/routeDriver/load?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/routeDriver/load",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("GET /api/routeDriver/loadByPage", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/routeDriver/loadByPage",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on loadByPage", async () => {
      await routeDriverCollection.insertOne(routeDriverBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/routeDriver/loadByPage?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.routeDrivers).toBeTruthy();
      expect(responseBody.total).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/routeDriver/loadByPage?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/routeDriver/loadByPage",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("DELETE /api/routeDriver/delete", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/routeDriver/delete",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on delete", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await routeDriverCollection.insertOne({
        ...routeDriverBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/routeDriver/delete?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody).toEqual(true);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/routeDriver/delete?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/routeDriver/delete",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("PATCH /api/routeDriver/update", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/routeDriver/update",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    // test("Should return 200 on update", async () => {
    //   const { token, _id } = await makeAccessToken("admin", "password");
    //   const responseAdd = await fastify.inject({
    //     method: "POST",
    //     url: "/api/mapRoute/add",
    //     headers: { authorization: `Bearer ${token}` },
    //     payload: mapRouteBody,
    //   });
    //   const responseBodyAdd = JSON.parse(responseAdd.body);

    //   const responseAddUpdate = await fastify.inject({
    //     method: "POST",
    //     url: "/api/routeDriver/add",
    //     headers: { authorization: `Bearer ${token}` },
    //     payload: {
    //       ...routeDriverBody,
    //       createdById: _id,
    //       routeId: responseBodyAdd?._id,
    //       source_id: responseBodyAdd?.source_id,
    //       destination_id: responseBodyAdd?.destination_id,
    //     },
    //   });
    //   const responseBodyAdded = JSON.parse(responseAddUpdate.body);
    //   const response = await fastify.inject({
    //     method: "PATCH",
    //     url: `/api/routeDriver/update?_id=${responseBodyAdded?._id}&routeId=${responseBodyAdd?._id}&lat=-33.8689604&lng=151.2092021`,
    //     headers: { authorization: `Bearer ${token}` },
    //     body: { name: "new name" },
    //   });
    //   const responseBody = JSON.parse(response.body);
    //   expect(response.statusCode).toBe(200);
    //   expect(responseBody.routeDriverOutput).toBeTruthy();
    // });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/routeDriver/update?_id=${new ObjectId().toString()}&routeId=${new ObjectId().toString()}lat=-33.8689604&lng=151.2092021`,
        headers: { authorization: "Bearer invalid_token" },
        body: { name: "new name" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/routeDriver/update",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
