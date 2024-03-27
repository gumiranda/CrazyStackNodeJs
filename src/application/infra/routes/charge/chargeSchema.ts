const bodyAddChargeJsonSchema = {
  type: "object",
  required: ["correlationID"],
  properties: {
    correlationID: { type: "string" },
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
    _id: { type: "string", maxLength: 24, minLength: 24 },
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
    _id: { type: "string", maxLength: 24, minLength: 24 },
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
          _id: { type: "string", maxLength: 24, minLength: 24 },
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
