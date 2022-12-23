const headersRefreshJsonSchema = {
  type: "object",
  required: ["refreshtoken"],
  properties: {
    refreshtoken: { type: "string" },
  },
};
const refreshResponse = {
  200: {
    type: "object",
    properties: {
      refreshToken: { type: "string" },
      accessToken: { type: "string" },
    },
  },
};
export const refreshGetSchema = {
  schema: {
    headers: headersRefreshJsonSchema,
    response: refreshResponse,
  },
};
