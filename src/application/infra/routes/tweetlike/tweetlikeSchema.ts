import { idSchema } from "@/application/types/id";

const bodyToggleTweetlikeJsonSchema = {
  type: "object",
  required: ["userSlug", "tweetId"],
  properties: {
    userSlug: { type: "string" },
    tweetId: { type: "string" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const toggleTweetlikeResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    userSlug: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    tweetId: { type: "string" },
  },
};
export const toggleTweetlikePostSchema = {
  schema: {
    body: bodyToggleTweetlikeJsonSchema,
    response: { 200: toggleTweetlikeResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadTweetlikeSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadTweetlikeResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    userSlug: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    tweetId: { type: "string" },
  },
};
export const loadTweetlikeGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadTweetlikeSchema,
    response: {
      200: loadTweetlikeResponse,
    },
  },
};
const deleteTweetlikeResponse = { type: "boolean" };
const queryStringJsonDeleteTweetlikeSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteTweetlikeSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteTweetlikeSchema,
    response: {
      200: deleteTweetlikeResponse,
    },
  },
};
const queryStringJsonUpdateTweetlikeSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateTweetlikeResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    userSlug: { type: "string" },
    createdById: { type: "string" },
    tweetId: { type: "string" },
  },
};
const updateTweetlikeBody = {
  type: "object",
  properties: {
    userSlug: { type: "string" },
    tweetId: { type: "string" },
  },
};
export const updateTweetlikeSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateTweetlikeSchema,
    body: updateTweetlikeBody,
    response: {
      200: updateTweetlikeResponse,
    },
  },
};
const queryStringJsonLoadTweetlikeByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadTweetlikeByPageResponse = {
  type: "object",
  properties: {
    tweetlikes: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          userSlug: { type: "string" },
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
          tweetId: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadTweetlikeByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadTweetlikeByPageSchema,
    response: {
      200: loadTweetlikeByPageResponse,
    },
  },
};
