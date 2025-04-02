const refreshResponse = {
  200: {
    type: "object",
    properties: {
      accessToken: { type: "string" },
    },
  },
};

export const refreshGetSchema = {
  schema: {
    response: refreshResponse,
  },
};

const whoAmIResponse = {
  200: {
    type: "object",
    properties: {
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

export const whoAmIGetSchema = {
  schema: {
    response: refreshResponse,
  },
};
