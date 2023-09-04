const bodyAddMapRouteJsonSchema = {
  type: "object",
  required: ["name", "source_id", "destination_id"],
  properties: {
    name: { type: "string" },
    source_id: { type: "string" },
    destination_id: { type: "string" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addMapRouteResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    source: {
      type: "object",
      properties: {
        name: { type: "string" },
        location: {
          type: "object",
          properties: {
            lat: { type: "number" },
            lng: { type: "number" },
          },
        },
      },
    },
    destination: {
      type: "object",
      properties: {
        name: { type: "string" },
        location: {
          type: "object",
          properties: {
            lat: { type: "number" },
            lng: { type: "number" },
          },
        },
      },
    },
    distance: { type: "number" },
    duration: { type: "number" },
    directions: { type: "string" },
    routeDriver: { type: "array" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addMapRoutePostSchema = {
  schema: {
    body: bodyAddMapRouteJsonSchema,
    response: { 200: addMapRouteResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadMapRouteSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const loadMapRouteResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    source: {
      type: "object",
      properties: {
        name: { type: "string" },
        location: {
          type: "object",
          properties: {
            lat: { type: "number" },
            lng: { type: "number" },
          },
        },
      },
    },
    destination: {
      type: "object",
      properties: {
        name: { type: "string" },
        location: {
          type: "object",
          properties: {
            lat: { type: "number" },
            lng: { type: "number" },
          },
        },
      },
    },
    distance: { type: "number" },
    duration: { type: "number" },
    directions: { type: "string" },
    routeDriver: { type: "array" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadMapRouteGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadMapRouteSchema,
    response: {
      200: loadMapRouteResponse,
    },
  },
};
const queryStringJsonLoadDirectionsSchema = {
  type: "object",
  properties: {
    originId: { type: "string" },
    destinationId: { type: "string" },
  },
  required: ["originId", "destinationId"],
};
export const loadDirectionsGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadDirectionsSchema,
  },
};
const queryStringJsonLoadPlacesSchema = {
  type: "object",
  properties: {
    text: { type: "string" },
  },
  required: ["text"],
};
export const loadPlacesGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadPlacesSchema,
  },
};
const deleteMapRouteResponse = { type: "boolean" };
const queryStringJsonDeleteMapRouteSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
export const deleteMapRouteSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteMapRouteSchema,
    response: {
      200: deleteMapRouteResponse,
    },
  },
};
const queryStringJsonUpdateMapRouteSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const updateMapRouteResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateMapRouteBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateMapRouteSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateMapRouteSchema,
    body: updateMapRouteBody,
    response: {
      200: updateMapRouteResponse,
    },
  },
};
const queryStringJsonLoadMapRouteByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadMapRouteByPageResponse = {
  type: "object",
  properties: {
    mapRoutes: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: { type: "string", maxLength: 24, minLength: 24 },
          name: { type: "string" },
          active: { type: "boolean" },
          source: {
            type: "object",
            properties: {
              name: { type: "string" },
              location: {
                type: "object",
                properties: {
                  lat: { type: "number" },
                  lng: { type: "number" },
                },
              },
            },
          },
          destination: {
            type: "object",
            properties: {
              name: { type: "string" },
              location: {
                type: "object",
                properties: {
                  lat: { type: "number" },
                  lng: { type: "number" },
                },
              },
            },
          },
          distance: { type: "number" },
          duration: { type: "number" },
          directions: { type: "string" },
          routeDriver: { type: "array" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadMapRouteByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadMapRouteByPageSchema,
    response: {
      200: loadMapRouteByPageResponse,
    },
  },
};
