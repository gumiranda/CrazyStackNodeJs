import { idSchema } from "@/application/types/id";

const bodyAddPlaceJsonSchema = {
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
const addPlaceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addPlacePostSchema = {
  schema: {
    body: bodyAddPlaceJsonSchema,
    response: { 200: addPlaceResponse },
    headers: headersJsonSchema,security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadPlaceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadPlaceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadPlaceGetSchema = {
  schema: {
    headers: headersJsonSchema,security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadPlaceSchema,
    response: {
      200: loadPlaceResponse,
    },
  },
};
const deletePlaceResponse = { type: "boolean" };
const queryStringJsonDeletePlaceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deletePlaceSchema = {
  schema: {
    headers: headersJsonSchema,security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeletePlaceSchema,
    response: {
      200: deletePlaceResponse,
    },
  },
};
const queryStringJsonUpdatePlaceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updatePlaceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updatePlaceBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updatePlaceSchema = {
  schema: {
    headers: headersJsonSchema,security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdatePlaceSchema,
    body: updatePlaceBody,
    response: {
      200: updatePlaceResponse,
    },
  },
};
const queryStringJsonLoadPlaceByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadPlaceByPageResponse = {
  type: "object",
  properties: {
    places: {
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
export const loadPlaceByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadPlaceByPageSchema,
    response: {
      200: loadPlaceByPageResponse,
    },
  },
};
