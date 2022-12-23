const bodyJsonSchema = {
  type: "object",
  required: ["requiredKey"],
  properties: {
    someKey: { type: "string" },
    someOtherKey: { type: "number" },
    requiredKey: {
      type: "array",
      maxItems: 3,
      items: { type: "integer" },
    },
    nullableKey: { type: ["number", "null"] }, // or { type: 'number', nullable: true }
    multipleTypesKey: { type: ["boolean", "number"] },
    multipleRestrictedTypesKey: {
      oneOf: [
        { type: "string", maxLength: 5 },
        { type: "number", minimum: 10 },
      ],
    },
    enumKey: {
      type: "string",
      enum: ["John", "Foo"],
    },
    notTypeKey: {
      not: { type: "array" },
    },
  },
};
const queryStringJsonSchema = {
  type: "object",
  properties: {
    ids: {
      type: "array",
      default: [],
    },
  },
};
const paramsJsonSchema = {
  type: "object",
  properties: {
    par1: { type: "string" },
    par2: { type: "number" },
  },
};

const headersJsonSchema = {
  type: "object",
  properties: {
    test: { type: "string" },
  },
  required: ["test"],
};

export const userPostSchema = {
  schema: {
    querystring: queryStringJsonSchema,
    body: bodyJsonSchema,
    params: paramsJsonSchema,
    headers: headersJsonSchema,
    response: {
      200: {
        type: "object",
        properties: {
          acknowledged: { type: "boolean" },
          insertedId: { type: "string" },
        },
      },
    },
  },
};
