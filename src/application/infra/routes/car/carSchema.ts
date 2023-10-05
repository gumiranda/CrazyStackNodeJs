const bodyAddCarJsonSchema = {
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
const addCarResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addCarPostSchema = {
  schema: {
    body: bodyAddCarJsonSchema,
    response: { 200: addCarResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadCarSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const loadCarResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadCarGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadCarSchema,
    response: {
      200: loadCarResponse,
    },
  },
};
const deleteCarResponse = { type: "boolean" };
const queryStringJsonDeleteCarSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
export const deleteCarSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteCarSchema,
    response: {
      200: deleteCarResponse,
    },
  },
};
const queryStringJsonUpdateCarSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const updateCarResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateCarBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateCarSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateCarSchema,
    body: updateCarBody,
    response: {
      200: updateCarResponse,
    },
  },
};
const queryStringJsonLoadCarByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadCarByPageResponse = {
  type: "object",
  properties: {
    cars: {
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
export const loadCarByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadCarByPageSchema,
    response: {
      200: loadCarByPageResponse,
    },
  },
};
