const bodyAddOrderJsonSchema = {
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
const addOrderResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addOrderPostSchema = {
  schema: {
    body: bodyAddOrderJsonSchema,
    response: { 200: addOrderResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadOrderSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const loadOrderResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadOrderGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadOrderSchema,
    response: {
      200: loadOrderResponse,
    },
  },
};
const deleteOrderResponse = { type: "boolean" };
const queryStringJsonDeleteOrderSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
export const deleteOrderSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteOrderSchema,
    response: {
      200: deleteOrderResponse,
    },
  },
};
const queryStringJsonUpdateOrderSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const updateOrderResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateOrderBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateOrderSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateOrderSchema,
    body: updateOrderBody,
    response: {
      200: updateOrderResponse,
    },
  },
};
const queryStringJsonLoadOrderByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadOrderByPageResponse = {
  type: "object",
  properties: {
    orders: {
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
export const loadOrderByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadOrderByPageSchema,
    response: {
      200: loadOrderByPageResponse,
    },
  },
};
