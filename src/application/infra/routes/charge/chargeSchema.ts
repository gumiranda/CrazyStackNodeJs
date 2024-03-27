const bodyAddChargeJsonSchema = {
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
const addChargeResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addChargePostSchema = {
  schema: {
    body: bodyAddChargeJsonSchema,
    response: { 200: addChargeResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadChargeSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const loadChargeResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadChargeGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadChargeSchema,
    response: {
      200: loadChargeResponse,
    },
  },
};
const deleteChargeResponse = { type: "boolean" };
const queryStringJsonDeleteChargeSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
export const deleteChargeSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteChargeSchema,
    response: {
      200: deleteChargeResponse,
    },
  },
};
const queryStringJsonUpdateChargeSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const updateChargeResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateChargeBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateChargeSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateChargeSchema,
    body: updateChargeBody,
    response: {
      200: updateChargeResponse,
    },
  },
};
const queryStringJsonLoadChargeByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadChargeByPageResponse = {
  type: "object",
  properties: {
    charges: {
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
export const loadChargeByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadChargeByPageSchema,
    response: {
      200: loadChargeByPageResponse,
    },
  },
};
