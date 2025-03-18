import { idSchema } from "@/application/types/id";

const pagarmeSubscription = {
  type: "object",
  properties: {
    currency: { type: "string" },
    start_at: { type: "string", format: "date-time" },
    interval: { type: "string" },
    minimum_price: { type: "string" },
    billing_type: { type: "string" },
    installments: { type: "string" },
    description: { type: "string" },
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
    quantity: { type: "string" },
    pricing_scheme: {
      type: "object",
      properties: {
        scheme_type: { type: "string" },
        price: { type: "string" },
      },
      required: ["scheme_type", "price"],
    },
    statement_descriptor: { type: "string" },
    customer_id: { type: "string" },
    payment_method: { type: "string" },
  },
  required: [
    "currency",
    "start_at",
    "interval",
    "minimum_price",
    "billing_type",
    "installments",
    "description",
    "card",
    "quantity",
    "pricing_scheme",
    "statement_descriptor",
    "customer_id",
    "payment_method",
  ],
};
const bodyAddSubscriptionJsonSchema = {
  type: "object",
  required: ["name", "customer", "value", "dayGenerateCharge"],
  properties: {
    name: { type: "string" },
    comment: { type: "string" },
    priceId: { type: "string" },
    value: { type: "number" },
    dayGenerateCharge: { type: "number" },
    customer: { type: "object" },
    additionalInfo: {},
    pagarmeSubscription,
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
    _id: idSchema,
    name: { type: "string" },
    comment: { type: "string" },
    globalID: { type: "string" },
    value: { type: "number" },
    dayGenerateCharge: { type: "number" },
    customer: { type: "object" },
    additionalInfo: {},
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    gatewayDetails: {},
  },
};
export const addSubscriptionPostSchema = {
  schema: {
    body: bodyAddSubscriptionJsonSchema,
    response: { 200: addSubscriptionResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadSubscriptionSchema = {
  type: "object",
  properties: {
    globalID: { type: "string" },
  },
  required: [],
};
const loadSubscriptionResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    comment: { type: "string" },
    globalID: { type: "string" },
    value: { type: "number" },
    dayGenerateCharge: { type: "number" },
    customer: { type: "object" },
    additionalInfo: {},
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    gatewayDetails: {},
    chargesByCustomer: {},
  },
};
export const loadSubscriptionGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
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
    globalID: { type: "string" },
  },
  required: ["globalID"],
};
export const deleteSubscriptionSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeleteSubscriptionSchema,
    response: {
      200: deleteSubscriptionResponse,
    },
  },
};
const queryStringJsonUpdateSubscriptionSchema = {
  type: "object",
  properties: {
    globalID: { type: "string" },
  },
  required: ["globalID"],
};
const updateSubscriptionResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    comment: { type: "string" },
    globalID: { type: "string" },
    value: { type: "number" },
    dayGenerateCharge: { type: "number" },
    customer: { type: "object" },
    additionalInfo: {},
    createdById: { type: "string" },
    gatewayDetails: {},
  },
};
const updateSubscriptionBody = {
  type: "object",
  properties: {
    name: { type: "string" },
    comment: { type: "string" },
    value: { type: "number" },
    dayGenerateCharge: { type: "number" },
    customer: { type: "object" },
    additionalInfo: {},
  },
};
export const updateSubscriptionSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
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
          _id: idSchema,
          name: { type: "string" },
          comment: { type: "string" },
          globalID: { type: "string" },
          value: { type: "number" },
          dayGenerateCharge: { type: "number" },
          customer: { type: "object" },
          additionalInfo: {},
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
export const loadSubscriptionByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadSubscriptionByPageSchema,
    response: {
      200: loadSubscriptionByPageResponse,
    },
  },
};
