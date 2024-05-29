import { makeFastifyInstance } from "@/index";
import { Collection, ObjectId } from "mongodb";
import { MongoHelper, env } from "@/application/infra";
import { sign } from "jsonwebtoken";
import { userBody } from "@/application/helpers/mocks/userBody";
import { addDays } from "date-fns";
jest.setTimeout(500000);

let userCollection: Collection;
let requestCollection: Collection;
let serviceCollection: Collection;
let ownerCollection: Collection;
let categoryCollection: Collection;
let clientCollection: Collection;
const requestUpdateBody = {
  endDate: new Date().toISOString(),
};
const requestBody = {
  message: "any_email2@mail.com",
  serviceId: "61d83346240e5e3463a73e8c",
  ownerId: "61d83267240e5e3463a73e89",
  clientId: "61d4b5df5488a0912f10642c",
  clientUserId: "61d4b5df5488a0912f10642c",
  professionalId: "61d83355240e5e3463a73e8d",
  createdForId: "61d4b5df5488a0912f10642c",
  endDate: "2043-02-23T17:17:00.000Z",
  initDate: "2043-02-23T17:16:00.000Z",
  haveDelivery: false,
  haveRecurrence: false,
  haveFidelity: false,
  haveRide: false,
  type: "serv",
  status: 0,
  duration: 30,
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
describe("Route api/request", () => {
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
    requestCollection = await MongoHelper.getCollection("request");
    userCollection = await MongoHelper.getCollection("users");
    serviceCollection = await MongoHelper.getCollection("service");
    ownerCollection = await MongoHelper.getCollection("owner");
    requestCollection = await MongoHelper.getCollection("request");
    categoryCollection = await MongoHelper.getCollection("category");
    clientCollection = await MongoHelper.getCollection("client");
    await ownerCollection.deleteMany({});
    await requestCollection.deleteMany({});
    await categoryCollection.deleteMany({});
    await requestCollection.deleteMany({});
    await userCollection.deleteMany({});
    await serviceCollection.deleteMany({});
    await clientCollection.deleteMany({});
  });
  describe("POST /api/request/add", () => {
    test("Should return 200 on add", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const categoryToAdd = {
        createdById: new ObjectId(_id),
        name: "zzzz",
        active: true,
        description: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const { insertedId: categoryId } = await categoryCollection.insertOne(categoryToAdd);
      const serviceToAdd = {
        name: "any_name",
        type: "service",
        description: "any_description",
        price: 90,
        finalPrice: 90.3,
        comission: 90.3,
        havePromotionalPrice: false,
        hasFidelityGenerator: false,
        categoryId: new ObjectId(categoryId),
        productsQuantityNeeded: 0,
        requestsTotal: 0,
        canPayWithFidelityPoints: false,
        duration: 15,
        active: true,
        createdById: new ObjectId(_id),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const { insertedId: serviceId } = await serviceCollection.insertOne(serviceToAdd);
      const ownerToAdd = {
        days1: {
          monday1: true,
          sunday1: false,
          thursday1: false,
          wednesday1: false,
          tuesday1: false,
          friday1: false,
          saturday1: false,
        },
        hourStart1: "6:00",
        hourEnd1: "23:00",
        hourLunchStart1: "09:00",
        hourLunchEnd1: "10:00",
        minimumTimeForReSchedule: 40,
        haveDelivery: false,
        active: true,
        createdById: new ObjectId(_id),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const { insertedId: ownerId } = await ownerCollection.insertOne(ownerToAdd);
      await userCollection.updateOne(
        { _id: new ObjectId(_id) },
        {
          $set: { ownerId },
        },
        {
          upsert: false,
        }
      );
      const professionalToAdd = {
        name: "zzzz",
        email: "any_email2@mail.com",
        role: "professional",
        ownerId: new ObjectId(ownerId),
        myOwnerId: new ObjectId(_id),
        serviceIds: [new ObjectId(serviceId)],
        active: true,
        createdById: new ObjectId(_id),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const { insertedId: professionalId } =
        await userCollection.insertOne(professionalToAdd);
      const { insertedId: clientUserId } = await userCollection.insertOne({ ...userBody });
      const clientToAdd = {
        name: "zzzz",
        cpf: null,
        phone: null,
        userId: new ObjectId(clientUserId),
        ownerId: new ObjectId(ownerId),
        birthDate: null,
        active: true,
        createdById: new ObjectId(_id),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const { insertedId: clientId } = await clientCollection.insertOne(clientToAdd);

      const requestToAdd = {
        message: "any_email2@mail.com",
        serviceId: new ObjectId(serviceId),
        ownerId: new ObjectId(_id),
        clientId: new ObjectId(clientId),
        clientUserId: new ObjectId(clientUserId),
        professionalId: new ObjectId(professionalId),
        createdForId: new ObjectId(clientId),
        endDate: "2043-02-23T17:15:00.000Z",
        initDate: "2043-02-23T17:00:00.000Z",
        haveDelivery: false,
        haveRecurrence: false,
        haveFidelity: false,
        haveRide: false,
        type: "serv",
        status: 0,
        duration: 30,
      };
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/request/add",
        headers: { authorization: `Bearer ${token}` },
        payload: requestToAdd,
      });
      const responseBodyAdd = JSON.parse(responseAdd.body);
      expect(responseAdd.statusCode).toBe(200);
      expect(responseBodyAdd?._id).toBeTruthy();
      expect(responseBodyAdd?.clientId).toBeTruthy();
      expect(responseBodyAdd?.createdById).toBeTruthy();
      expect(responseBodyAdd?.createdForId).toBeTruthy();
      expect(responseBodyAdd?.endDate).toEqual("2043-02-23T17:15:00.000Z");
      expect(responseBodyAdd?.initDate).toBe("2043-02-23T17:00:00.000Z");
      expect(responseBodyAdd?.message).toBe("any_email2@mail.com");
      expect(responseBodyAdd?.ownerId).toBe(_id.toString());
      expect(responseBodyAdd?.professionalId).toBe(professionalId.toString());
      expect(responseBodyAdd?.serviceId).toBe(serviceId.toString());
      expect(responseBodyAdd?.status).toBe(0);
    });
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const requestWrongBody = { ...requestBody, endDate: null };
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/request/add",
        headers: { authorization: `Bearer ${token}` },
        payload: requestWrongBody,
      });
      expect(responseAdd.statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/request/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: requestBody,
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/request/add",
        payload: requestBody,
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("GET /api/request/load", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/request/load",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on load", async () => {
      const { insertedId } = await requestCollection.insertOne(requestBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/request/load?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody._id).toEqual(insertedId.toString());
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/request/load?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/request/load",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("GET /api/request/loadByPage", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/request/loadByPage",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on loadByPage", async () => {
      await requestCollection.insertOne(requestBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/request/loadByPage?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.requests).toBeTruthy();
      expect(responseBody.total).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/request/loadByPage?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/request/loadByPage",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("DELETE /api/request/delete", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/request/delete",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on delete", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await requestCollection.insertOne({
        ...requestBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/request/delete?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody).toEqual(true);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/request/delete?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/request/delete",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("PATCH /api/request/update", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/request/update",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on update", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await requestCollection.insertOne({
        ...requestBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/request/update?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
        body: { endDate: requestUpdateBody.endDate, status: 1 },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.endDate).toEqual(requestUpdateBody.endDate);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/request/update?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
        body: { endDate: requestUpdateBody.endDate },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/request/update",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
