import { idSchema } from "@/application/types/id";

const bodyAddPhotoJsonSchema = {
  type: "object",
  required: ["key", "url", "provider", "expiresIn", "expiresInSeconds"],
  properties: {
    key: { type: "string" },
    url: { type: "string" },
    provider: { type: "string" },
    expiresIn: { type: "string" },
    expiresInSeconds: { type: "string" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addPhotoResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    key: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    url: { type: "string" },
    provider: { type: "string" },
    expiresIn: { type: "string" },
  },
};
export const addPhotoPostSchema = {
  schema: {
    body: bodyAddPhotoJsonSchema,
    response: { 200: addPhotoResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadPhotoSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadPhotoResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    key: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    url: { type: "string" },
    provider: { type: "string" },
    expiresIn: { type: "string" },
  },
};
export const loadPhotoGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadPhotoSchema,
    response: {
      200: loadPhotoResponse,
    },
  },
};
const deletePhotoResponse = { type: "boolean" };
const queryStringJsonDeletePhotoSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deletePhotoSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeletePhotoSchema,
    response: {
      200: deletePhotoResponse,
    },
  },
};
const queryStringJsonLoadPhotoByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadPhotoByPageResponse = {
  type: "object",
  properties: {
    photos: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
          key: { type: "string" },
          url: { type: "string" },
          provider: { type: "string" },
          expiresIn: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadPhotoByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadPhotoByPageSchema,
    response: {
      200: loadPhotoByPageResponse,
    },
  },
};
