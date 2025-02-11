import { idSchema } from "@/application/types/id";

const bodyAddClientJsonSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" },
    phone: { type: "string" },
    userId: { type: "string" },
    active: { type: "boolean" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addClientResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    phone: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    userId: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addClientPostSchema = {
  schema: {
    body: bodyAddClientJsonSchema,
    response: { 200: addClientResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadClientSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadClientResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    phone: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    userId: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadClientGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadClientSchema,
    response: {
      200: loadClientResponse,
    },
  },
};
const deleteClientResponse = { type: "boolean" };
const queryStringJsonDeleteClientSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteClientSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeleteClientSchema,
    response: {
      200: deleteClientResponse,
    },
  },
};
const queryStringJsonUpdateClientSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateClientResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    phone: { type: "string" },
    createdById: { type: "string" },
    userId: { type: "string" },
  },
};
const updateClientBody = {
  type: "object",
  properties: {
    name: { type: "string" },
    phone: { type: "string" },
  },
};
export const updateClientSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdateClientSchema,
    body: updateClientBody,
    response: {
      200: updateClientResponse,
    },
  },
};
const queryStringJsonLoadClientByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadClientByPageResponse = {
  type: "object",
  properties: {
    clients: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          name: { type: "string" },
          phone: { type: "string" },
          active: { type: "boolean" },
          createdById: { type: "string" },
          userId: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadClientByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadClientByPageSchema,
    response: {
      200: loadClientByPageResponse,
    },
  },
};
