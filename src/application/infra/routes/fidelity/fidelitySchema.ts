const bodyAddFidelityJsonSchema = {
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
const addFidelityResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addFidelityPostSchema = {
  schema: {
    body: bodyAddFidelityJsonSchema,
    response: { 200: addFidelityResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadFidelitySchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const loadFidelityResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadFidelityGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadFidelitySchema,
    response: {
      200: loadFidelityResponse,
    },
  },
};
const deleteFidelityResponse = { type: "boolean" };
const queryStringJsonDeleteFidelitySchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
export const deleteFidelitySchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteFidelitySchema,
    response: {
      200: deleteFidelityResponse,
    },
  },
};
const queryStringJsonUpdateFidelitySchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const updateFidelityResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateFidelityBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateFidelitySchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateFidelitySchema,
    body: updateFidelityBody,
    response: {
      200: updateFidelityResponse,
    },
  },
};
const queryStringJsonLoadFidelityByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadFidelityByPageResponse = {
  type: "object",
  properties: {
    fidelitys: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: { type: "string", maxLength: 24, minLength: 24 },
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
export const loadFidelityByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadFidelityByPageSchema,
    response: {
      200: loadFidelityByPageResponse,
    },
  },
};
