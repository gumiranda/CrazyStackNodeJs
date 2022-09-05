const bodyJsonSchema = {
  type: "object",
  required: ["email", "password", "passwordConfirmation", "name", "role", "coord"],
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    passwordConfirmation: { type: "string" },
    coord: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["Point"] },
        coordinates: { type: "array", items: { type: "number" } },
      },
    },
    role: { type: "string", enum: ["client", "owner", "visitor"] },
  },
};
const signupResponse = {
  200: {
    type: "object",
    properties: {
      refreshToken: { type: "string" },
      accessToken: { type: "string" },
      user: {
        type: "object",
        properties: {
          _id: { type: "string" },
          email: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          active: { type: "boolean" },
          coord: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["Point"] },
              coordinates: { type: "array", items: { type: "number" } },
            },
          },
        },
      },
    },
  },
};
export const signupPostSchema = {
  schema: {
    body: bodyJsonSchema,
    response: signupResponse,
  },
};
const bodyLoginJsonSchema = {
  type: "object",
  required: ["email", "password", "passwordConfirmation"],
  properties: {
    email: { type: "string" },
    password: { type: "string" },
    passwordConfirmation: { type: "string" },
  },
};
const loginResponse = {
  200: {
    type: "object",
    properties: {
      refreshToken: { type: "string" },
      accessToken: { type: "string" },
      user: {
        type: "object",
        properties: {
          _id: { type: "string" },
          email: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          active: { type: "boolean" },
          coord: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["Point"] },
              coordinates: { type: "array", items: { type: "number" } },
            },
          },
        },
      },
    },
  },
};
export const loginPostSchema = {
  schema: {
    body: bodyLoginJsonSchema,
    response: loginResponse,
  },
};
