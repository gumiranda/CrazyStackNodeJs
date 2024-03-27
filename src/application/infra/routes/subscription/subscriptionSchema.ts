const bodyAddSubscriptionJsonSchema = {
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
const addSubscriptionResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addSubscriptionPostSchema = {
  schema: {
    body: bodyAddSubscriptionJsonSchema,
    response: { 200: addSubscriptionResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadSubscriptionSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const loadSubscriptionResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadSubscriptionGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadSubscriptionSchema,
    response: {
      200: loadSubscriptionResponse,
    },
  },
};
const deleteSubscriptionResponse = { type: "boolean" };
const queryStringJsonDeleteSubscriptionSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
export const deleteSubscriptionSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteSubscriptionSchema,
    response: {
      200: deleteSubscriptionResponse,
    },
  },
};
const queryStringJsonUpdateSubscriptionSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const updateSubscriptionResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateSubscriptionBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateSubscriptionSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateSubscriptionSchema,
    body: updateSubscriptionBody,
    response: {
      200: updateSubscriptionResponse,
    },
  },
};
const queryStringJsonLoadSubscriptionByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadSubscriptionByPageResponse = {
  type: "object",
  properties: {
    subscriptions: {
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
export const loadSubscriptionByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadSubscriptionByPageSchema,
    response: {
      200: loadSubscriptionByPageResponse,
    },
  },
};
