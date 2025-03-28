import { idSchema } from "@/application/types/id";

const bodyAddServiceJsonSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    finalPrice: { type: "number" },
    comission: { type: "number" },
    havePromotionalPrice: { type: "boolean" },
    hasFidelityGenerator: { type: "boolean" },
    categoryId: idSchema,
    duration: { type: "integer", minimum: 15, maximum: 200 },
    productsQuantityNeeded: { type: "integer", minimum: 0, maximum: 200 },
    canPayWithFidelityPoints: { type: "boolean" },
    appointmentsTotal: { type: "number" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addServiceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    finalPrice: { type: "number" },
    comission: { type: "number" },
    havePromotionalPrice: { type: "boolean" },
    hasFidelityGenerator: { type: "boolean" },
    categoryId: idSchema,
    duration: { type: "integer", minimum: 15, maximum: 200 },
    productsQuantityNeeded: { type: "integer", minimum: 0, maximum: 200 },
    canPayWithFidelityPoints: { type: "boolean" },
    appointmentsTotal: { type: "number" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addServicePostSchema = {
  schema: {
    body: bodyAddServiceJsonSchema,
    response: { 200: addServiceResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadServiceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadServiceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    finalPrice: { type: "number" },
    comission: { type: "number" },
    havePromotionalPrice: { type: "boolean" },
    hasFidelityGenerator: { type: "boolean" },
    categoryId: idSchema,
    duration: { type: "integer", minimum: 15, maximum: 200 },
    productsQuantityNeeded: { type: "integer", minimum: 0, maximum: 200 },
    canPayWithFidelityPoints: { type: "boolean" },
    appointmentsTotal: { type: "number" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadServiceGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadServiceSchema,
    response: {
      200: loadServiceResponse,
    },
  },
};
const deleteServiceResponse = { type: "boolean" };
const queryStringJsonDeleteServiceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteServiceSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeleteServiceSchema,
    response: {
      200: deleteServiceResponse,
    },
  },
};
const queryStringJsonUpdateServiceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateServiceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    finalPrice: { type: "number" },
    comission: { type: "number" },
    havePromotionalPrice: { type: "boolean" },
    hasFidelityGenerator: { type: "boolean" },
    categoryId: idSchema,
    duration: { type: "integer", minimum: 15, maximum: 200 },
    productsQuantityNeeded: { type: "integer", minimum: 0, maximum: 200 },
    canPayWithFidelityPoints: { type: "boolean" },
    appointmentsTotal: { type: "number" },
    createdById: { type: "string" },
  },
};
const updateServiceBody = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    finalPrice: { type: "number" },
    comission: { type: "number" },
    havePromotionalPrice: { type: "boolean" },
    hasFidelityGenerator: { type: "boolean" },
    categoryId: idSchema,
    duration: { type: "integer", minimum: 15, maximum: 200 },
    productsQuantityNeeded: { type: "integer", minimum: 0, maximum: 200 },
    canPayWithFidelityPoints: { type: "boolean" },
    appointmentsTotal: { type: "number" },
  },
};
export const updateServiceSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdateServiceSchema,
    body: updateServiceBody,
    response: {
      200: updateServiceResponse,
    },
  },
};
const queryStringJsonLoadServiceByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadServiceByPageResponse = {
  type: "object",
  properties: {
    services: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          finalPrice: { type: "number" },
          comission: { type: "number" },
          havePromotionalPrice: { type: "boolean" },
          hasFidelityGenerator: { type: "boolean" },
          categoryId: idSchema,
          duration: { type: "integer", minimum: 15, maximum: 200 },
          productsQuantityNeeded: { type: "integer", minimum: 0, maximum: 200 },
          canPayWithFidelityPoints: { type: "boolean" },
          appointmentsTotal: { type: "number" },
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadServiceByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadServiceByPageSchema,
    response: {
      200: loadServiceByPageResponse,
    },
  },
  config: {
    rateLimit: {
      max: 300,
      timeWindow: "10 minutes",
    },
  },
};
