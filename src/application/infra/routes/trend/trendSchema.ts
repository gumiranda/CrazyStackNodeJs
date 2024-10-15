import { idSchema } from "@/application/types/id";

const bodyAddTrendJsonSchema = {
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
const addTrendResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addTrendPostSchema = {
  schema: {
    body: bodyAddTrendJsonSchema,
    response: { 200: addTrendResponse },
    headers: headersJsonSchema,
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
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadTrendGetSchema = {
  schema: {
    headers: headersJsonSchema,
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
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateTrendBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateTrendSchema = {
  schema: {
    headers: headersJsonSchema,
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
export const loadTrendByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadTrendByPageSchema,
    response: {
      200: loadTrendByPageResponse,
    },
  },
};
