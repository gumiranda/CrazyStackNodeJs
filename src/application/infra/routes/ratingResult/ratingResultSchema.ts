import { idSchema } from "@/application/types/id";

const bodyAddRatingResultJsonSchema = {
  type: "object",
  required: ["ratingId", "requestId", "ratingForId", "ratingType", "rating", "comment"],
  properties: {
    ratingId: idSchema,
    requestId: idSchema,
    ratingForId: idSchema,
    ratingType: { type: "string" },
    rating: { type: "string" },
    comment: { type: "object", properties: { ratingText: { type: "string" } } },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addRatingResultResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    ratingId: idSchema,
    requestId: idSchema,
    ratingForId: idSchema,
    ratingType: { type: "string" },
    rating: { type: "string" },
    comment: { type: "object", properties: { ratingText: { type: "string" } } },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addRatingResultPostSchema = {
  schema: {
    body: bodyAddRatingResultJsonSchema,
    response: { 200: addRatingResultResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadRatingResultSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadRatingResultResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    ratingId: idSchema,
    requestId: idSchema,
    ratingForId: idSchema,
    ratingType: { type: "string" },
    rating: { type: "string" },
    comment: { type: "object", properties: { ratingText: { type: "string" } } },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadRatingResultGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadRatingResultSchema,
    response: {
      200: loadRatingResultResponse,
    },
  },
};
const deleteRatingResultResponse = { type: "boolean" };
const queryStringJsonDeleteRatingResultSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteRatingResultSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeleteRatingResultSchema,
    response: {
      200: deleteRatingResultResponse,
    },
  },
};
const queryStringJsonUpdateRatingResultSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateRatingResultResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    ratingId: idSchema,
    requestId: idSchema,
    ratingForId: idSchema,
    ratingType: { type: "string" },
    rating: { type: "string" },
    comment: { type: "object", properties: { ratingText: { type: "string" } } },
    createdById: { type: "string" },
  },
};
const updateRatingResultBody = {
  type: "object",
  properties: {
    ratingId: idSchema,
    requestId: idSchema,
    ratingForId: idSchema,
    ratingType: { type: "string" },
    rating: { type: "string" },
    comment: { type: "object", properties: { ratingText: { type: "string" } } },
  },
};
export const updateRatingResultSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdateRatingResultSchema,
    body: updateRatingResultBody,
    response: {
      200: updateRatingResultResponse,
    },
  },
};
const queryStringJsonLoadRatingResultByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadRatingResultByPageResponse = {
  type: "object",
  properties: {
    ratingResults: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          ratingId: idSchema,
          requestId: idSchema,
          ratingForId: idSchema,
          ratingType: { type: "string" },
          rating: { type: "string" },
          comment: { type: "object", properties: { ratingText: { type: "string" } } },
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadRatingResultByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadRatingResultByPageSchema,
    response: {
      200: loadRatingResultByPageResponse,
    },
  },
};
