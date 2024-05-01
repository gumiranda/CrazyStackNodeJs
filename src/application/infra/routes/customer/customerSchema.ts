const pagarmeCustomer = {
  type: "object",
  properties: {
    phones: {
      type: "object",
      properties: {
        home_phone: {},
        mobile_phone: {},
      },
      required: ["home_phone", "mobile_phone"],
    },
    birthdate: { type: "string" },
    gender: { type: "string", enum: ["male", "female"] },
    type: { type: "string", enum: ["individual", "company"] },
    document_type: { type: "string", enum: ["CPF", "CNPJ", "PASSPORT"] },
    document: { type: "string" },
    code: { type: "string" },
    address: {
      type: "object",
      properties: {
        zip_code: { type: "string" },
        line_1: { type: "string" },
        line_2: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
        country: { type: "string" },
      },
      required: [],
    },
    metadata: { type: "string" },
  },
  required: [],
};
const bodyAddCustomerJsonSchema = {
  type: "object",
  required: ["name", "email", "cpf", "phone", "correlationID"],
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    cpf: { type: "string" },
    correlationID: { type: "string" },
    pagarmeCustomer,
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addCustomerResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    cpf: { type: "string" },
    correlationID: { type: "string" },
    gatewayDetails: {},
    error: {},
    pagarmeCustomer,
  },
};
export const addCustomerPostSchema = {
  schema: {
    body: bodyAddCustomerJsonSchema,
    response: { 200: addCustomerResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadCustomerSchema = {
  type: "object",
  properties: {
    correlationID: { type: "string" },
  },
  required: ["correlationID"],
};
const loadCustomerResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    cpf: { type: "string" },
    correlationID: { type: "string" },
    gatewayDetails: {},
    pagarmeCustomer,
  },
};
export const loadCustomerGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadCustomerSchema,
    response: {
      200: loadCustomerResponse,
    },
  },
};
const deleteCustomerResponse = { type: "boolean" };
const queryStringJsonDeleteCustomerSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
  },
  required: ["_id"],
};
export const deleteCustomerSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteCustomerSchema,
    response: {
      200: deleteCustomerResponse,
    },
  },
};
const queryStringJsonUpdateCustomerSchema = {
  type: "object",
  properties: { correlationID: { type: "string" } },
  required: ["correlationID"],
};
const updateCustomerResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    createdById: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    cpf: { type: "string" },
    correlationID: { type: "string" },
    gatewayDetails: {},
    pagarmeCustomer,
  },
};
const updateCustomerBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateCustomerSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateCustomerSchema,
    body: updateCustomerBody,
    response: {
      200: updateCustomerResponse,
    },
  },
};
const queryStringJsonLoadCustomerByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadCustomerByPageResponse = {
  type: "object",
  properties: {
    customers: {
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
          email: { type: "string" },
          phone: { type: "string" },
          cpf: { type: "string" },
          correlationID: { type: "string" },
          gatewayDetails: {},
          pagarmeCustomer,
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadCustomerByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadCustomerByPageSchema,
    response: {
      200: loadCustomerByPageResponse,
    },
  },
};
