const bodyAddCategoryJsonSchema = {
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
const addCategoryResponse = {
  type: "object",
  properties: {
    _id: { type: "string" },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addCategoryPostSchema = {
  schema: {
    body: bodyAddCategoryJsonSchema,
    response: { 200: addCategoryResponse },
    headers: headersJsonSchema,
  },
};
