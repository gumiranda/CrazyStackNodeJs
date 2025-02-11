import { idSchema } from "@/application/types/id";

const bodyAddTrendJsonSchema = {
  type: "object",
  required: ["hashtag"],
  properties: {
    hashtag: { type: "string" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addTrendResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    hashtag: { type: "string" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addTrendPostSchema = {
  schema: {
    body: bodyAddTrendJsonSchema,
    response: { 200: addTrendResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadTrendSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadTrendResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    hashtag: { type: "string" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadTrendGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadTrendSchema,
    response: {
      200: loadTrendResponse,
    },
  },
};
const deleteTrendResponse = { type: "boolean" };
const queryStringJsonDeleteTrendSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteTrendSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeleteTrendSchema,
    response: {
      200: deleteTrendResponse,
    },
  },
};
const queryStringJsonUpdateTrendSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateTrendResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    hashtag: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateTrendBody = {
  type: "object",
  properties: {
    hashtag: { type: "string" },
  },
};
export const updateTrendSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdateTrendSchema,
    body: updateTrendBody,
    response: {
      200: updateTrendResponse,
    },
  },
};
const queryStringJsonLoadTrendByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadTrendByPageResponse = {
  type: "object",
  properties: {
    trends: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          hashtag: { type: "string" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadTrendByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadTrendByPageSchema,
    response: {
      200: loadTrendByPageResponse,
    },
  },
};
