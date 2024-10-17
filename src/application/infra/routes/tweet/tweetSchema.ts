import { idSchema } from "@/application/types/id";

const bodyAddTweetJsonSchema = {
  type: "object",
  required: ["userSlug", "body"],
  properties: {
    userSlug: { type: "string" },
    body: { type: "string" },
    image: { type: "string" },
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
const addTweetResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    userSlug: { type: "string" },
    body: { type: "string" },
    image: { type: "string" },
    tweetId: { type: "string" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addTweetPostSchema = {
  schema: {
    body: bodyAddTweetJsonSchema,
    response: { 200: addTweetResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadTweetSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadTweetResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    userSlug: { type: "string" },
    body: { type: "string" },
    image: { type: "string" },
    tweetId: { type: "string" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    user: {},
    tweetlikes: {},
    slug: { type: "string" },
    photoId: {},
    name: { type: "string" },
  },
};
export const loadTweetGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadTweetSchema,
    response: {
      200: loadTweetResponse,
    },
  },
};
const deleteTweetResponse = { type: "boolean" };
const queryStringJsonDeleteTweetSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteTweetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteTweetSchema,
    response: {
      200: deleteTweetResponse,
    },
  },
};
const queryStringJsonUpdateTweetSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateTweetResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    userSlug: { type: "string" },
    body: { type: "string" },
    image: { type: "string" },
    tweetId: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateTweetBody = {
  type: "object",
  properties: {
    body: { type: "string" },
    image: { type: "string" },
    tweetId: { type: "string" },
  },
};
export const updateTweetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateTweetSchema,
    body: updateTweetBody,
    response: {
      200: updateTweetResponse,
    },
  },
};
const queryStringJsonLoadTweetByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadTweetByPageResponse = {
  type: "object",
  properties: {
    tweets: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          userSlug: { type: "string" },
          body: { type: "string" },
          image: { type: "string" },
          tweetId: { type: "string" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadTweetByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadTweetByPageSchema,
    response: {
      200: loadTweetByPageResponse,
    },
  },
};
