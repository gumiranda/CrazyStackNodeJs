import { idSchema } from "@/application/types/id";

const bodyAddPlaceJsonSchema = {
  type: "object",
  required: ["name", "categoryPlaceId"],
  properties: {
    name: { type: "string" },
    categoryPlaceId: { type: "string" },
    ownerId: { type: "string" },
    description: { type: "string" },
    coord: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["Point"] },
        coordinates: { type: "array", items: { type: "number" } },
      },
    },
    address: { type: "string" },
    phone: { type: "string" },
    cover: { type: "string" },
    profilephoto: { type: "string" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addPlaceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    categoryPlaceId: { type: "string" },
    ownerId: { type: "string" },
    description: { type: "string" },
    coord: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["Point"] },
        coordinates: { type: "array", items: { type: "number" } },
      },
    },
    address: { type: "string" },
    phone: { type: "string" },
    cover: { type: "string" },
    profilephoto: { type: "string" },
  },
};
export const addPlacePostSchema = {
  schema: {
    body: bodyAddPlaceJsonSchema,
    response: { 200: addPlaceResponse },
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
  },
};

const queryStringJsonLoadPlaceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const loadPlaceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
    categoryPlaceId: { type: "string" },
    ownerId: { type: "string" },
    description: { type: "string" },
    coord: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["Point"] },
        coordinates: { type: "array", items: { type: "number" } },
      },
    },
    address: { type: "string" },
    phone: { type: "string" },
    cover: { type: "string" },
    profilephoto: { type: "string" },
  },
};
export const loadPlaceGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadPlaceSchema,
    response: {
      200: loadPlaceResponse,
    },
  },
};
const deletePlaceResponse = { type: "boolean" };
const queryStringJsonDeletePlaceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
export const deletePlaceSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonDeletePlaceSchema,
    response: {
      200: deletePlaceResponse,
    },
  },
};
const queryStringJsonUpdatePlaceSchema = {
  type: "object",
  properties: {
    _id: idSchema,
  },
  required: ["_id"],
};
const updatePlaceResponse = {
  type: "object",
  properties: {
    _id: idSchema,
    name: { type: "string" },
    createdById: { type: "string" },
    categoryPlaceId: { type: "string" },
    ownerId: { type: "string" },
    description: { type: "string" },
    coord: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["Point"] },
        coordinates: { type: "array", items: { type: "number" } },
      },
    },
    address: { type: "string" },
    phone: { type: "string" },
    cover: { type: "string" },
    profilephoto: { type: "string" },
  },
};
const updatePlaceBody = {
  type: "object",
  properties: {
    name: { type: "string" },
    categoryPlaceId: { type: "string" },
    ownerId: { type: "string" },
    description: { type: "string" },
    coord: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["Point"] },
        coordinates: { type: "array", items: { type: "number" } },
      },
    },
    address: { type: "string" },
    phone: { type: "string" },
    cover: { type: "string" },
    profilephoto: { type: "string" },
  },
};
export const updatePlaceSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonUpdatePlaceSchema,
    body: updatePlaceBody,
    response: {
      200: updatePlaceResponse,
    },
  },
};
const queryStringJsonLoadPlaceByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const queryStringJsonLoadPlaceByPageGeoNearSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
    lng: { type: "number" },
    lat: {
      type: "number",
    },
  },
  required: ["page"],
};
const loadPlaceByPageResponse = {
  type: "object",
  properties: {
    places: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: idSchema,
          name: { type: "string" },
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
          categoryPlaceId: { type: "string" },
          ownerId: { type: "string" },
          description: { type: "string" },
          coord: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["Point"] },
              coordinates: { type: "array", items: { type: "number" } },
            },
          },
          address: { type: "string" },
          phone: { type: "string" },
          cover: { type: "string" },
          profilephoto: { type: "string" },
          distance: {},
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadPlaceByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadPlaceByPageSchema,
    response: {
      200: loadPlaceByPageResponse,
    },
  },
};
export const loadPlaceByGeoNearSchema = {
  schema: {
    headers: headersJsonSchema,
    security: [{ bearerAuth: [] }],
    querystring: queryStringJsonLoadPlaceByPageGeoNearSchema,
    response: {
      200: loadPlaceByPageResponse,
    },
  },
};
