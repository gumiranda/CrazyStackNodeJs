import { idSchema } from "@/application/types/id";

const PAGARME_ORDER = {
  type: "object",
  properties: {
    customer_id: { type: "string" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          amount: { type: "string" },
          description: { type: "string" },
          quantity: { type: "string" },
          code: { type: "string" },
        },
        required: ["amount", "description", "quantity", "code"],
      },
    },
    closed: { type: "string" },
    payments: {
      type: "array",
      items: {
        type: "object",
        properties: {
          credit_card: {
            type: "object",
            properties: {
              operation_type: { type: "string" },
              installments: { type: "string" },
              card: {
                type: "object",
                properties: {
                  number: { type: "string" },
                  holder_name: { type: "string" },
                  holder_document: { type: "string" },
                  exp_month: { type: "string" },
                  exp_year: { type: "string" },
                  cvv: { type: "string" },
                  billing_address_id: { type: "string" },
                  brand: { type: "string" },
                },
                required: [
                  "number",
                  "holder_name",
                  "holder_document",
                  "exp_month",
                  "exp_year",
                  "cvv",
                  "billing_address_id",
                  "brand",
                ],
              },
              statement_descriptor: { type: "string" },
            },
            required: ["operation_type", "installments", "card", "statement_descriptor"],
          },
          payment_method: { type: "string" },
          amount: { type: "string" },
        },
        required: ["credit_card", "payment_method", "amount"],
      },
    },
  },
  required: ["customer_id", "items", "closed", "payments"],
};

const bodyAddChargeJsonSchema = {
  type: "object",
  required: ["correlationID"],
  properties: {
    correlationID: { type: "string" },
    pagarmeOrder: PAGARME_ORDER,
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
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    status: { type: "string" },
    customer: { type: "object" },
    value: { type: "number" },
    comment: { type: "string" },
    correlationID: { type: "string" },
    paymentLinkID: { type: "string" },
    paymentLinkUrl: { type: "string" },
    qrCodeImage: { type: "string" },
    expiresIn: { type: "number" },
    expiresDate: { type: "string" },
    brCode: { type: "string" },
    additionalInfo: { type: "array" },
    gatewayDetails: {},
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
    correlationID: { type: "string" },
  },
  required: ["correlationID"],
};
const loadChargeResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    status: { type: "string" },
    customer: { type: "object" },
    value: { type: "number" },
    comment: { type: "string" },
    correlationID: { type: "string" },
    paymentLinkID: { type: "string" },
    paymentLinkUrl: { type: "string" },
    qrCodeImage: { type: "string" },
    expiresIn: { type: "number" },
    expiresDate: { type: "string" },
    brCode: { type: "string" },
    additionalInfo: { type: "array" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    gatewayDetails: {},
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
    correlationID: { type: "string" },
  },
  required: ["correlationID"],
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
    correlationID: { type: "string" },
  },
  required: ["correlationID"],
};
const updateChargeResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    status: { type: "string" },
    customer: { type: "object" },
    value: { type: "number" },
    comment: { type: "string" },
    correlationID: { type: "string" },
    paymentLinkID: { type: "string" },
    paymentLinkUrl: { type: "string" },
    qrCodeImage: { type: "string" },
    expiresIn: { type: "number" },
    expiresDate: { type: "string" },
    brCode: { type: "string" },
    additionalInfo: { type: "array" },
    createdById: { type: "string" },
    gatewayDetails: {},
  },
};
const updateChargeBody = {
  type: "object",
  properties: {
    status: { type: "string" },
    customer: { type: "object" },
    value: { type: "number" },
    comment: { type: "string" },
    correlationID: { type: "string" },
    paymentLinkID: { type: "string" },
    paymentLinkUrl: { type: "string" },
    qrCodeImage: { type: "string" },
    expiresIn: { type: "number" },
    expiresDate: { type: "string" },
    brCode: { type: "string" },
    additionalInfo: { type: "array" },
    gatewayDetails: {},
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
          _id: idSchema,
          status: { type: "string" },
          customer: { type: "object" },
          value: { type: "number" },
          comment: { type: "string" },
          correlationID: { type: "string" },
          paymentLinkID: { type: "string" },
          paymentLinkUrl: { type: "string" },
          qrCodeImage: { type: "string" },
          expiresIn: { type: "number" },
          expiresDate: { type: "string" },
          brCode: { type: "string" },
          additionalInfo: { type: "array" },
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
          gatewayDetails: {},
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
