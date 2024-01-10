const bodyAddRideJsonSchema = {
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
const addRideResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addRidePostSchema = {
  schema: {
    body: bodyAddRideJsonSchema,
    response: { 200: addRideResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadRideSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const loadRideResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadRideGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadRideSchema,
    response: {
      200: loadRideResponse,
    },
  },
};
const deleteRideResponse = { type: "boolean" };
const queryStringJsonDeleteRideSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
export const deleteRideSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteRideSchema,
    response: {
      200: deleteRideResponse,
    },
  },
};
const queryStringJsonUpdateRideSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const updateRideResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateRideBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateRideSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateRideSchema,
    body: updateRideBody,
    response: {
      200: updateRideResponse,
    },
  },
};
const queryStringJsonLoadRideByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadRideByPageResponse = {
  type: "object",
  properties: {
    rides: {
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
export const loadRideByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadRideByPageSchema,
    response: {
      200: loadRideByPageResponse,
    },
  },
};
