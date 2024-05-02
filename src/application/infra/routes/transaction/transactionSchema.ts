const bodyAddTransactionJsonSchema = {
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
const addTransactionResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addTransactionPostSchema = {
  schema: {
    body: bodyAddTransactionJsonSchema,
    response: { 200: addTransactionResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadTransactionSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const loadTransactionResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadTransactionGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadTransactionSchema,
    response: {
      200: loadTransactionResponse,
    },
  },
};
const deleteTransactionResponse = { type: "boolean" };
const queryStringJsonDeleteTransactionSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
export const deleteTransactionSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteTransactionSchema,
    response: {
      200: deleteTransactionResponse,
    },
  },
};
const queryStringJsonUpdateTransactionSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const updateTransactionResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateTransactionBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateTransactionSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateTransactionSchema,
    body: updateTransactionBody,
    response: {
      200: updateTransactionResponse,
    },
  },
};
const queryStringJsonLoadTransactionByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadTransactionByPageResponse = {
  type: "object",
  properties: {
    transactions: {
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
export const loadTransactionByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadTransactionByPageSchema,
    response: {
      200: loadTransactionByPageResponse,
    },
  },
};
