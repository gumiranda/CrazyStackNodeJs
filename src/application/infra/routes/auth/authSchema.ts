const bodyJsonSchema = {
  type: "object",
  required: ["email", "password", "passwordConfirmation", "name", "role", "coord"],
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    cpf: { type: "string" },
    cnpj: { type: "string" },
    password: { type: "string" },
    phone: { type: "string" },
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
          ownerId: { type: "string" },
          role: { type: "string" },
          phone: { type: "string" },
          createdAt: { type: "string" },
          active: { type: "boolean" },
          slug: { type: "string" },
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
export const verifyEmailSchema = {
  schema: {
    body: {
      type: "object",
      required: ["email", "code"],
      properties: {
        email: { type: "string" },
        code: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};
export const resendEmailSchema = {
  schema: {
    body: {
      type: "object",
      required: ["email"],
      properties: {
        email: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
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
          phone: { type: "string" },
          role: { type: "string" },
          active: { type: "boolean" },
          ownerId: { type: "string" },
          createdAt: { type: "string" },
          slug: { type: "string" },
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
