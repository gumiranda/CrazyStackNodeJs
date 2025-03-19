import { idSchema } from "@/application/types/id";

const bodyAddCategoryPlaceJsonSchema = {
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
const addCategoryPlaceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addCategoryPlacePostSchema = {
  schema: {
    body: bodyAddCategoryPlaceJsonSchema,
    response: { 200: addCategoryPlaceResponse },
    headers: headersJsonSchema,security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadCategoryPlaceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadCategoryPlaceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadCategoryPlaceGetSchema = {
  schema: {
    headers: headersJsonSchema,security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadCategoryPlaceSchema,
    response: {
      200: loadCategoryPlaceResponse,
    },
  },
};
const deleteCategoryPlaceResponse = { type: "boolean" };
const queryStringJsonDeleteCategoryPlaceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteCategoryPlaceSchema = {
  schema: {
    headers: headersJsonSchema,security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeleteCategoryPlaceSchema,
    response: {
      200: deleteCategoryPlaceResponse,
    },
  },
};
const queryStringJsonUpdateCategoryPlaceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateCategoryPlaceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateCategoryPlaceBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateCategoryPlaceSchema = {
  schema: {
    headers: headersJsonSchema,security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdateCategoryPlaceSchema,
    body: updateCategoryPlaceBody,
    response: {
      200: updateCategoryPlaceResponse,
    },
  },
};
const queryStringJsonLoadCategoryPlaceByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadCategoryPlaceByPageResponse = {
  type: "object",
  properties: {
    categoryPlaces: {
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
export const loadCategoryPlaceByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadCategoryPlaceByPageSchema,
    response: {
      200: loadCategoryPlaceByPageResponse,
    },
  },
};
