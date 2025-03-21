import { idSchema } from "@/application/types/id";

const bodyAddRatingJsonSchema = {
  type: "object",
  required: ["ratingType", "ratings"],
  properties: {
    ratings: {},
    ratingType: { type: "string" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addRatingResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    ratings: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {},
      },
    },
    ratingType: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addRatingPostSchema = {
  schema: {
    body: bodyAddRatingJsonSchema,
    response: { 200: addRatingResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadRatingSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadRatingResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    ratings: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {},
      },
    },
    ratingType: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadRatingGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadRatingSchema,
    response: {
      200: loadRatingResponse,
    },
  },
};
const deleteRatingResponse = { type: "boolean" };
const queryStringJsonDeleteRatingSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteRatingSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeleteRatingSchema,
    response: {
      200: deleteRatingResponse,
    },
  },
};
const queryStringJsonUpdateRatingSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateRatingResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    ratings: {},
    ratingType: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateRatingBody = {
  type: "object",
  properties: {
    ratings: {},
    ratingType: { type: "string" },
  },
};
export const updateRatingSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdateRatingSchema,
    body: updateRatingBody,
    response: {
      200: updateRatingResponse,
    },
  },
};
const queryStringJsonLoadRatingByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadRatingByPageResponse = {
  type: "object",
  properties: {
    ratings: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          ratings: {
            type: "array",
            maxItems: 10,
          },
          ratingType: { type: "string" },
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadRatingByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadRatingByPageSchema,
    response: {
      200: loadRatingByPageResponse,
    },
  },
};
