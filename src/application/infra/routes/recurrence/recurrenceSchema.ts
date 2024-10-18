import { idSchema } from "@/application/types/id";

const bodyAddRecurrenceJsonSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addRecurrenceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addRecurrencePostSchema = {
  schema: {
    body: bodyAddRecurrenceJsonSchema,
    response: { 200: addRecurrenceResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadRecurrenceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadRecurrenceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadRecurrenceGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadRecurrenceSchema,
    response: {
      200: loadRecurrenceResponse,
    },
  },
};
const deleteRecurrenceResponse = { type: "boolean" };
const queryStringJsonDeleteRecurrenceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteRecurrenceSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeleteRecurrenceSchema,
    response: {
      200: deleteRecurrenceResponse,
    },
  },
};
const queryStringJsonUpdateRecurrenceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateRecurrenceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateRecurrenceBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateRecurrenceSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdateRecurrenceSchema,
    body: updateRecurrenceBody,
    response: {
      200: updateRecurrenceResponse,
    },
  },
};
const queryStringJsonLoadRecurrenceByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadRecurrenceByPageResponse = {
  type: "object",
  properties: {
    recurrences: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          name: { type: "string" },
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadRecurrenceByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadRecurrenceByPageSchema,
    response: {
      200: loadRecurrenceByPageResponse,
    },
  },
};
