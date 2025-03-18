import { idSchema } from "@/application/types/id";

const bodyAddFollowJsonSchema = {
  type: "object",
  required: ["userId"],
  properties: {
    userId: { type: "string" },
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
    userId: { type: "string" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addFollowPostSchema = {
  schema: {
    body: bodyAddFollowJsonSchema,
    response: { 200: addFollowResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
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
    userId: { type: "string" },
    usersname: { type: "string" },
    usersslug: { type: "string" },
    usersphotoId: { type: "string" },
    usersphotoUrl: { type: "string" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadFollowGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
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
    security: [{ bearerAuth: [] }],
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
    userId: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateFollowBody = {
  type: "object",
  properties: {
    userId: { type: "string" },
  },
};
export const updateFollowSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
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
          userId: { type: "string" },
          usersname: { type: "string" },
          usersslug: { type: "string" },
          usersphotoUrl: { type: "string" },
          usersphotoId: { type: "string" },
          users: {
            type: "object",
            properties: {
              _id: idSchema,
              name: { type: "string" },
              slug: { type: "string" },
              photoId: { type: "string" },
              photoUrl: { type: "string" },
            },
          },
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
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadFollowByPageSchema,
    response: {
      200: loadFollowByPageResponse,
    },
  },
};
