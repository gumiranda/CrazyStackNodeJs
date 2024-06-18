import { idSchema } from "@/application/types/id";

const bodyAddUserJsonSchema = {
  type: "object",
  required: ["name", "email", "password", "passwordConfirmation", "role", "serviceIds"],
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    role: {
      type: "string",
      enum: ["professional"],
    },
    photoId: idSchema,
    password: { type: "string" },
    passwordConfirmation: { type: "string" },
    serviceIds: { type: "array", items: idSchema },
    coord: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["Point"] },
        coordinates: { type: "array", items: { type: "number" } },
      },
    },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addUserResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    email: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addUserPostSchema = {
  schema: {
    body: bodyAddUserJsonSchema,
    response: { 200: addUserResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadUserSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadUserResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    serviceIds: {
      type: "array",
      nullable: true,
      items: idSchema,
    },
    ownerId: idSchema,
    myOwnerId: idSchema,
    active: { type: "boolean" },
    createdById: { type: "string" },
    payDay: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadUserGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadUserSchema,
    response: {
      200: loadUserResponse,
    },
  },
};
const deleteUserResponse = { type: "boolean" };
const queryStringJsonDeleteUserSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteUserSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteUserSchema,
    response: {
      200: deleteUserResponse,
    },
  },
};
const queryStringJsonUpdateUserSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateUserResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    serviceIds: {
      type: "array",
      nullable: true,
      items: idSchema,
    },
    createdById: { type: "string" },
  },
  additionalProperties: false,
};
const updateUserBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateUserSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateUserSchema,
    body: updateUserBody,
    response: {
      200: updateUserResponse,
    },
  },
};
const queryStringJsonLoadUserByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadUserByPageResponse = {
  type: "object",
  properties: {
    users: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          name: { type: "string" },
          role: {
            type: "string",
            enum: ["professional", "owner", "client", "visitor"],
          },
          serviceIds: {
            type: "array",
            nullable: true,
            items: idSchema,
          },
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
          photoId: idSchema,
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadUserByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadUserByPageSchema,
    response: {
      200: loadUserByPageResponse,
    },
  },
};
const loadUserGeoNearResponse = {
  type: "object",
  properties: {
    users: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          name: { type: "string" },
          distance: { type: "number" },
          role: {
            type: "string",
            enum: ["professional", "owner", "client", "guest"],
          },
          serviceIds: {
            type: "array",
            nullable: true,
            items: idSchema,
          },
          createdAt: { type: "string" },
          photoId: idSchema,
        },
      },
    },
    total: { type: "integer" },
    cache: { type: "boolean", nullable: true },
  },
};
const queryStringJsonLoadUserGeoNearSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
export const loadUserByGeoNearSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadUserGeoNearSchema,
    response: {
      200: loadUserGeoNearResponse,
    },
  },
};
