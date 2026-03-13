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
let appointmentCollection: Collection;
let serviceCollection: Collection;
let ownerCollection: Collection;
let requestCollection: Collection;
let categoryCollection: Collection;
let clientCollection: Collection;
const appointmentUpdateBody = {
  endDate: new Date().toISOString(),
};

const appointmentBody = {
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
  requestId: new ObjectId("61d83b7a146de5690b0fcac8"),
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
describe("Route api/appointment", () => {
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
    appointmentCollection = await MongoHelper.getCollection("appointment");
    userCollection = await MongoHelper.getCollection("users");
    serviceCollection = await MongoHelper.getCollection("service");
    ownerCollection = await MongoHelper.getCollection("owner");
    requestCollection = await MongoHelper.getCollection("request");
    categoryCollection = await MongoHelper.getCollection("category");
    clientCollection = await MongoHelper.getCollection("client");
    await ownerCollection.deleteMany({});
    await requestCollection.deleteMany({});
    await categoryCollection.deleteMany({});
    await appointmentCollection.deleteMany({});
    await userCollection.deleteMany({});
    await serviceCollection.deleteMany({});
    await clientCollection.deleteMany({});
  });
  describe("POST /api/appointment/add", () => {
    // test("Should return 200 on add", async () => {
    //   const { token, _id } = await makeAccessToken("admin", "password");
    //   const categoryToAdd = {
    //     createdById: new ObjectId(_id),
    //     name: "zzzz",
    //     active: true,
    //     description: null,
    //     image: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    //   const { insertedId: categoryId } = await categoryCollection.insertOne(categoryToAdd);
    //   const serviceToAdd = {
    //     name: "any_name",
    //     type: "service",
    //     description: "any_description",
    //     price: 90,
    //     finalPrice: 90.3,
    //     comission: 90.3,
    //     havePromotionalPrice: false,
    //     hasFidelityGenerator: false,
    //     categoryId: new ObjectId(categoryId),
    //     productsQuantityNeeded: 0,
    //     appointmentsTotal: 0,
    //     canPayWithFidelityPoints: false,
    //     duration: 15,
    //     active: true,
    //     createdById: new ObjectId(_id),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    //   const { insertedId: serviceId } = await serviceCollection.insertOne(serviceToAdd);
    //   const ownerToAdd = {
    //     days1: {
    //       monday1: true,
    //       sunday1: false,
    //       thursday1: false,
    //       wednesday1: false,
    //       tuesday1: false,
    //       friday1: false,
    //       saturday1: false,
    //     },
    //     hourStart1: "6:00",
    //     hourEnd1: "23:00",
    //     hourLunchStart1: "09:00",
    //     hourLunchEnd1: "10:00",
    //     minimumTimeForReSchedule: 40,
    //     haveDelivery: false,
    //     active: true,
    //     createdById: new ObjectId(_id),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    //   const { insertedId: ownerId } = await ownerCollection.insertOne(ownerToAdd);
    //   await userCollection.updateOne(
    //     { _id: new ObjectId(_id) },
    //     {
    //       $set: { ownerId },
    //     },
    //     {
    //       upsert: false,
    //     }
    //   );
    //   const professionalToAdd = {
    //     name: "zzzz",
    //     email: "any_email2@mail.com",
    //     role: "professional",
    //     ownerId: new ObjectId(ownerId),
    //     myOwnerId: new ObjectId(_id),
    //     serviceIds: [new ObjectId(serviceId)],
    //     active: true,
    //     createdById: new ObjectId(_id),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    //   const { insertedId: professionalId } = await userCollection.insertOne(
    //     professionalToAdd
    //   );
    //   const { insertedId: clientUserId } = await userCollection.insertOne({ ...userBody });
    //   const clientToAdd = {
    //     name: "zzzz",
    //     cpf: null,
    //     phone: null,
    //     userId: new ObjectId(clientUserId),
    //     ownerId: new ObjectId(ownerId),
    //     birthDate: null,
    //     active: true,
    //     createdById: new ObjectId(_id),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    //   const { insertedId: clientId } = await clientCollection.insertOne(clientToAdd);
    //   const requestToAdd = {
    //     message: "any_email2@mail.com",
    //     serviceId: new ObjectId(serviceId),
    //     ownerId: new ObjectId(_id),
    //     clientId: new ObjectId(clientId),
    //     clientUserId: new ObjectId(clientUserId),
    //     professionalId: new ObjectId(professionalId),
    //     endDate: "2043-02-23T17:15:00.000Z",
    //     initDate: "2043-02-23T17:00:00.000Z",
    //     haveDelivery: false,
    //     haveRecurrence: false,
    //     haveFidelity: false,
    //     haveRide: false,
    //     type: "service",
    //     status: 0,
    //     active: true,
    //     createdById: new ObjectId(_id),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    //   const { insertedId: requestId } = await requestCollection.insertOne(requestToAdd);
    //   const appointmentToAdd = {
    //     message: "any_email2@mail.com",
    //     serviceId: new ObjectId(serviceId),
    //     ownerId: new ObjectId(_id),
    //     clientId: new ObjectId(clientId),
    //     clientUserId: new ObjectId(clientUserId),
    //     professionalId: new ObjectId(professionalId),
    //     createdForId: new ObjectId(clientId),
    //     endDate: "2043-02-23T17:15:00.000Z",
    //     initDate: "2043-02-23T17:00:00.000Z",
    //     haveDelivery: false,
    //     haveRecurrence: false,
    //     haveFidelity: false,
    //     haveRide: false,
    //     type: "serv",
    //     status: 0,
    //     requestId: new ObjectId(requestId),
    //   };
    //   const { statusCode, body: responseBodyAdd } = await inject(app, {
    //     method: "POST",
    //     url: "/appointment/add",
    //     headers: { authorization: `Bearer ${token}` },
    //     payload: appointmentToAdd,
    //   });
    //   expect(statusCode).toBe(200);
    //   expect(responseBodyAdd?._id).toBeTruthy();
    //   expect(responseBodyAdd?.clientId).toBeTruthy();
    //   expect(responseBodyAdd?.createdById).toBeTruthy();
    //   expect(responseBodyAdd?.createdForId).toBeTruthy();
    //   expect(responseBodyAdd?.endDate).toEqual("2043-02-23T17:15:00.000Z");
    //   expect(responseBodyAdd?.initDate).toBe("2043-02-23T17:00:00.000Z");
    //   expect(responseBodyAdd?.message).toBe("any_email2@mail.com");
    //   expect(responseBodyAdd?.ownerId).toBe(_id.toString());
    //   expect(responseBodyAdd?.professionalId).toBe(professionalId.toString());
    //   expect(responseBodyAdd?.requestId).toBe(requestId.toString());
    //   expect(responseBodyAdd?.serviceId).toBe(serviceId.toString());
    //   expect(responseBodyAdd?.status).toBe(0);
    // });
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const appointmentWrongBody = { ...appointmentBody, endDate: null };
      const { statusCode } = await inject(app, {
        method: "POST",
        url: "/appointment/add",
        headers: { authorization: `Bearer ${token}` },
        payload: appointmentWrongBody,
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "POST",
        url: "/appointment/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: appointmentBody,
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "POST",
        url: "/appointment/add",
        payload: appointmentBody,
      });
      expect(statusCode).toBe(400);
    });
  });
  describe("GET /api/appointment/load", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/appointment/load",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 200 on load", async () => {
      const { insertedId } = await appointmentCollection.insertOne(appointmentBody);
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode, body } = await inject(app, {
        method: "GET",
        url: `/appointment/load?_id=${insertedId.toString()}&requestId=${
          appointmentBody.requestId
        }`,
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(200);
      expect(body._id).toEqual(insertedId.toString());
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: `/appointment/load?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}&requestId=${
          appointmentBody.requestId
        }`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/appointment/load",
      });
      expect(statusCode).toBe(400);
    });
  });

  describe("GET /api/appointment/loadByPage", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/appointment/loadByPage",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 200 on loadByPage", async () => {
      await appointmentCollection.insertOne(appointmentBody);
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode, body } = await inject(app, {
        method: "GET",
        url: `/appointment/loadByPage?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(200);
      expect(body.appointments).toBeTruthy();
      expect(body.total).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: `/appointment/loadByPage?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "GET",
        url: "/appointment/loadByPage",
      });
      expect(statusCode).toBe(400);
    });
  });
  describe("DELETE /api/appointment/delete", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode } = await inject(app, {
        method: "DELETE",
        url: "/appointment/delete",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(400);
    });
    // test("Should return 200 on delete", async () => {
    //   const { token, _id } = await makeAccessToken("admin", "password");
    //   const { insertedId } = await appointmentCollection.insertOne({
    //     ...appointmentBody,
    //     createdById: _id,
    //   });
    //   const { statusCode, body } = await inject(app, {
    //     method: "DELETE",
    //     url: `/appointment/delete?_id=${insertedId.toString()}&requestId=${
    //       appointmentBody.requestId
    //     }`,
    //     headers: { authorization: `Bearer ${token}` },
    //   });
    //   expect(statusCode).toBe(200);
    //   expect(body).toEqual(true);
    // });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "DELETE",
        url: `/appointment/delete?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}&requestId=${
          appointmentBody.requestId
        }`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "DELETE",
        url: "/appointment/delete",
      });
      expect(statusCode).toBe(400);
    });
  });
  describe("PATCH /api/appointment/update", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const { statusCode } = await inject(app, {
        method: "PATCH",
        url: "/appointment/update",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(statusCode).toBe(400);
    });
    test("Should return 200 on update", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await appointmentCollection.insertOne({
        ...appointmentBody,
        createdById: _id,
      });
      const { statusCode, body } = await inject(app, {
        method: "PATCH",
        url: `/appointment/update?_id=${insertedId.toString()}&requestId=${
          appointmentBody.requestId
        }`,
        headers: { authorization: `Bearer ${token}` },
        payload: { endDate: appointmentUpdateBody.endDate },
      });
      expect(statusCode).toBe(200);
      expect(body.endDate).toEqual(appointmentUpdateBody.endDate);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const { statusCode } = await inject(app, {
        method: "PATCH",
        url: `/appointment/update?_id=${ObjectId.createFromTime(new Date().getTime()).toString()}&requestId=${
          appointmentBody.requestId
        }`,
        headers: { authorization: "Bearer invalid_token" },
        payload: { endDate: appointmentUpdateBody.endDate },
      });
      expect(statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const { statusCode } = await inject(app, {
        method: "PATCH",
        url: "/appointment/update",
      });
      expect(statusCode).toBe(400);
    });
  });
});
