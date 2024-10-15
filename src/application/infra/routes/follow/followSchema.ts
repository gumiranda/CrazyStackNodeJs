import { idSchema } from "@/application/types/id";

const bodyAddFollowJsonSchema = {
  type: "object",
  required: ["user1Slug", "user2Slug"],
  properties: {
    user1Slug: { type: "string" },
    user2Slug: { type: "string" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addFollowResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    user1Slug: { type: "string" },
    user2Slug: { type: "string" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addFollowPostSchema = {
  schema: {
    body: bodyAddFollowJsonSchema,
    response: { 200: addFollowResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadFollowSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadFollowResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    user1Slug: { type: "string" },
    user2Slug: { type: "string" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadFollowGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadFollowSchema,
    response: {
      200: loadFollowResponse,
    },
  },
};
const deleteFollowResponse = { type: "boolean" };
const queryStringJsonDeleteFollowSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteFollowSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteFollowSchema,
    response: {
      200: deleteFollowResponse,
    },
  },
};
const queryStringJsonUpdateFollowSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateFollowResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    user1Slug: { type: "string" },
    user2Slug: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateFollowBody = {
  type: "object",
  properties: {
    user1Slug: { type: "string" },
    user2Slug: { type: "string" },
  },
};
export const updateFollowSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateFollowSchema,
    body: updateFollowBody,
    response: {
      200: updateFollowResponse,
    },
  },
};
const queryStringJsonLoadFollowByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadFollowByPageResponse = {
  type: "object",
  properties: {
    follows: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          user1Slug: { type: "string" },
          user2Slug: { type: "string" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadFollowByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadFollowByPageSchema,
    response: {
      200: loadFollowByPageResponse,
    },
  },
};
