import { idSchema } from "@/application/types/id";

const bodyAddProductJsonSchema = {
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
const addProductResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addProductPostSchema = {
  schema: {
    body: bodyAddProductJsonSchema,
    response: { 200: addProductResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadProductSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadProductResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadProductGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadProductSchema,
    response: {
      200: loadProductResponse,
    },
  },
};
const deleteProductResponse = { type: "boolean" };
const queryStringJsonDeleteProductSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deleteProductSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeleteProductSchema,
    response: {
      200: deleteProductResponse,
    },
  },
};
const queryStringJsonUpdateProductSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updateProductResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateProductBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateProductSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdateProductSchema,
    body: updateProductBody,
    response: {
      200: updateProductResponse,
    },
  },
};
const queryStringJsonLoadProductByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadProductByPageResponse = {
  type: "object",
  properties: {
    products: {
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
export const loadProductByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadProductByPageSchema,
    response: {
      200: loadProductByPageResponse,
    },
  },
};
