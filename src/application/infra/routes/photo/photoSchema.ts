import { idSchema } from "@/application/types/id";

const bodyAddPhotoJsonSchema = {
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
const addPhotoResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
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
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
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
const queryStringJsonUpdatePhotoSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updatePhotoResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updatePhotoBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updatePhotoSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdatePhotoSchema,
    body: updatePhotoBody,
    response: {
      200: updatePhotoResponse,
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
export const loadPhotoByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadPhotoByPageSchema,
    response: {
      200: loadPhotoByPageResponse,
    },
  },
};
